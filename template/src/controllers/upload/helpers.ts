const Minio = require("minio");
import Locals from "../../providers/locals";

class Helpers {
  /**
   * Create minio client
   */
  public minioClient() {
    return new Minio.Client({
      endPoint: Locals.config().endPoint,
      port: parseInt(Locals.config().minioPort),
      useSSL: Locals.config().useSSL === "true",
      accessKey: Locals.config().accessKey,
      secretKey: Locals.config().secretKey,
    });
  }
}

export default new Helpers();
