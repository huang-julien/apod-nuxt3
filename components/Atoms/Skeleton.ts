import { createElementBlock, defineComponent } from 'vue'

export default defineComponent({
  name: 'Skeleton',
  render () {
    return createElementBlock('div', { class: 'skeleton' })
  }
})
