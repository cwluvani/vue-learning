/**
 * Action 提交的是 mutation，而不是直接变更状态。
 * Action 可以包含任意异步操作。
 */

const store = createStore({
    state: {
        count: 0
    },
    mutations: {
        increment(state) {
            state.count++
        }
    },
    actions: {
        increment(context) {
            context.commit('increment')
        }
    }
})

/**
 * Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，
 * 因此你可以调用 context.commit 提交一个 mutation，
 * 或者通过 context.state 和 context.getters 来获取 state 和 getters。
 * 当我们在之后介绍到 Modules 时，
 * 你就知道 context 对象为什么不是 store 实例本身了。
 */

// 分发action

const store = createStore({
    actions: {
        incrementAsync({commit}) {  //支持异步
            setTimeout(() => {
                commit('increment')
            }, 1000)
        }
    }
})
// 以payload形式分发
store.dispatch('incrementAsync', {
    amount: 10
})
// 以object形式分发
store.dispatch({
    type: 'incrementAsync',
    amount: 10
})

// 购物车示例：
const store_ = createStore({
    actions: {
        checkout( {commit, state}, products ) {
            // 把当前购物车的物品备份起来
            const saveCartItems = [...state.cart.added]
            // 发出结账请求，清空购物车
            commit(types.CHECKOUT_REQUEST)
            // 购物api接受一个成功对调和一个失败回调
            shop.buyProducts(
                products,
                // 成功
                () => commit(types.CHECKOUT_SUCCESS),
                // 失败
                () => commit(types.CHECKOUT_FAILURE, savedCartItems)
            )
        }
    }
})


// 假设 getData() 和 getOtherData() 返回的是 Promise
const store__ = createStore({
    actions: {
        async actionA ({ commit }) {
            commit('gotData', await getData())
        },
        async actionB ({ dispatch, commit }) {
            await dispatch('actionA') // 等待 actionA 完成
            commit('gotOtherData', await getOtherData())
        }
    }
})
