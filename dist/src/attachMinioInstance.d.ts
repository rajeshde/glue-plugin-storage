import { PluginInstance } from "./PluginInstance";
import { PluginInstance as MinioPluginInstance } from "@gluestack/glue-plugin-minio/src/PluginInstance";
export declare const setMinioConfig: (storageInstance: PluginInstance, minioInstance: PluginInstance) => Promise<any>;
export declare function attachMinioInstance(storageInstance: PluginInstance, minioInstances: (MinioPluginInstance)[]): Promise<void>;
