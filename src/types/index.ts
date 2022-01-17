export interface Color {
  name: ColorNames;
  value: string;
  set: Shade[];
  text?: string;
}

export interface Shade {
  shade: string;
  value: string;
  text: string;
}

export enum EventChannel {
  COLOR = "color-update",
  BACKGROUND = "background-update",
  FOREGROUND = "foreground-update",
}

export type Hex = string;

export interface RGB {
  red: number;
  green: number;
  blue: number;
}

export interface HSL {
  hue: number;
  saturation: number;
  lightness: number;
}

export enum ColorNames {
  BACKGROUND = "Background",
  FOREGROUND = "Foreground",
  PRIMARY = "Primary",
  SECONDARY = "Secondary",
  TERTIARY = "Tertiary",
  ERROR = "Error",
  WARNING = "Warning",
  CAUTION = "Caution",
  SUCCESS = "Success",
  INFO = "Info",
  NONE = "None",
}
