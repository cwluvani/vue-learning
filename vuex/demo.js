import { createApp } from 'vue'
import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            count: 0
        }
    },
    mutations: {
        increment(state) {
            state.count++
        }
    }
})

const app = createApp({}) // root component

app.use(store) // 将store实例作为插件安装

// store.state 获取状态对象
// store.commit 触发状态变更

store.commit('increment')
console.log(store.state.count) // 1

// 在vue component中，this.$store 访问store实例

const component = {
    methods: {
        increment() {
            this.$store.commit('increment')
            console.log(this.$store.state.count)
        }
    }
}
/**
 * 我们通过提交 mutation 的方式，
 * 而非直接改变 store.state.count
*/



