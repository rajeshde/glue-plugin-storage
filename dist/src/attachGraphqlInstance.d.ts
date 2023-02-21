import { PluginInstance } from "./PluginInstance";
import { PluginInstance as GraphqlPluginInstance } from "@gluestack/glue-plugin-graphql/src/PluginInstance";
export declare const setGraphqlConfig: (storageInstance: PluginInstance, graphqlInstance: GraphqlPluginInstance) => Promise<any>;
export declare function attachGraphqlInstance(storageInstance: PluginInstance, graphqlInstances: GraphqlPluginInstance[]): Promise<void>;
