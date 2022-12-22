import { Application } from "express";
import * as path from "path";
import * as dotenv from "dotenv";

class Locals {
  /**
   * Initialize all env variables
   */
  public static config(): any {
    dotenv.config({ path: path.join(__dirname, "../../.env") });

    const port = process.env.APP_PORT || "";
    const endPoint = process.env.MINIO_END_POINT || "";
    const minioPort = process.env.MINIO_PORT || "";
    const useSSL = process.env.MINIO_USE_SSL || "";
    const accessKey = process.env.MINIO_ACCESS_KEY || "";
    const secretKey = process.env.MINIO_SECRET_KEY || "";
    const bucket = process.env.MINIO_BUCKET || "";
    const tokenTimeout = process.env.MINIO_TOKEN_TIMEOUT || "";

    return {
      port,
      endPoint,
      minioPort,
      useSSL,
      accessKey,
      secretKey,
      bucket,
      tokenTimeout,
    };
  }

  /**
   * Injects config in app's locals
   */
  public static init(_express: Application): Application {
    _express.locals.app = this.config();
    return _express;
  }
}

export default Locals;
