import { Hex, RGB, HSL, ColorNames, Color } from "../types";
import { getColor } from "../state";

export const textColor = (color: string): string => {
  const bg = getColor(ColorNames.BACKGROUND);
  const fg = getColor(ColorNames.FOREGROUND);

  const colorL = HexToLuminance(color);

  const bgL = HexToLuminance(bg.value);
  const fgL = HexToLuminance(fg.value);

  const dark = bgL > fgL ? bg : fg;
  const light = bgL > fgL ? fg : bg;

  return colorL > 255 / 2 ? light.value : dark.value;
};

export const mix = (colorA: string, colorB: string, amount: number): string => {
  const colorA_array = colorA.match(/\w\w/g);
  const colorB_array = colorB.match(/\w\w/g);

  if (colorA_array == null || colorB_array == null) return "#000000";

  const [rA, gA, bA] = colorA_array.map((c) => parseInt(c, 16));
  const [rB, gB, bB] = colorB_array.map((c) => parseInt(c, 16));

  const rgb: RGB = {
    red: 0,
    green: 0,
    blue: 0,
  };

  rgb.red = Math.round(rA + (rB - rA) * amount);
  rgb.green = Math.round(gA + (gB - gA) * amount);
  rgb.blue = Math.round(bA + (bB - bA) * amount);

  return rgbToHex(rgb);
};

export const hexToRgb = (hex: string): RGB => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        red: parseInt(result[1], 16),
        green: parseInt(result[2], 16),
        blue: parseInt(result[3], 16),
      }
    : {
        red: 0,
        green: 0,
        blue: 0,
      };
};

export const componentToHex = (c: number): Hex => {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
};

export const rgbToHex = (rgb: RGB): Hex => {
  const cth = componentToHex;
  return `#${cth(rgb.red)}${cth(rgb.green)}${cth(rgb.blue)}`;
};

export const hexToHsl = (hex: Hex): HSL => {
  return rgbToHsl(hexToRgb(hex));
};

export const RgbToLuminance = (rgb: RGB): number => {
  return 0.299 * rgb.red + 0.587 * rgb.green + 0.114 * rgb.blue;
};
export const HexToLuminance = (hex: Hex): number =>
  RgbToLuminance(hexToRgb(hex));

export const rgbToHsl = (rgb: RGB): HSL => {
  (rgb.red /= 255), (rgb.green /= 255), (rgb.blue /= 255);
  const max = Math.max(rgb.red, rgb.green, rgb.blue);
  const min = Math.min(rgb.red, rgb.green, rgb.blue);

  let hue;
  let sat;
  let light = (max + min) / 2;

  if (max == min) {
    hue = sat = 0; // achromatic
  } else {
    var d = max - min;
    sat = light > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case rgb.red:
        hue = (rgb.green - rgb.blue) / d + (rgb.green < rgb.blue ? 6 : 0);
        break;
      case rgb.green:
        hue = (rgb.blue - rgb.red) / d + 2;
        break;
      case rgb.blue:
        hue = (rgb.red - rgb.green) / d + 4;
        break;
    }
    if (hue) hue /= 6;
  }

  return { hue: hue || 0, saturation: sat, lightness: light };
};
