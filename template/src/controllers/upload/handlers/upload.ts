import Helpers from "../helpers";
import Locals from "../../../providers/locals";

class Upload {
  public static async handle(req: any, res: any): Promise<void> {
    const client = Helpers.minioClient();

    // Get the file from the request
    const file = req.file;

    // Use the minioClient to upload the file to Minio

    client.putObject(
      Locals.config().bucket,
      file.originalname,
      file.buffer,
      async function (err: any, etag: any) {
        if (err) {
          // Handle the error
          return res.status(500).send(err);
        }

        client.presignedUrl(
          "GET",
          Locals.config().bucket,
          file.originalname,
          parseInt(Locals.config().tokenTimeout),
          function (err: any, presignedUrl: string) {
            if (err) return console.log(err);
            // Return a response to the client
            return res.send({
              message: "File uploaded successfully",
              status: 200,
              etag: etag,
              presignedUrl: presignedUrl.split("?")[0],
            });
          },
        );
      },
    );
  }
}

export default Upload;
