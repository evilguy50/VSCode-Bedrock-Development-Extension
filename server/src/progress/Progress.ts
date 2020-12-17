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
import { WorkDoneProgressParams } from "vscode-languageserver";
import { ProgressHandler } from "./ProgressHandler";

export class Progress {
  private static Handlers: Map<string, ProgressHandler> = new Map<string, ProgressHandler>();

  static get(name: string): ProgressHandler {
    let Out = this.Handlers.get(name);

    if (!Out) {
      Out = new ProgressHandler(name);
      this.Handlers.set(name, Out);
    }

    return Out;
  }

  static create(name: string, Title: string, value: number = 0, max: number = 1): ProgressHandler {
    let Out = new ProgressHandler(Title, value, max);
    this.Handlers.set(name, Out);

    return Out;
  }

  static attach(token: WorkDoneProgressParams, name: string, Title: string, value: number = 0, max: number = 1): ProgressHandler {
    let Out = ProgressHandler.Attach(token, Title, value, max);
    this.Handlers.set(name, Out);
    return Out;
  }

  /**
   *
   * @param value
   * @param update wheter or not to send an update to the client, default = true;
   */
  static setProgress(name: string, value: number, update: boolean = true): void {
    this.Handlers.get(name)?.setProgress(value, update);
  }

  /**
   * Sets the maximum value fo the progress
   * @param value
   * @param update
   */
  static setMax(name: string, value: number, update: boolean = false): void {
    this.Handlers.get(name)?.setMax(value, update);
  }

  /**
   * Marks the progress as done
   */
  static done(name: string) {
    let Item = this.Handlers.get(name);

    if (Item) {
      this.Handlers.delete(name);
      Item.done();
    }
  }
}