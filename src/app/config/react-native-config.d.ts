declare module 'react-native-config' {
  export interface NativeConfig {
    baseUrl?: string;
    versionApp?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
