<template>
    <div></div>
</template>


<script>

const count = ref(1)
const plusOne = computed( {
    get: () => count.value + 1,
    set: val => count.value = val - 1
}, {
    onTrack(e) {
        // count.value 作为依赖被跟踪时触发
        debugger
    },
    onTrigger(e) {
        // count.value 修改时触发
        debugger
    }
} )


// watchEffect  --> 监听响应

const count = ref(0)
const wrappedCount = reactive({count})

watchEffect(() => console.log(count.value))
// -> logs 0

setTimeout(() => {
    count.value++
    // -> logs 1

}, 100)

// 清除副作用

// 副作用函数
const data = ref(null)
watchEffect(async onInvalidate => {
    onInvalidate(() => {
        /* */
    })  // 在Promise解析之前注册清除函数

    data.value = await fetchData(props.id)
})


// watch 



</script>