//从 store 实例中读取状态最简单的方法就是在计算属性中返回某个状态：
const Counter = {
    template: `<div> {{ count }} </div>`,
    computed: {
        count() {
            return store.state.count
        }
    }
}

const Counter = {
    template: `<div>{{ count }}</div>`,
    computed: {
      count () {
        return this.$store.state.count
      }
    }
}

// mapState 生成计算属性，管理多个状态

import { mapState } from 'vuex'

export default {
    computed: mapState({
        count: state => state.count,

        // 'this' 获取局部状态，使用常规函数
        countPlusLocalState(state) {
            return state.count + this.localCount
        }
    })

    // 映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组。
    // computed: mapState(['count'])
}


