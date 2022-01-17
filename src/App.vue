<template>
  <div class="layout">
    <div class="color-panels">
      <ColorPanel
        v-for="(color, index) in theme"
        :key="index"
        :color="color.name"
      />
    </div>
    {{ prefix }}
    <PropertyList v-model="prefix" :theme="theme" />
  </div>
  <SampleContent />
</template>

<script lang="ts">
import { defineComponent, computed, watchEffect } from "vue";
import ColorPanel from "./components/ColorPanel/ColorPanel.vue";
import SampleContent from "./components/SampleContent/SampleContent.vue";
import PropertyList from "./components/PropertyList/PropertyList.vue";

import { state } from "./state";

export default defineComponent({
  components: {
    ColorPanel,
    PropertyList,
    SampleContent,
  },
  setup() {
    const style = computed(() => {
      let styleData = ``;

      state.theme.forEach((p) => {
        const pref = ``;
        const property = `--${pref}${p.name.toLowerCase()}`;
        const value = p.value;
        const line = ` ${property}: ${value};`;
        const textLine = ` ${property}-text: ${p.text};`;

        styleData += line;
        styleData += textLine;

        p.set.forEach((shade) => {
          const shadeProperty = `${property}${shade.shade}`;
          const shadeValue = shade.value;
          const shadeLine = ` ${shadeProperty}: ${shadeValue};`;
          const textShadeLine = ` ${shadeProperty}-text: ${shade.text};`;
          styleData += shadeLine;
          styleData += textShadeLine;
        });
      });

      return `body{ ${styleData} }`;
    });

    const setCustomStyle = () => {
      const head = document.querySelector("head");
      if (head) {
        const styleElement = head.querySelector("style#custom");
        if (styleElement) styleElement.remove();

        const createdStyleElement = document.createElement("style");
        createdStyleElement.setAttribute("type", "text/css");
        createdStyleElement.setAttribute("id", "custom");

        createdStyleElement.innerText = style.value;

        head.appendChild(createdStyleElement);
      }
    };

    watchEffect(() => {
      setCustomStyle();
    });

    return {
      theme: state.theme,
      prefix: state.prefix,
    };
  },
});
</script>

<style lang="scss">
@import "@sil/themer/use";

.color-panels {
  padding: 1em;
  display: flex;
  flex-wrap: wrap;

  .color-panel {
    width: 20%;
  }
}
.layout {
  display: flex;
  align-items: flex-start;
  color: variable(foreground);
  background-color: variable(background);
  .property-list {
    // height: 50vh;
    max-height: 100vh;
    flex-shrink: 0;
    width: 25%;
  }
}
</style>
