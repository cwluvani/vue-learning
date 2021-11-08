import { ref } from 'vue'

/**
 * ref 接收参数并将其包裹在一个带有 value property 的对象中返回，
 * 然后可以使用该 property 访问或更改响应式变量的值：
 */

const counter = ref(0) // 封装参数到一个对象，ref的意思就为参数封装引用，以达到引用传递的响应式

console.log(counter) // { value: 0 }
console,log(counter.value) // 0

counter.value++
console.log(counter.value) // 1

/**
 * 提示
 * 换句话说，ref 为我们的值创建了一个响应式引用。
 * 在整个组合式 API 中会经常使用引用的概念。
 * 
 */

import { fetchUserRepositories } from '@/api/repositories'
import { ref } from 'vue'

// in our component
/*setup (props) {
    const repositories = ref([])
    const getUserRespositories = async () => {
        repositories.value = await fetchUserRepositories(props.user)
    }

    return {
        repositories,
        getUserRespositories
    }
}
//现在，每当我们调用 getUserRepositories 时，repositories 都将发生变化，视图也会更新以反映变化。
*/

export default {
    components: { RepositoriesFilters, RepositoriesSortBy, RepositoriesList },
    props: {
        user: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const repositories = ref([])
        const getUserRespositories = async () => {
            repositories.value = await fetchUserRepositories(props.user)
        }

        return {
            repositories,
            getUserRespositories
        }
    },

    data() {
        return {
            filters: { /*...*/ }, // 3
            searchQuery: '' // 2
        }
    },

    watch: {
        user: 'getUserRepositories' // 1
    },

    methods: {
        updateFilters () { /*...*/ }, // 3
    },

    mounted () {
        this.getUserRepositories() // 1
    }
    
}

// setup 注册生命周期钩子

// src/components/UserRepositories.vue `setup` function
import { fetchUserRepositories } from '@/api/repositories'
import { ref, onMounted } from 'vue'

// 在我们的组件中
setup (props) {
  const repositories = ref([])
  const getUserRepositories = async () => {
    repositories.value = await fetchUserRepositories(props.user)
  }

  onMounted(getUserRepositories) // 在 `mounted` 时调用 `getUserRepositories`

  return {
    repositories,
    getUserRepositories
  }
}

// watch 响应式更改

/**
 * 它接受 3 个参数：
 * 一个想要侦听的响应式引用或 getter 函数
 * 一个回调
 * 可选的配置选项
 */

import { ref, watch } from 'vue'

const counter = ref(0)
watch(counter, (newValue, oldValue) => {
    console.log('the new counter value is ' + counter.value)
})

// equal to 
export default {
    data() {
        return {
            counter: 0
        }
    },
    watch: {
        counter(newValue, oldValue) {
            console.log('the new counter value is ' + this.counter)
        }
    }
}

// src/components/UserRepositories.vue `setup` function
import { fetchUserRepositories } from '@/api/repositories'
import { ref, onMounted, watch, toRefs } from 'vue'

// 在我们组件中
setup (props) {
  // 使用 `toRefs` 创建对prop的 `user` property 的响应式引用
  const { user } = toRefs(props)

  const repositories = ref([])
  const getUserRepositories = async () => {
    // 更新 `prop.user` 到 `user.value` 访问引用值
    repositories.value = await fetchUserRepositories(user.value)
  }

  onMounted(getUserRepositories)

  // 在 user prop 的响应式引用上设置一个侦听器
  watch(user, getUserRepositories)

  return {
    repositories,
    getUserRepositories
  }
}

//我们现在可以对第二个关注点执行相同的操作——基于 searchQuery 进行过滤，这次是使用计算属性。

const searchQuery = ref('');
const repositoriesMatchingSearchQuery = computed(() => {
    return repositories.value.filter(
        repository => repository.value.includes(searchQuery.value)
    )
})

/**
 * 
 * 这不就是把代码移到 setup 选项并使它变得非常大吗？
 * 嗯，确实是这样的。这就是为什么我们要在继续其他任务之前，
 * 我们首先要将上述代码提取到一个独立的组合式函数中。
 * 让我们从创建 useUserRepositories 函数开始：
 */

// 然后再组件中的组合api setup里运用