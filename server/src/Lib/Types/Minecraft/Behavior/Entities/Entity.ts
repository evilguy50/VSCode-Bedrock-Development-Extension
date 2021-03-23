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
export interface EntityEvent {
  run_command?: string;
  add?: { component_groups?: string[] };
  remove?: { component_groups?: string[] };
  sequence?: EntityEvent;
  random?: EntityEvent;
}

export interface ComponentContainer {
  [component: string]: any;
}

export interface Entity {
  format_version: string;
  "minecraft:entity": {
    description: {
      identifier: string;
      is_spawnable?: boolean;
      is_summonable?: boolean;
      is_experimental?: boolean;
      animations?: { [key: string]: string };
      scripts?: {
        animate?: string | object[];
      };
    };
    component_groups?: {
      [component_group: string]: ComponentContainer;
    };
    components?: ComponentContainer;
    events?: {
      [event: string]: EntityEvent;
    };
  };
}

export namespace Entity {
  export function is(data: Entity | undefined | null): data is Entity {
    if (data) {
      let mce = data["minecraft:entity"];

      if (mce && mce.description && mce.description.identifier) {
        return true;
      }
    }

    return false;
  }
}