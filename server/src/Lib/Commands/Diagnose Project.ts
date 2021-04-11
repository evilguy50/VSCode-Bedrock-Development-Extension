import { ExecuteCommandParams, MessageType, ShowMessageNotification } from "vscode-languageserver";
import { Console } from "../Console/Console";
import { Database } from "../Database/include";
import { DiagnoseContext } from "../Diagnostics/Types/Context";
import { Manager } from "../Manager/Manager";
import { Behavior, World } from "../Types/Minecraft/include";
import { GetValidationData } from "../Validation/include";

export function DiagnoseProjectCommand(params: ExecuteCommandParams) {
  Console.Log("Starting on diagnosing project");

  Database.MinecraftProgramData.GetProjecData((data) => {
    let Validation = GetValidationData(data.Workspaces);

    let context: DiagnoseContext = {
      projectStructure: data,
      data: Validation,
    };

    if (Manager.State.TraversingProject || !Manager.State.DataGathered) {
      Manager.Connection.sendNotification(ShowMessageNotification.type, {
        message: "Extension is traversing the project. please wait a couple more seconds.",
        type: MessageType.Info,
      });
      return;
    }

    World.Diagnose(context);
    Behavior.Diagnose(context);

    Console.Log("Diagnosing done");
  });
}
