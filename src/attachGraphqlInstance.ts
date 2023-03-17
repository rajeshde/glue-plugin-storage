const prompts = require("prompts");
import { PluginInstance } from "./PluginInstance";
import IInstance from "@gluestack/framework/types/plugin/interface/IInstance";
import { PluginInstance as GraphqlPluginInstance } from "@gluestack/glue-plugin-graphql/src/PluginInstance";

import { writeEnv } from "./helpers/writeEnv";
import { copyToGraphql } from "./helpers/copyToGraphql";
import reWriteFile from "./helpers/reWriteFile";
const { removeSpecialChars } = require("@gluestack/helpers");

export const setGraphqlConfig = async (
  storageInstance: PluginInstance,
  graphqlInstance: GraphqlPluginInstance,
) => {
  storageInstance.gluePluginStore.set(
    "graphql_instance",
    graphqlInstance.getName(),
  );
  graphqlInstance.gluePluginStore.set(
    "storage_instance",
    storageInstance.getName(),
  );
  return storageInstance.gluePluginStore.get("graphql_instance");
};

async function selectGraphqlInstance(graphqlInstances: IInstance[]) {
  const choices = graphqlInstances.map((graphqlInstance: PluginInstance) => {
    return {
      title: `${graphqlInstance.getName()}`,
      description: `Will attach graphql "${graphqlInstance.getName()}"`,
      value: graphqlInstance,
    };
  });
  const { value } = await prompts({
    type: "select",
    name: "value",
    message: "Select a graphql instance",
    choices: choices,
  });

  return value;
}

async function getMiddlwareConfig() {
  let input: any = {};
  const choices = [
    {
      title: "No auth",
      description: "No authentication required.",
      value: "no-auth",
    },
    {
      title: "Shared token auth",
      description: "Shared key based authentication.",
      value: "shared-token-auth",
    },
    {
      title: "JWT auth",
      description: "JWT token based authentication.",
      value: "jwt-auth",
    },
    {
      title: "Webhook auth",
      description: "Webhook mode for authentication by specifying a URL.",
      value: "webhook-auth",
    },
  ];
  const { value } = await prompts({
    type: "select",
    name: "value",
    message: "Select private files authentication method",
    choices: choices,
  });

  const defaultOptions = {
    sharedToken: "shared-secret",
    webhookUrl: "https://<your-custom-webhook-url>/",
  };

  let key = defaultOptions.sharedToken;
  let url = defaultOptions.webhookUrl;

  input.MIDDLEWARE_USE = value;

  if (value === "shared-token-auth") {
    const response = await prompts({
      type: "text",
      name: "key",
      message: "What would be your shared key?",
      initial: defaultOptions.sharedToken,
    });
    key = response.key;
  }

  if (value === "webhook-auth") {
    const response = await prompts({
      type: "text",
      name: "url",
      message: "What would be your webhook URL?",
      initial: defaultOptions.webhookUrl,
    });
    url = response.url;
  }

  input.MIDDLEWARE_SHARED_SECRET = key || defaultOptions.sharedToken;
  input.MIDDLEWARE_WEBHOOK_URL = url || defaultOptions.webhookUrl;

  return input;
}

export async function attachGraphqlInstance(
  storageInstance: PluginInstance,
  graphqlInstances: GraphqlPluginInstance[],
) {
  const graphqlInstance: GraphqlPluginInstance = await selectGraphqlInstance(
    graphqlInstances,
  );
  if (graphqlInstance) {
    await setGraphqlConfig(storageInstance, graphqlInstance);

    const input = await getMiddlwareConfig();

    await writeEnv(storageInstance, graphqlInstance, input);

    await copyToGraphql(storageInstance, graphqlInstance);

    const routerFilePath = `${storageInstance.getInstallationPath()}/router.js`;
    await reWriteFile(
      routerFilePath,
      removeSpecialChars(storageInstance.getName()),
      "services",
    );
  }
}
