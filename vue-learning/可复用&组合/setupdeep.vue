<template>
    <div>
        {{ collectionName }}: {{ readersNumber }}
    </div>
</template>

<script>
import { toRefs, toRef, reactive, h, ref } from 'vue'

export default {
    props: {
        title: {
            type: String,
            default: 'sb',
            required: false
        },
        collectionName: String
    },
    setup(props, { attrs, slots, emit, expose }) { 
        // const { title } = toRefs(props)
        const title = toRef(props, 'title')
        const readersNumber = ref(0);
        const book = reactive({ title: 'vue 3.x' })
        const count = ref(0)
        const increment = () => ++count.value
        console.log(title.title)

        console.log(context.attrs);
// 暴露给template
        // return {
        //     readersNumber,
        //     book
        // }
        expose({
            increment
        }),

        onMounted(() => {
            console.log('Component is mounted!')
        })

        return () => h('div', [readersNumber.value, book.title])

    }
}
</script>