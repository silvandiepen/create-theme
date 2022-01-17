import { reactive } from "vue";
import { Color, ColorNames, Hex, Shade } from "../types";
import { textColor, mix } from "../utils";

interface State {
  prefix: "";
  shades: number[];
  theme: Color[];
}

export const state = reactive<State>({
  prefix: "",
  shades: [100, 90, 75, 50, 25, 10],
  theme: [
    {
      name: ColorNames.BACKGROUND,
      value: "#ffffff",
      set: [],
    },
    {
      name: ColorNames.FOREGROUND,
      value: "#111111",
      set: [],
    },
    {
      name: ColorNames.PRIMARY,
      value: "#01eeff",
      set: [],
    },
    {
      name: ColorNames.SECONDARY,
      value: "#f7166c",
      set: [],
    },
    { name: ColorNames.TERTIARY, value: "#6a2ef7", set: [] },
    { name: ColorNames.CAUTION, value: "#fed02f", set: [] },
    {
      name: ColorNames.WARNING,
      value: "#fd8324",
      set: [],
    },
    {
      name: ColorNames.ERROR,
      value: "#fc1b1c",
      set: [],
    },
    {
      name: ColorNames.INFO,
      value: "#7abffc",
      set: [],
    },
    {
      name: ColorNames.SUCCESS,
      value: "#54d577",
      set: [],
    },
  ],
});

export const emptyColor = {
  name: ColorNames.NONE,
  value: "#ff0000",
  set: [],
};

export const getColor = (name: ColorNames): Color => {
  return state.theme.find((color) => color.name == name) || emptyColor;
};

export const getColorIndex = (name: ColorNames): number => {
  const index = state.theme.findIndex((color) => color.name == name);
  return index > -1 ? index : -1;
};

export const setColor = (newColor: Color): void => {
  const colorIndex = getColorIndex(newColor.name);
  if (colorIndex > -1) {
    state.theme[colorIndex] = {
      ...newColor,
      text: textColor(newColor.value),
    };
    if (
      newColor.name == ColorNames.BACKGROUND ||
      newColor.name == ColorNames.FOREGROUND
    ) {
      recalculateShades();
    } else {
      calculateShades(newColor.name);
    }
  }
};
export const getShades = (name: ColorNames): Shade[] => {
  const colorIndex = getColorIndex(name);
  return colorIndex > -1 ? createShades(getColor(name)) : [];
};

export const recalculateShades = (): void => {
  console.log("recalculating All shades");
  state.theme.forEach((color) => {
    calculateShades(color.name);
  });
};

export const calculateShades = (name: ColorNames): void => {
  // console.log("calculate Shades for", name);

  const colorIndex = getColorIndex(name);

  if (colorIndex > -1) {
    const shades = createShades(getColor(name));
    state.theme[colorIndex].set = shades;
  }
};

export const getMixColor = (name: ColorNames): Color => {
  const bg = getColor(ColorNames.BACKGROUND);
  const fg = getColor(ColorNames.FOREGROUND);

  if (name === ColorNames.BACKGROUND) {
    return fg;
  } else {
    return bg;
  }
};

export const createShades = (color: Color): Shade[] => {
  const shades: Shade[] = [];

  let mixing: string = getMixColor(color.name).value;

  state.shades.forEach((shade) => {
    const clr: Hex = mix(color.value, mixing, 1 - shade / 100);
    shades.push({
      shade: `${shade}`,
      value: clr,
      text: textColor(clr),
    });
  });

  // state.shades.forEach((shade) => {
  //   const clr: Hex = mix(color.value, mixing, 1 - shade / 100);

  //   shades.push({
  //     shade: `f${shade}`,
  //     value: clr,
  //     text: textColor(clr, state.theme),
  //   });
  // });

  // colors.push({
  //   shade: `100`,
  //   value: colorValue.value,
  //   text: currentText.value,
  // });

  return shades;
};
