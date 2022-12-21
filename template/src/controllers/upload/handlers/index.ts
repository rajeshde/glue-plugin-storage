import Upload from "./upload";

class Authentication {
  public upload(req: any, res: any): any {
    return Upload.handle(req, res);
  }
}

export default new Authentication();
