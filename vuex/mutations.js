/**
 * 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。
 * Vuex 中的 mutation 非常类似于事件：
 * 每个 mutation 都有一个字符串的事件类型 (type)和一个回调函数 (handler)。
 * 这个回调函数就是我们实际进行状态更改的地方，
 * 并且它会接受 state 作为第一个参数：
 */

const store = createStore({
    state: {
        count: 1
    },
    mutations: {
        increment(state) {
            // mutate state
            state.count++
        }
    }
})

// mutations 里的处理函数不能直接调用  只能通过store.commit('eventName')

// payload
function mutations() {
    return { 
        increment(state, n) {
            state.count += n
        }
    }
}
store.commit('increment', 10)

// !important mutation必须是同步函数



