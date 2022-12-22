import * as fs from "fs";
import IInstance from "@gluestack/framework/types/plugin/interface/IInstance";
import { PluginInstance } from "../PluginInstance";
import { PluginInstanceContainerController } from "../PluginInstanceContainerController";

function constructEnvFromJson(
  storageInstance: PluginInstance,
  minioInstance: IInstance,
  json: any,
): string {
  let env = "";
  //@ts-ignore
  const containerController: PluginInstanceContainerController =
    storageInstance.getContainerController();
  json.APP_PORT = containerController.getPortNumber(true);
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
    constructEnvFromJson(storageInstance, minioInstance, json),
  );
}
