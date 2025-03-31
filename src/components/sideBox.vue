<template>
  <transition name="slide-fade">
    <div v-if="value" class="sidebar-wrapper" @mousewheel.stop.prevent>
      <div class="sidebar-container">
        <div class="sidebar-body">
          <!-- 颜色 -->
          <Layout title="颜色">
            <ColorBar v-model="color" @change="onChange" />
          </Layout>

          <!-- 形状 -->
          <Layout title="形状">
            <div class="row_wrap">
              <div
                class="sidebar_shape"
                v-for="item in ShapeArr"
                :style="item.style"
                :key="item.id"
              ></div>
            </div>
          </Layout>

          <!-- 大小 -->
          <Layout title="尺寸">
            <WInput
              v-model="size[item.id]"
              v-for="item in SizeArr"
              :tail="item.desc"
              :key="item.id"
              @change="onChange"
            />
          </Layout>

          <!-- 透明度 -->
          <Layout title="透明度">
            <WInput v-model="opacity" :max="1" :step="0.1" @change="onChange" />
          </Layout>

          <!-- 圆角 -->
          <Layout title="圆角">
            <WInput
              v-model="cornerRadius[item]"
              v-for="item in Object.keys(cornerRadius)"
              :key="item"
              @change="onChange"
            />
          </Layout>

          <!-- 边框 -->
          <Layout title="边框">
            <WInput />
          </Layout>

          <!-- 文本 -->
          <Layout title="文本">
            <WInput v-model="text" type="text" @change="onChange" />
          </Layout>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { ShapeArr, SizeArr, ColorArr } from '@/lib/attrConfig'
import Layout from '@/components/layout.vue'
import WInput from '@/components/input.vue'
import ColorBar from '@/components/colorBar.vue'
export default {
  components: {
    Layout,
    WInput,
    ColorBar,
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      ColorArr,
      ShapeArr,
      SizeArr,
      color: '',
      opacity: 1,
      text: '',
      cornerRadius: {
        a: 0,
        b: 0,
        c: 0,
        d: 0
      },
      size: {
        width: 0,
        height: 0
      } 
    }
  },
  computed: {
    cell() {
      return window?.leafer?.selection?.cell
    }
  },
  watch: {
    value(newVal) {
      if (newVal) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'auto'
        this.reset()
      }
    }
  },
  beforeDestroy() {
    this.reset()
  },
  methods: {
    refresh() {
      this.color = this.cell?.fill
      this.text = this.getText()
      this.size.width = this.cell?.width
      this.size.height = this.cell?.height
      this.opacity = this.cell?.opacity
      this.cornerRadius =
        Array.isArray(this.cell?.cornerRadius)
        ? this.cell?.cornerRadius
        : [this.cell?.cornerRadius, 0, 0, 0]
    },
    reset() {
      this.size = { width: 0, height: 0 }
    },
    clearChild(filter = []) {
      const children = this.cell.children || []

      for (const child of children) {
        if (filter.find((f) => f == child.tag)) {
          child?.remove()
        }
      }
    },
    getText() {
      let text = ''
      const children = this.cell?.children || []

      for (const child of children) {
        if (child.tag == 'Text') {
          text += child.text
        }
      }

      return text
    },
    setText() {
      this.clearChild(['Text'])
      this.cell.add({
        tag: 'Text',
        width: 25,
        height: 25,
        textAlign: 'center',
        fill: '#32cd79',
        text: this.text,
      })
    },
    onChange() {
      if (this.cell) {
        this.cell.fill = this.color
        this.cell.width = this.size.width
        this.cell.height = this.size.height
        this.cell.opacity = this.opacity
        this.cell.cornerRadius = this.cornerRadius
        this.setText()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.row_wrap {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}
.sidebar_shape {
  width: 32px;
  height: 32px;
  background: red;
}

.sidebar_size {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>

<style scoped>
/* 侧边栏容器 */
.sidebar-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 360px;
  z-index: 999;
  margin: 8px 0;
  display: flex;
  flex-direction: column;
  box-shadow: 
    -4px 0 24px rgba(0, 0, 0, 0.08),  /* 主阴影层 */
    -8px 0 48px rgba(0, 0, 0, 0.04);  /* 扩散阴影层 */
  border-left: 1px solid rgba(255, 255, 255, 0.1); /* 左侧高光线 */
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.98) 0%,
    rgba(246, 248, 250, 0.98) 100%
  ); /* 渐变背景 */
  backdrop-filter: blur(12px); /* 毛玻璃效果 */
  border-radius: 12px 0 0 12px; /* 左侧圆角 */
}

@media (max-width: 768px) {
  /* 移动端样式 */
  .sidebar-container {
    width: 100%;
    height: 40%;
    top: unset;
    left: 0;
    right: 0;
    bottom: 0;
  }
}

/* 内容区域 */
.sidebar-body {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* 动画效果 */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
}

.slide-fade-enter .sidebar-container,
.slide-fade-leave-to .sidebar-container {
  transform: translateX(100%);
}

.slide-fade-enter-active .sidebar-container,
.slide-fade-leave-active .sidebar-container {
  transition: transform 0.3s ease;
}

.slide-fade-enter-active {
  transition: 
    opacity 0.3s ease-out,
    transform 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

.slide-fade-leave-active {
  transition: 
    opacity 0.2s ease-in,
    transform 0.25s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}
</style>