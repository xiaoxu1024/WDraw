import Vue from 'vue'
import Dialog from './WDialog.vue'

const Confirm = (options) => {
  // 创建组件实例
  const ConfirmConstructor = Vue.extend(Dialog)
  const instance = new ConfirmConstructor({
    propsData: options
  }).$mount()

  // 挂载到 body
  document.body.appendChild(instance.$el)
  instance.show()

  // 返回 Promise
  return new Promise((resolve) => {
    instance.$once('confirm', () => {
      document.body.removeChild(instance.$el)
      resolve(true)
    })
    instance.$once('cancel', () => {
      document.body.removeChild(instance.$el)
      resolve(false)
    })
  })
}

export default Confirm