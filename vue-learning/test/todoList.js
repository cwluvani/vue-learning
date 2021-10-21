const app = createApp({
    data() {
        return {
            newTodoText: '',
            todos: [
                {
                    id: 1,
                    title: 'Do the dishes'
                }, 
                {
                    id: 2,
                    title: 'Take out the trash'
                },
                {
                    id: 3,
                    title: 'Mow the lawn'
                }
            ],
            nextTodoId: 4
        }
    },
    methods: {
        addNewTodo() {
            this.todos.push({
                id: this.nextTodoId++,
                title: this.newTodoText
            })
            this.newTodoText = ''
        }
    },
})

app.component('todo-item', {
    template: `
    <li>
        {{ title }}
        <button @click="$emit('remove')">Remove</button>
    </li>
    `,
    props: ['title'], // 从父组件接受数据的数组或对象
    emits: ['remove'] // 可以是数组或对象，从组件触发自定义事件，对象允许配置事件验证
})

app.mount('#todo-list-example')