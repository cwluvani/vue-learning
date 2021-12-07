const { createApp, h } = Vue

const app = createApp({})

// 递归地从子节点获取文本
function getChildrenTextContent(children) {
    return children
        .map(node => {
            return typeof node.children === 'string'
                ? node.children
                : Array.isArray(node.children)
                ? getChildrenTextContent(node.children)
                : ''
        })
        .join('')
}

app.component('anchor-head', {
    render() {
        // 从 children 的文本内容中创建短横线分隔 (kebab-case) id。
        const headingId = getChildrenTextContent(this.$slots.default())
            .toLowerCase()
            .replace(/\W+/g, '-')
            .replace(/(^-|-$)/g, '')

        return h('h' + this.level, null, [
            h(
                'a',
                {
                    name: headingId,
                    href: '#' + headingId
                },
                this.$slots.default()
            )
        ])
    },
    props: {
        level: {
            type: Number,
            required: true
        }
    }
})