import { PluginInstance } from "../PluginInstance";
import { PluginInstance as GraphqlPluginInstance } from "@gluestack/glue-plugin-graphql/src/PluginInstance";

export async function copyToGraphql(
  storageInstance: PluginInstance,
  graphqlInstance: GraphqlPluginInstance,
) {
  const graphqlJson = await graphqlInstance.getContainerController().getEnv();

  await graphqlInstance.copyMigration(
    storageInstance.callerPlugin.getMigrationFolderPath(),
  );

  const trackJson = {
    type: "bulk",
    args: [
      {
        type: "pg_track_table",
        args: {
          source: graphqlInstance.getDbName(),
          table: "files",
        },
      },
      {
        type: "pg_create_insert_permission",
        args: {
          table: "files",
          source: graphqlInstance.getDbName(),
          role: graphqlJson["HASURA_GRAPHQL_UNAUTHORIZED_ROLE"],
          permission: {
            check: {},
            columns: "*",
          },
        },
      },
      {
        type: "pg_create_select_permission",
        args: {
          table: "files",
          source: graphqlInstance.getDbName(),
          role: graphqlJson["HASURA_GRAPHQL_UNAUTHORIZED_ROLE"],
          permission: {
            columns: "*",
            filter: {},
            limit: 10,
            allow_aggregations: true,
          },
        },
      },
      {
        type: "pg_create_update_permission",
        args: {
          table: "files",
          source: graphqlInstance.getDbName(),
          role: graphqlJson["HASURA_GRAPHQL_UNAUTHORIZED_ROLE"],
          permission: {
            filter: {},
            columns: "*",
          },
        },
      },
      {
        type: "pg_create_delete_permission",
        args: {
          table: "files",
          source: graphqlInstance.getDbName(),
          role: graphqlJson["HASURA_GRAPHQL_UNAUTHORIZED_ROLE"],
          permission: {
            filter: {},
            columns: "*",
          },
        },
      },
    ],
  };

  await graphqlInstance.copyTrackJson(`public_files.json`, trackJson);
}
