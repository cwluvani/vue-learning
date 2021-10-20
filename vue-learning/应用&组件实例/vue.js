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




