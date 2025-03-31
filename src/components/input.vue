<template>
  <div class="custom_input" :class="{ focus: isFocus }">
    <div v-if="tail" class="custom_tail">{{tail}}</div>
    <input
      :type="type"
      :value="innerValue"
      :min="min"
      :max="max"
      :step="step"
      placeholder="空"
      @focus="onFocus"
      @blur="onBlur"
      @input="onInput"
    >
    <div v-if="type === 'number'" class="custom_control">
      <svg :class="{ disabled: innerValue >= max }" viewBox="0 0 24 24" fill="none" @click="stepUp">
        <path d="M12 6V18M12 6L7 11M12 6L17 11" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <svg :class="{ disabled: innerValue <= min }" viewBox="0 0 24 24" fill="none" @click="stepDown">
        <path d="M12 18V6M12 18L7 13M12 18L17 13" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WInput',
  props: {
    type: {
      type: String,
      default: 'number'
    },
    value: {
      type: [Number, String],
      default: 0,
    },
    tail: String,
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 10000
    },
    step: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      isFocus: false,
      innerValue: '',
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(nv) {
        this.innerValue = this.formatValue(nv)
      }
    }
  },
  methods: {
    onFocus() {
      this.isFocus = true
    },
    onBlur() {
      this.isFocus = false
    },
    onInput(e) {
      if (this.innerValue === e.target.value) return

      this.innerValue = this.formatValue(e.target.value)
      this.$emit('input', this.innerValue)
      this.$emit('change', this.innerValue)
    },
    stepUp() {
      this.onInput({ target: { value: this.innerValue + this.step } })
    },
    stepDown() {
      this.onInput({ target: { value: this.innerValue - this.step } })
    },
    formatValue(value) {
      if (this.type === 'number') {
        const num = Math.max(this.min, Math.min(this.max, value))
        return +num.toFixed(1)
      } else if (this.type === 'text') {
        return value + ''
      } else {
        return value
      }
    },
  }
}
</script>

<style scoped lang="scss">
.custom_input {
  user-select: none;
  height: 36px;
  width: 100%;
  display: flex;
  padding: 4px 6px;
  border-radius: 8px;
  align-items: center;
  border: 1px solid #ddd;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  gap: 8px;
  box-sizing: border-box;

  &.focus {
    border-color: #6c5ce7;
    box-shadow: 0 0 0 3px rgba(108, 92, 231, 0.2);
  }
}

.custom_tail {
  font-size: 14px;
}

input {
  flex: 1;
  width: 0;
  font-size: 14px;
  color: #2d3436;
  border: none;
  outline: none;
  background: transparent;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}

.custom_control {
  display: flex;
  flex-direction: column;
  height: 36px;
  gap: 2px;
  justify-content: center;
  user-select: none;
  cursor: pointer;

  svg {
    width: 12px;
    height: 12px;
    color: #6c5ce7;
    cursor: pointer;
    border-radius: 2px;
    stroke-width: 2.5px;
    background: rgba(246, 248, 250, 1);
    transition: all 0.2s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

    &:hover:not(.disabled) {
      background: #6c5ce7;
      color: white;
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(108, 92, 231, 0.2);
    }

    &:active:not(.disabled) {
      transform: translateY(0);
    }

    &.disabled {
      background: #f8f9fa;
      color: #ced4da;
      cursor: not-allowed;
      box-shadow: none;
    }
  }
}
</style>