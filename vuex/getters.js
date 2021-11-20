// getters 这个东西就是从store中的state中派生出一些状态
import { createStore } from 'vuex'

const store = createStore({
    state: {
        todos: [
            { id: 1, text: '', done: true },
            { id: 2, text: '', done: false }
        ]
    },

    getters: {
        doneTodo: (state) => {
            return state.todos.filter(todo => todo.done)
        }
    }
})

// getter 会暴露为store.getters 对象

// Getter 也可以接受其他 getter 作为第二个参数

export default {
    computed: {
        // getter 混入到computed对象中
        ...mapGetters([
            'doneTodosCount',
            'anotherGetter',
            //...
        ])
    }
}

// equal to

export default {
    computed: {
        doneTodosCount() {
            return this.$store.getters.doneTodosCount
        }
        // ...
    }
}

