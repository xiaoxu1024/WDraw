<template>
  <div class="home">
    <ToolBar
      v-model="type"
      @undo="onUndo"
      @clear="onClear"
      @color="onColor"
    />
    <div
      id="container"
      :style="{ cursor: CURSOR_TYPE[type] }"
      @keydown.stop.prevent
      @mousewheel.stop.prevent
    ></div>
    <SideBox ref="sideBox" v-model="visible" />
  </div>
</template>

<script>
import WLeafer from '@/core/index.js'
import ToolBar from '@/components/toolbar.vue'
import SideBox from '@/components/sideBox.vue'
import { SELECT_TYPE, CURSOR_TYPE } from '@/lib/contants.js'

export default {
  name: 'HomePage',
  components: {
    ToolBar,
    SideBox,
  },
  data() {
    return {
      wLeafer: null,
      type: 'pen',
      curColor: '#ac9106',
      CURSOR_TYPE,
      visible: false,
    }
  },
  computed: {
    leafer() {
      return this.wLeafer.leafer
    },
    sideBox() {
      return this.$refs?.sideBox
    }
  },
  watch: {
    type() {
      console.log('type变化')
      this.visible = false
      this.wLeafer.unSelect()
    }
  },
  mounted() {
    this.wLeafer = new WLeafer(this.$el?.querySelector('#container'))

    // 添加事件
    this.wLeafer.on('click', this.onClick)
    document.addEventListener('keyup', this.onKeyup)

    window.leafer = this.wLeafer
  },
  methods: {
    onUndo() {
      this.wLeafer.undo()
    },
    async onClear() {
      this.$confirm({
        title: '清空确认',
        message: '确定清空所有数据吗？',
        confirmButtonText: '狠心清空',
        cancelButtonText: '再想想',
        confirmButtonColor: '#ff4d4f'
      }).then((res) => {
        res && this.wLeafer.clear()
      })
    },
    onColor(value) {
      this.curColor = value
    },
    onClick(e) {
      if (this.type == SELECT_TYPE.PEN) {
        this.wLeafer.fill(e, this.curColor)
      } else if (this.type == SELECT_TYPE.SELECT) {
        this.visible = this.wLeafer.select(e)
        this.sideBox?.refresh()
      } else if (this.type == SELECT_TYPE.ERASER) {
        this.wLeafer.delete(e)
      }
    },
    onKeyup(e) {
      console.log('keyup', e)
      e.preventDefault()
      // 绑定撤销按键
      if ((e.ctrlKey || e.metaKey) && e.keyCode === 90) {
        this.onUndo()
      }
    },
  }
}
</script>

<style scoped lang="scss">
.home {
  width: 100vw;
  height: 100vh;
  position: relative;

  #container {
    width: 100vw;
    height: 100vh;
    // background: rgba(128, 128, 128, 0.209);
  }
}
</style>
