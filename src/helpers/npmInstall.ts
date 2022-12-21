const { SpawnHelper } = require("@gluestack/helpers");
import { PluginInstance } from "src/PluginInstance";

function installScript() {
  return ["npm", "install"];
}

export function npmInstall(pluginInstance: PluginInstance) {
  return new Promise((resolve, reject) => {
    console.log("\x1b[33m");
    console.log(
      `${pluginInstance.getName()}: Running \`${installScript().join(" ")}\``,
    );
    console.log("\x1b[0m");
    SpawnHelper.start(pluginInstance.getInstallationPath(), installScript())
      .then((resp: any) => {
        return resolve(true);
      })
      .catch((e: any) => {
        return reject(e);
      });
  });
}
