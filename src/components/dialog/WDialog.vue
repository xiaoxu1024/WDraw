<template>
  <transition name="fade">
    <div v-if="visible" class="confirm-mask">
      <div class="confirm-wrapper">
        <div class="confirm-container">
          <div class="confirm-header">
            <h3>{{ title }}</h3>
          </div>
          <div class="confirm-body">
            <p>{{ message }}</p>
          </div>
          <div class="confirm-footer">
            <button 
              @click="handleCancel"
              :style="{ color: cancelButtonColor }"
            >
              {{ cancelButtonText }}
            </button>
            <button 
              @click="handleConfirm"
              :style="{ backgroundColor: confirmButtonColor }"
            >
              {{ confirmButtonText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
/* eslint-disable */
export default {
  props: {
    title: {
      type: String,
      default: '提示'
    },
    message: String,
    confirmButtonText: {
      type: String,
      default: '确定'
    },
    cancelButtonText: {
      type: String,
      default: '取消'
    },
    confirmButtonColor: {
      type: String,
      default: '#409eff'
    },
    cancelButtonColor: {
      type: String,
      default: '#909399'
    }
  },

  data() {
    return {
      visible: false
    }
  },

  methods: {
    handleConfirm() {
      this.visible = false
      this.$emit('confirm')
    },

    handleCancel() {
      this.visible = false
      this.$emit('cancel')
    },

    show() {
      this.visible = true
    }
  }
}
</script>

<style scoped>
.confirm-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.confirm-wrapper {
  min-width: 400px;
}

.confirm-container {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.confirm-header h3 {
  margin: 0;
  font-size: 18px;
  color: #303133;
}

.confirm-body {
  margin: 20px 0;
  color: #606266;
}

.confirm-footer {
  text-align: right;
}

.confirm-footer button {
  padding: 8px 20px;
  border: none;
  border-radius: 4px;
  margin-left: 10px;
  cursor: pointer;
  transition: all 0.3s;
}

.confirm-footer button:last-child {
  color: #fff;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>