import { PluginInstance } from "../PluginInstance";
import { PluginInstance as GraphqlPluginInstance } from "@gluestack/glue-plugin-graphql/src/PluginInstance";
export declare function copyToGraphql(storageInstance: PluginInstance, graphqlInstance: GraphqlPluginInstance): Promise<void>;
