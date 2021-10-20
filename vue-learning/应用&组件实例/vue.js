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



