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
import { Range, SemanticTokens } from 'vscode-languageserver/node';
import { SemanticTokensParams, SemanticTokensRangeParams } from 'vscode-languageserver/node';
import { GetDocument } from '../code/include';
import * as Constants from '../Constants'
import { ProvideJsonSemanticTokens } from './Json';

export function OnProvideSemanticRequestAsync(params: SemanticTokensParams): Promise<SemanticTokens> {
   return new Promise<SemanticTokens>((resolve, reject) => {
      resolve(OnProvideSemanticRequest(params));
   });
}

export function OnProvideRangeSemanticRequestAsync(params: SemanticTokensRangeParams): Promise<SemanticTokens> {
   return new Promise<SemanticTokens>((resolve, reject) => {
      resolve(OnProvideSemanticRequest(params));
   });
}


function OnProvideSemanticRequest(params: SemanticTokensRangeParams | SemanticTokensParams): SemanticTokens {
   let doc = GetDocument(params.textDocument.uri);
   let range : Range | undefined = undefined;

   if (IsSemanticTokensRangeParams(params)) {
      range = params.range;
   }

   switch(doc.languageId) {
      case Constants.JsonCIdentifier:
      case Constants.JsonIdentifier:
         return ProvideJsonSemanticTokens(doc, range);
         
   }
}


function IsSemanticTokensRangeParams(value: SemanticTokensRangeParams | SemanticTokensParams): value is SemanticTokensRangeParams {
   let temp : any = value;

   if (temp.range)
      if (Range.is(temp.range))
         return true;

   return false;
}