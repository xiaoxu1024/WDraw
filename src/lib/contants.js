
export const SELECT_TYPE = {
  PEN: 'pen',
  SELECT: 'select',
  CURSOR: 'cursor',
  ERASER: 'eraser'
}

export const CURSOR_TYPE = {
  [SELECT_TYPE.PEN]: 'cell',
  [SELECT_TYPE.SELECT]: 'default',
  [SELECT_TYPE.CURSOR]: 'grab',
  [SELECT_TYPE.ERASER]: 'pointer'
}
