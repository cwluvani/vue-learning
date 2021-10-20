// Build a new App
const app = Vue.createApp({
    // choice
})

Vue.createApp({})
    .component('SearchInput', SearchInputComponent)
    .directive('focus', FocusDirective)
    .use(LocalePlugin)

// root component
//传递给 createApp 的选项用于配置根组件。当我们挂载应用时，该组件被用作渲染的起点。

const RootComponent = {
    /* choice */
}
const app = Vue.createApp(RootComponent);
const vm = app.mount('#app');
// mount return a instance of root component


//组件实例property
const app = Vue.createApp({
    data() {
        return {count: 4}
    }
})
const vm = app.mount('#app');
console.log(vm.count) // => 4

// 在 data 中定义的 property 是通过组件实例暴露的
/***
* 还有各种其他的组件选项，可以将用户定义的 property 添加到组件实例中，
* 例如 methods，props，computed，inject 和 setup。
***/


//声明周期钩子

//比如 created 钩子可以用来在一个实例被创建之后执行代码：
Vue.createApp({
    data() {
        return {
            count: 1
        }
    },
    created() {
        // `this`指向vm实例
        console.log('count is: ' + this.count) //count is: 1
    }
})
//tip：do not use arrow fn at choice property

//-------------------------------------------------------------------------------------------//

//1.2模板语法

//1.2.1插值

// "Mustache"语法  {{ }}

// 原始HTML

// Attribute

// JavaScript *表达式*
{{number + 1}}
{{ok ? 'YES' : 'NO'}}
{{Message.split('').reverse().join('')}}

`<div v-bind:id="'list-' + id"></div>`


//1.2.2指令(directives)

`<p v-if="seen">FOUND</p>`

//参数

`<a v-bind:href="url">...</a>`
`<a v-on:click="doSomething">...</a>`

//dynamic param
//***方括号***

`<a v-bind:[attributeName]="url">...</a>`
//如果你的组件实例有一个 data property attributeName，其值为 "href"，那么这个绑定将等价于 v-bind:href。

`<a v-on:[eventName]="doSomething>...</a>`

//修饰符(modifier)
//例如： .prevent 修饰符告诉 v-on 指令对于触发的事件调用 event.preventDefault()：

`<form v-on:submit.prevent="onSubmit">..</form>`

// 1.2.3缩写

// Vue 为 v-bind 和 v-on 这两个最常用的指令，提供了特定简写：


//1.3 Data Property

const app = createApp({
    data() {
        return {count: 6}
    }
})

const vm = app.mount('#app');

console.log(vm.$data.count) // => 6
console.log(vm.count) // => 6

vm.count = 5;
console.log(vm.$data.count) // 5

vm.$data.count = 6
console.log(vm.data) // 6

// 方法

const app = createApp({
    data() {
        return {
            count: 4,
        }
    },
    methods: {
        increment() {
            // `this` 指向该组件实例
            this.count++
        }
    }
})

const vm = app.mount('#app');

console.log(vm.count) // 4

vm.increment()
console.log(vm.count) // 5

`<button @click="increment">Up vote</button>`


// 防抖和节流

/** debounce 补充 */

// 在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。

function ajax(content) {
    console.log('ajax request ' + content);
}
let inputa = document.getElementById('unDebounce');
inputa.addEventListener('keyup', e => ajax(e.target.value));
// 按下键盘就会执行回调，很浪费

// 优化
let ajax = function(content) {
    console.log('ajax request ' + content);
};

let debounce = function(fn, delay) {
    return function (args) {
        let that = this;
        let _args = args;
        clearTimeout(fn.id);
        fn.id = setTimeout(function() {
            fn.call(that, _args)
        }, delay)
    }
}

let inputb = document.getElementById('debounce');
let debounceAjax = debounce(ajax, 500);

inputb.addEventListener('keyup', e => debounceAjax(e.target.value));

// 节流就是回调只在规定时间之后生效，若果在该时间内多次触发，则只有一次生效
// 同样可以用高阶函数实现


// Vue 的throttle & debounce可以用Lodash等library实现

Vue.createApp({
    methods: {
        click:_.debounce(function() {
            // ... 响应点击 ...
          }, 500)
    }
}).mount('#app');

//但是组件 实例 得彼此独立，所以在created 函数添加防抖函数

app.component('save-button', {
    created() {
        this.debouncedClick = _.debounce(this.click, 500)
    },
    unmounted() {
        this.debouncedClick.cancel()
    },
    methods: {
        click() {
            // ..reponse click..
        }
    },
    template: `
    <button @click="debouncedClick">
        Save
    </button>
    `
})


// 1.4 计算属性和侦听器

// 1.4.1计算属性

`<div id="computed-basics">
    <p>Has published books: </p>
    <span>{{ publishedBooksMessage }}</span>
</div>`

Vue.createApp({
    data() {
        return {
            author: {
                name: 'John Doe',
                books: [
                    'Vue 2 - Advanced Guide',
                    'Vue 3 - Basic Guide',
                    '...'
                ]
            }
        }
    },
    computed: {
        publishedBooksMessage() {
            return this?.author?.books.length > 0 ? 'YES' : 'NO'
        }
    }
}).mount('#computed-basics');

// 计算属性缓存 vs 方法
// when you need to change the presentation of existing data, you will use the computed properties
// when you need to change data, you will use methods

// 计算属性是基于它们的响应依赖关系缓存的
// 计算属性只在相关响应式依赖发生改变时它们才会重新求值。这就意味着只要 author.books 还没有发生改变，
// 多次访问 publishedBookMessage 计算属性会立即返回之前的计算结果，而不必再次执行函数。

const app = createApp({
    computed: {
        now() {
            return Date.now()
        }
    }
})
// 计算属性将不再更新，因为 Date.now () 不是响应式依赖

// 计算属性的Setter

const app = createApp({
    // ...

    computed: {
        fullName: {
            get() {
                return this.firstName + ' ' + this.lastName;
            },

            set(newValue) {
                const names = newValue.split(' ');
                this.firstName = names[0];
                this.lastName = names[names.length - 1];
            }
        }
    }
})

// 1.4.2 侦听器
// 当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。

// 计算属性 vs 侦听器

//当你有一些数据需要随着其它数据变动而变动时，你很容易滥用 watch——特别是如果你之前使用过 AngularJS。然而，通常更好的做法是使用计算属性而不是命令式的 watch 回调。细想一下这个例子：


//1.5 Class 与 Style绑定

// 我们总是需要操作元素的class列表和内联样式来进行*数据绑定*，vue 关注数据

// 1.5.1绑定HTML Class

// 对象语法
`<div :classObject></div>

data() {
    return {
        classObject: {
            active: true,
            'text-danger': false
        }
    }
}`

// 我们也可以在这里绑定一个返回对象的计算属性。这是一个常用且强大的模式：
`<div :class="classObject"></div>

data() {
    return {
        isActive: true,
        error: null
    }
},
computed: {
    classObject() {
        return {
            active: this.isActive && !this.error,
            'text-danger': this.error && this.error.type === 'fatal'
        }
    }
}`

//数组语法
`<div :class="[activeClass, errClass]"></div>

data() {
    return {
        activeClass: 'active',
        errorClass: 'text-danger'
    }
}`

// 在组件上使用
`<div id="app">
    <my-component class="baz"></my-component>
</div>

const app = Vue.createApp({});

app.component('my-component', {
    template: `
    '<p :class="$attr.class">Hi!</p>'
    '<span>This is a child component</span>'`
})`


//绑定内联样式

`<div :style="{color: activeColor, fontSize: fontSize + 'px' }"></div>

data() {
    return {
        activeColor: 'red',
        fontSize: 30
    }
}`// 直接绑定一个styleObject也可以

//数组语法
//:style 的数组语法可以将多个样式对象应用到同一个元素上：

//多重值
// 可以为 style 绑定中的 property 提供一个包含多个值的数组，常用于提供多个带前缀的值，例如：
`<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>`


// 1.6条件渲染