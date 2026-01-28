/** biome-ignore-all lint/suspicious/noConsole: <LOGGERS FAKE> */
export const Loggers = {
  error: (error: unknown) => {
    console.log('[Error] ', JSON.stringify(error));
  },
  info: (message: string) => {
    console.info('[Info] ', message);
  },
};
