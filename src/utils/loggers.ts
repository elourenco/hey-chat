/** biome-ignore-all lint/suspicious/noConsole: <LOGGERS FAKE> */
export const Loggers = {
  error: (error: unknown) => {
    console.error('[Error] ', error);
  },
  info: (message: string) => {
    console.info('[Info] ', message);
  },
};
