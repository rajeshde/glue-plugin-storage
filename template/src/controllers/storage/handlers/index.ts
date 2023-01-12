import Upload from "./upload";
import Get from "./get";

class Authentication {
  public upload(req: any, res: any): any {
    return Upload.handle(req, res);
  }
  public get(req: any, res: any): any {
    return Get.handle(req, res);
  }
}

export default new Authentication();
