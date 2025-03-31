import Draft from '@/core/draft'
import { Box } from 'leafer-ui'
const STACK_MAX = 100
const ACTION = {
  ADD: 'ADD',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE'
}
const GRID_SIZE = 25

class WHistory {
  static instance

  constructor(leafer) {
    if (WHistory?.instance) {
      return WHistory.instance
    }
    this.stack = []
    this.leafer = leafer
    this.draft = new Draft()
    WHistory.instance = this
  }

  addAction(action) {
    if (this.stack?.length > STACK_MAX) {
      this.stack.shift()
    }
    this.stack.push(action)
  }

  add(gridX, gridY, color) {
    this.addAction({
      type: ACTION.ADD,
      gridX,
      gridY,
      color,
    })
  }

  update(gridX, gridY, color, oldColor) {
    this.addAction({
      type: ACTION.UPDATE,
      gridX,
      gridY,
      color,
      oldColor
    })
  }

  delete(gridX, gridY, color) {
    this.addAction({
      type: ACTION.DELETE,
      gridX,
      gridY,
      color,
    })
  }

  undo() {
    if (this.stack?.length === 0) return

    const action = this.stack?.pop()
    const key = `${action.gridX},${action.gridY}`

    switch (action.type) {
      case ACTION.ADD:
        // 撤销新增：删除方块
        if (this.draft.has(key)) {
          this.draft.get(key).remove()
          this.draft.delete(key)
        }
        break

      case ACTION.UPDATE:
        // 撤销修改：恢复旧颜色
        if (this.draft.has(key)) {
          this.draft.get(key).fill = action.oldColor
        }
        break

      case ACTION.DELETE:
        // 删除元素：重新添加
        if (!this.draft.has(key)) {
          const cell = new Box({
            x: action.gridX - 0.2,
            y: action.gridY - 0.2,
            width: GRID_SIZE + 0.4,
            height: GRID_SIZE + 0.4,
            fill: action.color,
          })
          this.leafer.add(cell)
          this.draft.set(key, cell)
        }
    }
  }
}

export default WHistory