<template>
    <div>
        <span> {{ count }} </span>
        <button @click="count++">Increment count</button>
        <button @click="nested.count.value++">Nested Increment count</button>
    </div>
</template>

<script>
import { ref, reactive, toRefs, readonly} from 'vue'
// import { ref } from 'vue'

// export default {
//     setup() {
//         const count = ref(0)
//         return {
//             count,

//             nest: {
//                 count
//             }
//         }
//     }
// }

//ref 解包

// 简单来说，就是发生在响应式Object（reactive（{}））嵌套的时候，自动将ref包装的对象property暴露指向原始值

const books = reactive([ref('Vue 3 Guide')])
// 这里需要.value

console.log(books[0].value)

const map = reactive(new Map([['count', ref(0)]]))
console.log(map.get('count').value) //need unpack


// 响应式状态结构，让结构出来的prop同样具有响应性
const book = reactive({
    author: 'Vue Team',
    year: '2020',
    title: 'Vue 3 Guide',
    description: 'You are reading this book right now ;)',
    price: 'free'
})

let { author, title } = toRefs(book)

title.value = 'vue 3.x'

console.log(book.title) // vue 3.x

// 防止更改响应式对象,use readonly

const original = reactive({ count: 0})

const copy = readonly(original)
// 通过 original 修改 count，将会触发依赖 copy 的侦听器

original.count++

// 通过 copy 修改 count，将导致失败并出现警告
copy.count++ // 警告: "Set operation on key 'count' failed: target is readonly."

// 通过copy 代理，我们拥有了只读副本


</script>