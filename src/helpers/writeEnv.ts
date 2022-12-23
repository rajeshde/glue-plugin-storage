import * as fs from "fs";
import IInstance from "@gluestack/framework/types/plugin/interface/IInstance";
import { PluginInstance } from "../PluginInstance";
import { PluginInstanceContainerController } from "../PluginInstanceContainerController";

async function constructEnvFromJson(
  storageInstance: PluginInstance,
  minioInstance: IInstance,
  json: any,
) {
  let env = "";
  //@ts-ignore
  const containerController: PluginInstanceContainerController =
    storageInstance.getContainerController();
  json.APP_PORT = await containerController.getPortNumber();
  Object.keys(json).map((key) => {
    env += `${key}="${json[key]}"
`;
  });
  return env;
}

export async function writeEnv(
  storageInstance: PluginInstance,
  minioInstance: IInstance,
  json: any,
) {
  const path = `${storageInstance.getInstallationPath()}/.env`;
  fs.writeFileSync(
    path,
    await constructEnvFromJson(storageInstance, minioInstance, json),
  );
}
