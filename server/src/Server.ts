/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import { isMainThread } from "worker_threads";
import { SetupServer } from "./Server/include";

//Setup the server
if (isMainThread) {
  SetupServer();
} else {
  //If worker thread
}