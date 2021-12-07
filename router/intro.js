const User = {
    template: `<div>user</div>`,
    created() {
        this.$watch(
            () => this.$route.params,
            (toParams, previousParams) => {
                // 对路由变化作出相应
            }
        )
    },
    // 使用 beforeRouteUpdate 导航守卫，它也可以取消导航：
    async beforeRouteUpdate(to, from) {
        // 对路由变化作出响应
        this.userData = await fetchUser(to.params.id)
    }
}

// 传递给createRouter
const routes = [
    {
        // 动态路由以冒号开始
        path: '/user/:id',
        component: User
    },
    {
        path: '/settings',
        component: UserSettings,
        children: [
            {
                path: '/emails',
                component: UserEmailSubscriptions
            },
            {
                path: '/profile',
                components: {
                    default: UserProfile,
                    helper: UserProfilePreview
                }
            }
        ]
    },
    // 重定向
    {
        // /search/:searchText => /search?q=screens
        path: '/search/:searchText',
        redirect: to => {
            // 方法接收目标路由作为参数
            // return 重定向的字符串路径/路径对象
            return {path: 'search', query: { q: to.params.seatchText }}
        }
    },
]