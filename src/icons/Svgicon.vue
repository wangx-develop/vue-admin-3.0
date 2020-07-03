<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
import { reactive, ref, computed } from '@vue/composition-api'
export default {
  name: 'svgicon',
  // props: ['iconClass', 'className'],
  props: {
    iconClass: {
      type: String, //定义接收的值类型
      default: '',
    },
    className: {
      type: String, //定义接收的值类型
      default: '',
    },
  },
  setup(props) {
    // 计算属性得出最终结果并返回
    const iconName = computed(() => `#icon-${props.iconClass}`)

    const svgClass = computed(() => {
      if (props.className) {
        return `svg-icon ${props.className}`
      } else {
        return `svg-icon`
      }
    })
    return {
      iconName,
      svgClass,
    }
  },
}
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
}
</style>
