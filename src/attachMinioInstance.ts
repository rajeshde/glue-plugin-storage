const prompts = require("prompts");
import { PluginInstance } from "./PluginInstance";
import IInstance from "@gluestack/framework/types/plugin/interface/IInstance";
import IHasContainerController from "@gluestack/framework/types/plugin/interface/IHasContainerController";

export const setMinioConfig = async (
  storageInstance: PluginInstance,
  minioInstance: PluginInstance,
) => {
  storageInstance.gluePluginStore.set(
    "minio_instance",
    minioInstance.getName(),
  );
  return storageInstance.gluePluginStore.get("minio_instance");
};

async function selectMinioInstance(minioInstances: IInstance[]) {
  const choices = minioInstances.map((instance: PluginInstance) => {
    return {
      title: `${instance.getName()}`,
      description: `Will attach minio storage running on port "${
        instance.getContainerController().portNumber
      }"`,
      value: instance,
    };
  });
  const { value } = await prompts({
    type: "select",
    name: "value",
    message: "Select an instance",
    choices: choices,
  });

  return value;
}

export async function attachMinioInstance(
  storageInstance: PluginInstance,
  minioInstances: (IInstance & IHasContainerController)[],
) {
  const instance = await selectMinioInstance(minioInstances);
  if (instance) {
    await setMinioConfig(storageInstance, instance);
  }
}
