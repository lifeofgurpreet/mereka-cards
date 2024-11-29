import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'app.mereka.cards',
  appPath: 'src',
  appResourcesPath: 'App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none',
    codeCache: true,
    enableMultithreadedJavascript: true
  },
  ios: {
    discardUncaughtJsExceptions: true,
    SPMPackages: [
      {
        name: "NFCReaderWriter",
        libs: ["NFCReaderWriter"],
        repositoryURL: "https://github.com/NFCReaderWriter/NFCReaderWriter.git",
        version: "1.1.1"
      }
    ]
  }
} as NativeScriptConfig;