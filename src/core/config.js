export default {
  view: 'container', // 应该直接传入获取
  type: 'design',
  cursor: false,
  move: {
    drag: true,
    dragOut: true,
  },
  zoom: {
    min: 0.1,
    max: 20,
    wheel: {
      speed: 0.1,
      centerZoom: true,
    }
  },
}