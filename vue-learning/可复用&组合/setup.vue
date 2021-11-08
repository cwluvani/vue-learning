<template>
    <div>

    </div>
</template>


<script>
    // 收集同一逻辑关注点！！
    // 避免让单组件数据处理逻辑变得复杂

    // setup 在beforecreate 之前执行

    /***
     * 在 setup 中你应该避免使用 this，因为它不会找到组件实例。
     * setup 的调用发生在 data property、computed property 或 methods 被解析之前，
     * 所以它们无法在 setup 中被获取。
     */
    export default {
        componets: {
            //....
        },
        props: {
            user: {
                type: String,
                required: true
            }
        },

        setup(props) {
            console.log(props) // { user: '' }

            return {}  //这里返回的任何内容都可以用于组件的其余部分
  
        }
        // 组件的其他部分
        //(计算属性、方法、生命周期钩子等等) 以及组件的模板。

    }

    // 带 ref 的响应式变量
    
</script>


<style lang="scss">

</style>