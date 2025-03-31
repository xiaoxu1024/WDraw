import { Rect } from "leafer-ui"
import Draft from '@/core/draft'
const GRID_SIZE = 25

class WSelection {
  static instance

  constructor(leafer) {
    if (WSelection.instance) {
      return WSelection.instance
    }

    this.leafer = leafer
    this.selectedCell = null
    this.cell = null
    this.draft = new Draft()

    WSelection.instance = this
  }

  setSelection(gridX, gridY) {
    this.cell = this.draft.get(`${gridX},${gridY}`)
    const OFFSET = 1

    if (this.selectedCell) {
      this.selectedCell.opacity = 1
      this.selectedCell.x = gridX - OFFSET
      this.selectedCell.y = gridY -  OFFSET
    } else {
      const cell = new Rect({
        opacity: 1,
        stroke: 'red',
        strokeWidth: 1,
        zIndex: 100,
        x: gridX - OFFSET,
        y: gridY - OFFSET,
        width: GRID_SIZE + 2 * OFFSET,
        height: GRID_SIZE + 2 * OFFSET,
      })
      this.leafer.add(cell)
      this.selectedCell = cell
    }
  }

  clearSelection() {
    if (!this.selectedCell) return

    this.selectedCell.opacity = 0
  }
}

export default WSelection
