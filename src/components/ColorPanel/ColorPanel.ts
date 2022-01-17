import { defineComponent, PropType, ref, computed } from "vue";
import { Color, ColorNames } from "../../types";
import { state, getColor, recalculateShades } from "../../state";
import { hexToHsl } from "../../utils";
import ColorInput from "../ColorInput/ColorInput.vue";
import { Style } from "../../utils/style";

export default defineComponent({
  components: {
    ColorInput,
  },
  props: {
    color: {
      type: String as PropType<ColorNames>,
      default: () => {},
    },
  },
  setup(props) {
    const style = new Style("color-panel");
    const currentText = ref<string>("");

    const currentColor = computed<Color>(() => {
      return getColor(props.color);
    });

    recalculateShades();

    const getLightness = (color: string) => {
      const hsl = hexToHsl(color);
      return Math.round(hsl.lightness * 100);
    };

    return {
      currentColor,
      colors: state.theme,
      text: currentText,
      getLightness,
      style,
    };
  },
});
