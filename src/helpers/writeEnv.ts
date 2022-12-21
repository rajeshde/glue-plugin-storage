import * as fs from "fs";
import IInstance from "@gluestack/framework/types/plugin/interface/IInstance";

function constructEnvFromJson(minioInstance: IInstance, json: any): string {
  let env = "";
  Object.keys(json).map((key) => {
    env += `${key}="${json[key]}"
`;
  });
  return env;
}

export async function writeEnv(
  storageInstance: IInstance,
  minioInstance: IInstance,
  json: any,
) {
  const path = `${storageInstance.getInstallationPath()}/.env`;
  fs.writeFileSync(path, constructEnvFromJson(minioInstance, json));
}
