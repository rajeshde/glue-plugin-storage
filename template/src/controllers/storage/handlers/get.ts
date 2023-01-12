import Helpers from "../helpers";
import Locals from "../../../providers/locals";
import Common from "../../commons";
import Queries from "../graphql/queries";

class Get {
  public static async handle(req: any, res: any): Promise<void> {
    const { path } = req.params;
    try {
      // graphql query
      const { data } = await Common.GQLRequest({
        variables: { path: path },
        query: Queries.FileByPath,
      });

      // error handling
      if (!data || !data.data || !data.data.files) {
        const error = (data.errors && data.errors) || "Something went wrong!";
        return Common.Response(res, false, error, null);
      }

      // check if files response is empty
      if (data.data.files.length === 0) {
        return Common.Response(res, false, "no such file exists", null);
      }

      const client = Helpers.minioClient();

      var arr: any = [];
      client.getObject(
        Locals.config().bucket,
        path,
        function (err: any, dataStream: any) {
          if (err) {
            return 
          }
          dataStream.on("data", function (chunk: any) {
            arr.push(chunk);
          });
          dataStream.on("end", function () {
            var buf = Buffer.concat(arr);
            var fileContents = Buffer.from(buf.toString("base64"), "base64");
            res.set('Content-disposition', 'attachment; inline=' + data.data.files[0].original_name);
            res.set('Content-Type', data.data.files[0].mime_type);
            res.end(fileContents)
          });
          dataStream.on("error", function (err: any) {
            //
          });
        },
      );
    } catch (error: any) {
      return Common.Response(res, false, error.message, null);
    }
  }
}

export default Get;
