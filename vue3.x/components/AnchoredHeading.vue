<template>
    <div class="anchor-head">
        <h1 v-if="level === 1">
            <slot></slot>
        </h1>
        <h2 v-else-if="level === 2">
            <slot></slot>
        </h2>
        <h3 v-else-if="level === 3">
            <slot></slot>
        </h3>
        <h4 v-else-if="level === 4">
            <slot></slot>
        </h4>
        <h5 v-else-if="level === 5">
            <slot></slot>
        </h5>
        <h6 v-else-if="level === 6">
            <slot></slot>
        </h6>
    </div>
</template>

<script>
import { h } from 'vue'

export default {
    name: AnchoredHeading,
    props: {
        level: {
            type: Number,
            required: true
        }
    },
    render() {
        return h(
            'h' + this.level,
            {},
            this.$slots.default() // 包含其 节点 的数组
        )
    }
    
}
</script>