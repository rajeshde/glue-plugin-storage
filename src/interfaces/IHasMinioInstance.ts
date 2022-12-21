import IPlugin from "@gluestack/framework/types/plugin/interface/IPlugin";
import { IMinio } from "@gluestack/glue-plugin-minio/src/interfaces/IMinio";
import IHasContainerController from "@gluestack/framework/types/plugin/interface/IHasContainerController";

export interface IHasMinioInstance {
  getMinioInstance(): IPlugin & IMinio & IHasContainerController;
}
