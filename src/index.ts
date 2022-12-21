//@ts-ignore
import packageJSON from "../package.json";
import { PluginInstance } from "./PluginInstance";
import IApp from "@gluestack/framework/types/app/interface/IApp";
import IPlugin from "@gluestack/framework/types/plugin/interface/IPlugin";
import IInstance from "@gluestack/framework/types/plugin/interface/IInstance";
import ILifeCycle from "@gluestack/framework/types/plugin/interface/ILifeCycle";
import IManagesInstances from "@gluestack/framework/types/plugin/interface/IManagesInstances";
import IHasContainerController from "@gluestack/framework/types/plugin/interface/IHasContainerController";
import IGlueStorePlugin from "@gluestack/framework/types/store/interface/IGluePluginStore";
import { attachMinioInstance } from "./attachMinioInstance";

//Do not edit the name of this class
export class GlueStackPlugin implements IPlugin, IManagesInstances, ILifeCycle {
  app: IApp;
  instances: (IInstance & IHasContainerController)[];
  type: "stateless" | "stateful" | "devonly" = "stateless";
  gluePluginStore: IGlueStorePlugin;

  constructor(app: IApp, gluePluginStore: IGlueStorePlugin) {
    this.app = app;
    this.instances = [];
    this.gluePluginStore = gluePluginStore;
  }

  init() {
    //
  }

  destroy() {
    //
  }

  getName(): string {
    return packageJSON.name;
  }

  getVersion(): string {
    return packageJSON.version;
  }

  getType(): "stateless" | "stateful" | "devonly" {
    return this.type;
  }

  getTemplateFolderPath(): string {
    return `${process.cwd()}/node_modules/${this.getName()}/template`;
  }

  getInstallationPath(target: string): string {
    return `./backend/functions/${target}`;
  }

  async runPostInstall(instanceName: string, target: string) {
    const minioPlugin: GlueStackPlugin = this.app.getPluginByName(
      "@gluestack/glue-plugin-minio",
    );
    //Validation
    if (!minioPlugin || !minioPlugin.getInstances().length) {
      console.log("\x1b[36m");
      console.log(
        `Install minio instance: \`node glue add minio ${instanceName}-minio\``,
      );
      console.log("\x1b[31m");
      throw new Error(
        "Minio instance not installed from `@gluestack/glue-plugin-minio`",
      );
    }

    const storageInstance: PluginInstance = await this.app.createPluginInstance(
      this,
      instanceName,
      this.getTemplateFolderPath(),
      target,
    );

    await attachMinioInstance(storageInstance, minioPlugin.getInstances());
  }

  createInstance(
    key: string,
    gluePluginStore: IGlueStorePlugin,
    installationPath: string,
  ): IInstance {
    const instance = new PluginInstance(
      this.app,
      this,
      key,
      gluePluginStore,
      installationPath,
    );
    this.instances.push(instance);
    return instance;
  }

  getInstances(): (IInstance & IHasContainerController)[] {
    return this.instances;
  }
}
