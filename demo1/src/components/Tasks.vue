<template>
    <div id="tasks">
        <div
            v-for="task in tasks"
            :key="task.id"
        >
            <Task
            @toggle-reminder="$emit('toggle-reminder', task.id)"
            @toggle-task="$emit('toggle-task', task.id)"
            :task="task"
            />
        </div>  
    </div>
</template>

<script>
import Task from './Task.vue'

export default {
    name: 'Tasks',
    components: {
        Task
    },
    props: {
        tasks: Array
    },
    emits: ['toggle-task', 'toggle-reminder'],

}
</script>