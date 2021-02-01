/*BSD 3-Clause License

Copyright (c) 2020, Blockception Ltd
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
   contributors may be used to endorse or promote products derived from
   this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.*/
import { CompletionList } from "vscode-languageserver";
import { Database } from "../../../database/include";
import { Entity } from '../include';
import { Kinds } from "../Kinds";

export function provideFamilyCompletion(receiver: CompletionList, type: string | undefined = undefined): void {
  if (type) {
    let entity = Database.Data.General.Entities.GetFromID(type);

    if (entity) {
      ConvertEntity(entity, receiver);
    }
  }
  else {
    Database.Data.General.Entities.ForEach(entity => ConvertEntity(entity, receiver));
  }
}

function ConvertEntity(entity: Entity.Entity, receiver: CompletionList) {
  entity.Families.forEach(family => {
    receiver.items.push(
      { label: family, kind: Kinds.Completion.Family, documentation: "The entity family: " + family }
    )
  });
}

export function provideFamilyTestCompletion(receiver: CompletionList, type: string | undefined = undefined): void {
  if (type) {
    let entity = Database.Data.General.Entities.GetFromID(type);

    if (entity) {
      ConvertTestEntity(entity, receiver);
    }
  }
  else {
    Database.Data.General.Entities.ForEach((entity) => ConvertTestEntity(entity, receiver));
  }
}

function ConvertTestEntity(entity: Entity.Entity, receiver: CompletionList) {
  entity.Families.forEach(family => {
    receiver.items.push(
      { label: family, kind: Kinds.Completion.Family, documentation: "test for the Family: " + family },
      { label: "!" + family, kind: Kinds.Completion.Family, documentation: "test not for the Family: " + family }
    );
  });
}