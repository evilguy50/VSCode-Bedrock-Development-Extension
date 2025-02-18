import { Identifiable } from "bc-minecraft-bedrock-types/lib/src/Types/Identifiable";
import { MinecraftData } from "bc-minecraft-bedrock-vanilla-data";
import { SimpleContext } from "../../../Code/SimpleContext";
import { CompletionBuilder } from "../../../Completion/Builder";
import { Database } from "../../../Database/Database";
import { IsEducationEnabled } from "../../../Project/Attributes";
import { Kinds } from "../../General/Kinds";

export function ProvideCompletion(context: SimpleContext<CompletionBuilder>): void {
  const generateDoc = (item: Identifiable) => `The block definition: ${item.id}`;

  context.receiver.Generate(Database.ProjectData.BehaviorPacks.blocks, generateDoc, Kinds.Completion.Block);

  //Vanilla data
  context.receiver.Generate(MinecraftData.vanilla.BehaviorPack.blocks, generateDoc, Kinds.Completion.Block);

  //Education data
  if (IsEducationEnabled(context.doc)) context.receiver.Generate(MinecraftData.edu.BehaviorPack.blocks, generateDoc, Kinds.Completion.Block);
}
