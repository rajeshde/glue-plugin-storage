import * as fs from "fs";
import { join } from "path";
import { PluginInstance } from "../PluginInstance";
import { PluginInstanceContainerController } from "../PluginInstanceContainerController";
import { PluginInstance as GraphqlPluginInstance } from "@gluestack/glue-plugin-graphql/src/PluginInstance";

async function constructEnvFromJson(
  storageInstance: PluginInstance,
  graphqlInstance: GraphqlPluginInstance,
) {
  const minioJson = await storageInstance
    .getMinioInstance()
    .getContainerController()
    .getEnv();
  let env = "";
  //@ts-ignore
  const containerController: PluginInstanceContainerController =
    storageInstance.getContainerController();
  const graphqlJson = await graphqlInstance.getContainerController().getEnv();
  let port = "PORT";
  try {
    const mappings = require(join(process.cwd(), "router.map.js"))();
    port = mappings.api || "PORT";
  } catch (e) {
    //
  }

  const keys: any = {
    APP_PORT: await containerController.getPortNumber(),
    APP_BASE_URL: `%ENDPOINT_API%`,
    APP_ID: storageInstance.getName(),
    MAX_UPLOAD_SIZE: 100,
    ...minioJson,
    HASURA_GRAPHQL_UNAUTHORIZED_ROLE:
      graphqlJson["HASURA_GRAPHQL_UNAUTHORIZED_ROLE"] || "",
    HASURA_GRAPHQL_URL: graphqlInstance.getGraphqlURL(),
    HASURA_GRAPHQL_ADMIN_SECRET:
      graphqlJson["HASURA_GRAPHQL_ADMIN_SECRET"] || "",
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
) {
  const path = `${storageInstance.getInstallationPath()}/.env`;
  fs.writeFileSync(
    path,
    await constructEnvFromJson(storageInstance, graphqlInstance),
  );
}
