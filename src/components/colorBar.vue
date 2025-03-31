<template>
  <div class="color_bar">
    <div
      class="color_base"
      :class="{ selected: selectedColor == item }"
      :style="{ background: item }"
      v-for="item in ColorArr"
      :key="item"
      @click="onClick(item)"
    ></div>
    <div class="color_base select" :class="{ selected: !hasBaseColor }">
      <img src="@/assets/color.svg">
      <input ref="color" class="color_picker" type="color" :value="selectedColor" @input="onColor">
    </div>
  </div>
</template>

<script>
const ColorArr = [
  '#ac9106',
  '#ff6370',
  '#ff764c',
  '#ffde6b',
  '#70cf97',
  '#2884ff',
  '#725cff'
]
export default {
  name: 'ColorBar',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      ColorArr,
      selectedColor: ''
    }
  },
  computed: {
    hasBaseColor() {
      return ColorArr.find((color) => color == this.selectedColor)
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.selectedColor = val
      }
    }
  },
  methods: {
    onClick(item) {
      this.$emit('input', item)
      this.$emit('change', item)
    },
    onColor() {
      const color = this.$refs?.color?.value || this.color
      this.$emit('input', color)
      this.$emit('change', color)
    }
  }
}
</script>

<style scoped lang="scss">
.color_bar {
  display: flex;
  align-items: center;
  gap: 8px;

  .color_base {
    display: inline-block;
    width: 26px;
    height: 26px;
    border-radius: 1000px;
    text-align: center;
    border: 2px solid #ddd;

    img {
      width: 26px;
      height: 26px;
    }

    &.select {
      position: relative;
      // pointer-events: none;
    }
  }

  .color_picker {
    opacity: 0;
    z-index: 2;
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 100%;
    transform: translate(-50%, -50%);
    appearance: none;
    -webkit-appearance: none;
    border: none;
    width: 26px;
    height: 26px;
    padding: 0;
    cursor: pointer;
    background: transparent;

    &::-webkit-color-swatch-wrapper {
      padding: 0; 
    }
  }
}
.selected {
  transform: scale(1.2);
  border-color: #aaa !important;
}
</style>