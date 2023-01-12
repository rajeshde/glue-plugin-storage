import { PluginInstance as MinioPluginInstance } from "@gluestack/glue-plugin-minio/src/PluginInstance";

export interface IHasMinioInstance {
  getMinioInstance():  MinioPluginInstance;
}
