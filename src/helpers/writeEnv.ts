import * as fs from "fs";
import { join } from "path";
import { PluginInstance } from "../PluginInstance";
import { PluginInstanceContainerController } from "../PluginInstanceContainerController";
import { PluginInstance as GraphqlPluginInstance } from "@gluestack/glue-plugin-graphql/src/PluginInstance";
import { getCrossEnvKey } from "@gluestack/helpers";
import { PluginInstance as MinioPluginInstance } from "@gluestack/glue-plugin-minio/src/PluginInstance";

async function constructEnvFromJson(
  storageInstance: PluginInstance,
  graphqlInstance: GraphqlPluginInstance,
  input: any
) {
  const minioJson = Object.keys(await storageInstance
    .getMinioInstance()
    .getContainerController()
    .getEnv());
  let env = "";
  //@ts-ignore
  const containerController: PluginInstanceContainerController =
    storageInstance.getContainerController();
  let port = "PORT";
  try {
    const mappings = require(join(process.cwd(), "router.map.js"))();
    port = mappings.api || "PORT";
  } catch (e) {
    //
  }
  let minioKeys: any = {};
  for (const key of minioJson) {
    minioKeys[key] = getEnvKey(storageInstance.getMinioInstance(), key)
  }

  const keys: any = {
    APP_PORT: await containerController.getPortNumber(),
    APP_BASE_URL: `%ENDPOINT_API%`,
    APP_ID: storageInstance.getName(),
    MAX_UPLOAD_SIZE: 100,
    ...minioKeys,
    HASURA_GRAPHQL_UNAUTHORIZED_ROLE: getEnvKey(
      graphqlInstance,
      "HASURA_GRAPHQL_UNAUTHORIZED_ROLE",
    ),
    HASURA_GRAPHQL_URL: getEnvKey(
      graphqlInstance,
      "GRAPHQL_URL",
    ),
    HASURA_GRAPHQL_ADMIN_SECRET: getEnvKey(
      graphqlInstance,
      "HASURA_GRAPHQL_ADMIN_SECRET",
    ),
    ...input
  };

  Object.keys(keys).map((key) => {
    env += `${key}="${keys[key]}"
`;
  });
  return env;
}

export async function writeEnv(
  storageInstance: PluginInstance,
  graphqlInstance: GraphqlPluginInstance,
  input: any
) {
  const path = `${storageInstance.getInstallationPath()}/.env`;
  fs.writeFileSync(
    path,
    await constructEnvFromJson(storageInstance, graphqlInstance, input),
  );
}

function getEnvKey(instance: MinioPluginInstance | GraphqlPluginInstance, key: string) {
  return `%${getCrossEnvKey(instance.getName(), key)}%`;
}