<template>
  <div class="toolbar">
    <img
      class="toolbar_item"
      :class="{ selected: selectType === item.type }"
      v-for="(item, index) in types"
      :src="item.icon"
      :key="index"
      @click="onSelectType(item.type)"
    />
    <div class="toolbar_line"></div>
    <img class="toolbar_item" src="@/assets/undo.svg" @click="onUndo" />
    <img class="toolbar_item" src="@/assets/clear.svg" @click="onClear" />
    <input ref="color" class="color-picker" type="color" :value="defaultColor" @input="onColor">
  </div>
</template>

<script>
import { SELECT_TYPE } from '@/lib/contants.js'

export default {
  name: 'ToolBar',
  props: {
    value: String,
    defaultColor: {
      type: String,
      default: '#ac9106',
    },
  },
  data() {
    return {
      types: [
        { type: SELECT_TYPE.PEN, icon: require('@/assets/pen.svg') },
        { type: SELECT_TYPE.SELECT, icon: require('@/assets/select.svg') },
        { type: SELECT_TYPE.CURSOR, icon: require('@/assets/cursor.svg') },
        { type: SELECT_TYPE.ERASER, icon: require('@/assets/eraser.svg') },
      ],
      selectType: this.value,
    }
  },
  methods: {
    onSelectType(type) {
      this.selectType = type || SELECT_TYPE.PEN
      this.$emit('input', this.selectType)
    },
    onColor() {
      this.$emit('color', this.$refs?.color?.value || this.defaultColor)
    },
    onUndo() {
      this.$emit('undo')
    },
    onClear() {
      this.$emit('clear')
    }
  }
}
</script>

<style scoped lang="scss">
.toolbar {
  display: flex;
  align-items: center;
  gap: 14px;
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  border: 1px solid rgba(128, 128, 128, 0.209);
  padding: 6px 10px;
  border-radius: 6px;
  box-shadow: 
    0 4px 5px 0 rgba(0,0,0,0.14),
    0 1px 10px 0 rgba(0,0,0,0.12),
    0 2px 4px -1px rgba(0,0,0,0.20);

  .toolbar_item {
    width: 24px;
    height: 24px;
    padding: 4px;
    border-radius: 6px;

    &:hover {
      background: rgba(166, 166, 166, 0.1);
    }

    &.selected,
    &:active {
      background: rgba(166, 166, 166, 0.15);
    }
  }

  .toolbar_line {
    height: 16px;
    width: 1px;
    background: rgba(128, 128, 128, 0.209);
  }
}

.color-picker {
  appearance: none;
  -webkit-appearance: none;
  border: none;
  width: 24px;
  height: 24px;
  padding: 0;
  cursor: pointer;
  background: transparent;

  &:hover {
    transform: scale(1.1);
    transition: all 0.2s ease;
  }

  &::-webkit-color-swatch-wrapper {
    padding: 0; 
  }

  &::-webkit-color-swatch {
    border-radius: 0;
    border: 2px solid #f0f0f0;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
}
</style>