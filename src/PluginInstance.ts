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
import { GlueStackPlugin } from "./";
import { PluginInstance as GraphqlPluginInstance } from "@gluestack/glue-plugin-graphql/src/PluginInstance";
import { PluginInstance as MinioPluginInstance } from "@gluestack/glue-plugin-minio/src/PluginInstance";
import { IHasGraphqlInstance } from "./interfaces/IHasGraphqllnstance";
export class PluginInstance
  implements
    IInstance,
    IHasContainerController,
    ILifeCycle,
    IHasMinioInstance,
    IHasGraphqlInstance
{
  app: IApp;
  name: string;
  callerPlugin: GlueStackPlugin;
  containerController: IContainerController;
  isOfTypeInstance: boolean = false;
  gluePluginStore: IGlueStorePlugin;
  installationPath: string;

  constructor(
    app: IApp,
    callerPlugin: GlueStackPlugin,
    name: string,
    gluePluginStore: IGlueStorePlugin,
    installationPath: string,
  ) {
    this.app = app;
    this.name = name;
    this.callerPlugin = callerPlugin;
    this.gluePluginStore = gluePluginStore;
    this.installationPath = installationPath;
    //@ts-ignore
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

  getMinioInstance(): MinioPluginInstance {
    let minioInstance = null;
    const minio_instance = this.gluePluginStore.get("minio_instance");
    if (minio_instance) {
      const plugin: IPlugin & IManagesInstances = this.app.getPluginByName(
        "@gluestack/glue-plugin-minio",
      );
      if (plugin) {
        plugin.getInstances().forEach((instance: MinioPluginInstance) => {
          if (instance.getName() === minio_instance) {
            minioInstance = instance;
          }
        });
      }
      return minioInstance;
    }
  }

  getGraphqlInstance(): GraphqlPluginInstance {
    let graphqlInstance = null;
    const graphql_instance = this.gluePluginStore.get("graphql_instance");
    if (graphql_instance) {
      const plugin: IPlugin & IManagesInstances = this.app.getPluginByName(
        "@gluestack/glue-plugin-graphql",
      );
      if (plugin) {
        plugin.getInstances().forEach((instance: IInstance & IMinio) => {
          if (instance.getName() === graphql_instance) {
            graphqlInstance = instance;
          }
        });
      }
      return graphqlInstance;
    }
  }
}
