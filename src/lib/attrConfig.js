export const ShapeType = {
  Rect: 'Rect',
  Circle: 'Circle'
}

export const ShapeArr = [
  {
    id: ShapeType.Rect,
    style: { borderRadius: 0 },
  },
  {
    id: ShapeType.Circle,
    style: { borderRadius: '100%' },
  },
  {
    id: ShapeType.Circle + '1',
    style: { borderRadius: '100% 0 0' },
  },
]

export const SizeType = {
  width: 'width',
  height: 'height'
}

export const SizeArr = [
  {
    id: SizeType.width,
    desc: 'W:',
    value: ''
  },
  {
    id: SizeType.height,
    desc: 'H:',
    value: ''
  }
]

