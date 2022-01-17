import { defineComponent, PropType, ref, watch, watchEffect } from "vue";
import { setColor } from "../../state";
import { Color } from "../../types";
import { Style } from "../../utils/style";

export default defineComponent({
  props: {
    color: {
      type: Object as PropType<Color>,
      default: () => {},
    },
  },
  setup(props) {
    const style = new Style("color-input");
    const input = ref(props.color.value);

    const update = () => {
      setColor({ ...props.color, value: input.value });
    };

    return { input, update, style };
  },
});
