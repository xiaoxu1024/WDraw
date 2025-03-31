import '@leafer-in/viewport'
import { Leafer, Box } from 'leafer-ui'
import Draft from '@/core/draft'
import config from '@/core/config'
import History from '@/core/history'
import Selection from '@/core/selection'
const GRID_SIZE = 25
const GRID_MAX = 100000
const GRID_COLOR = '#ddd'

class WLeafer {
  static instance

  constructor(container) {

    if (WLeafer?.instance) {
      return WLeafer.instance
    }

    WLeafer.instance = new Leafer({
      ...config,
      view: container
    })

    this.selectedCell = null
    this.draft = new Draft()
    this.history = new History(this.leafer)
    this.selection = new Selection(this.leafer)

    this.init()
  }

  get leafer() {
    return WLeafer.instance
  }

  // 初始化
  init() {
    this.addGrid()
  }

  // 添加网格
  addGrid() {
    console.log('addGrid')
    for (let x = -GRID_MAX; x < GRID_MAX; x += GRID_SIZE) {
      this.leafer.add({
        tag: 'Line',
        points: [x, -GRID_MAX, x, GRID_MAX],
        stroke: GRID_COLOR,
        strokeWidth: 0.25
      })
    }
    for (let y = -GRID_MAX; y < GRID_MAX; y += GRID_SIZE) {
      this.leafer.add({
        tag: 'Line',
        points: [-GRID_MAX, y, GRID_MAX, y],
        stroke: GRID_COLOR,
        strokeWidth: 0.25
      })
    }
  }

  getKey(e) {
    if (!e) return ''

    // 1. 转换到虚拟画布坐标系
    const localX = (e.x - this.leafer.x) / this.leafer.scaleX
    const localY = (e.y - this.leafer.y) / this.leafer.scaleY

    // 2. 计算网格坐标
    const gridX = Math.floor(localX / GRID_SIZE) * GRID_SIZE
    const gridY = Math.floor(localY / GRID_SIZE) * GRID_SIZE

    return `${gridX},${gridY}`
  }

  // 填充颜色
  fill(e, color) {
    const key = this.getKey(e)
    const [gridX, gridY] = key.split(',')

    if (this.draft.has(key)) {
      // 更新现有方块颜色
      const oldColor = this.draft.get(key)?.fill
      this.draft.get(key).fill = color
      this.history.update(gridX, gridY, color, oldColor)
    } else {
      // 创建新颜色方块
      const cell = new Box({
        x: gridX - 0.2,
        y: gridY - 0.2,
        width: GRID_SIZE + 0.4,
        height: GRID_SIZE + 0.4,
        fill: color,
      })
      this.leafer.add(cell)
      this.draft.set(key, cell)
      this.history.add(gridX, gridY, color)
    }

    this.unSelect()
  }

  clear() {
    const children = this.leafer.children || []
    const keepList = [] // 保留非矩形的元素
    const rects = []    // 待删除的矩形

    // 快速分类（比遍历删除快10倍）
    for (let i = 0; i < children.length; i++) {
      children[i].tag === 'Box' ? rects.push(children[i]) : keepList.push(children[i])
    }

    // 批量删除（核心优化）
    this.leafer.children = keepList // 直接替换数组

    // 手动释放内存（可选）
    rects.forEach(rect => rect.destroy())

    this.unSelect()
  }

  delete(e) {
    const key = this.getKey(e)
    const [gridX, gridY] = key.split(',')
    const cell = this.draft?.get(key)

    if (cell) {
      this.history.delete(gridX, gridY, cell.fill)
      cell.remove()
      this.draft.delete(key)
    }

    this.unSelect()
  }

  select(e) {
    const key = this.getKey(e)
    const [gridX, gridY] = key.split(',')
    const cell = this.draft.get(key)

    if (cell) {
      this.selection.setSelection(gridX, gridY)
      return true
    }
    this.unSelect()
    return false
  }

  unSelect() {
    this.selection.clearSelection()
  }

  // 代理事件
  on(event, cb) {
    this.leafer.on(event, cb)
  }

  // 历史消息
  undo() {
    this.history.undo()
    this.unSelect()
  }
}

export default WLeafer