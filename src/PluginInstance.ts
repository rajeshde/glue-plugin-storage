import IApp from "@gluestack/framework/types/app/interface/IApp";
import IPlugin from "@gluestack/framework/types/plugin/interface/IPlugin";
import IInstance from "@gluestack/framework/types/plugin/interface/IInstance";
import ILifeCycle from "@gluestack/framework/types/plugin/interface/ILifeCycle";
import { PluginInstanceContainerController } from "./PluginInstanceContainerController";
import IContainerController from "@gluestack/framework/types/plugin/interface/IContainerController";
import IHasContainerController from "@gluestack/framework/types/plugin/interface/IHasContainerController";
import IGlueStorePlugin from "@gluestack/framework/types/store/interface/IGluePluginStore";
import { IMinio } from "@gluestack/glue-plugin-minio/src/interfaces/IMinio";
import { IHasMinioInstance } from "./interfaces/IHasMinioInstance";
import IManagesInstances from "@gluestack/framework/types/plugin/interface/IManagesInstances";

export class PluginInstance
  implements IInstance, IHasContainerController, ILifeCycle, IHasMinioInstance
{
  app: IApp;
  name: string;
  callerPlugin: IPlugin;
  containerController: IContainerController;
  isOfTypeInstance: boolean = false;
  gluePluginStore: IGlueStorePlugin;
  installationPath: string;

  constructor(
    app: IApp,
    callerPlugin: IPlugin,
    name: string,
    gluePluginStore: IGlueStorePlugin,
    installationPath: string,
  ) {
    this.app = app;
    this.name = name;
    this.callerPlugin = callerPlugin;
    this.gluePluginStore = gluePluginStore;
    this.installationPath = installationPath;
    this.containerController = new PluginInstanceContainerController(app, this);
  }

  init() {
    //
  }

  destroy() {
    //
  }

  getName(): string {
    return this.name;
  }

  getCallerPlugin(): IPlugin {
    return this.callerPlugin;
  }

  getInstallationPath(): string {
    return this.installationPath;
  }

  getContainerController(): IContainerController {
    return this.containerController;
  }

  getMinioInstance(): IPlugin & IMinio & IHasContainerController {
    let minioInstance = null;
    const minio_instance = this.gluePluginStore.get("minio_instance");
    if (minio_instance) {
      const plugin: IPlugin & IManagesInstances = this.app.getPluginByName(
        "@gluestack/glue-plugin-minio",
      );
      if (plugin) {
        plugin.getInstances().map((instance: IInstance & IMinio) => {
          if (instance.getName() === minio_instance) {
            minioInstance = instance;
          }
        });
      }
      return minioInstance;
    }
  }
}
