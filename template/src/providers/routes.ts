import { Application } from "express";

import upload from "../routes/upload";

/**
 * Initialize all routes
 */
class Routes {
  public upload(_express: Application): Application {
    return _express.use("/", upload);
  }
}

export default new Routes();
