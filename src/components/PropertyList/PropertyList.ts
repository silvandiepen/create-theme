import { defineComponent, PropType, ref } from "vue";
import { Color, Shade } from "../../types";
import { Style } from "../../utils/style";
export default defineComponent({
  props: {
    theme: {
      type: Array as PropType<Color[]>,
      default: [],
    },
    value: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const style = new Style("property-list");

    const currentValue = ref(props.value);
    const update = () => {
      emit("input", currentValue);
    };
    const property = (color: Color, shade: Shade, additional = "") => {
      const prefix = currentValue.value ? `${currentValue}-` : "";
      const colorName = color.name.toLowerCase();
      const shadeValue = shade.shade ? `${shade.shade}` : ``;
      const add = additional ? `-${additional}` : ``;
      return `--${prefix}${colorName}${shadeValue}${add}`;
    };
    return { update, currentValue, property, style };
  },
});
