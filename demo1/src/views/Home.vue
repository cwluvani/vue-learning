<template>
    <div id="home">
        <AddTask v-show="showAddTask" @add-task="addTask"/>
        <Tasks 
            @toggle-task="deleteTask"
            @toggle-reminder="toggleReminder"
            :tasks="tasks"
        />
    </div>
</template>

<script>
import Tasks from '../components/Tasks.vue'
import AddTask from '../components/AddTask.vue'

export default {
    name: 'Home',
    components: {
        Tasks,
        AddTask
    },
    data() {
        return {
            tasks: [],
        }
    },
    props: {
        showAddTask: Boolean,
    },
    methods: {
        async addTask(task) {
            const res = await fetch('api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application-json',
                },
                body: JSON.stringify(task),
            });
            const data = await res.json();

            this.tasks = [...this.tasks, data];
        },
        async deleteTask(id) {
            if (confirm('Are you sure?')) {
                const res = await fetch(`api/tasks/${id}`, {
                    method: 'DELETE',
                });
                res.status === 200
                    ? (this.tasks = this.tasks.filter((task) => task.id !== id))
                    : alert('Error deleting task')
            }
        },
        async toggleReminder(id) {
            const taskToToggle = await this.fetchTask(id);
            const updTask = {...taskToToggle, reminder: !taskToToggle.reminder};
            const res = await fetch(`api/tasks/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updTask)
            });
            const data = res.json();
            this.tasks = this.tasks.map((task) => {
                this.id === id ? {...task, reminder: data.reminder} : task
            });
        },
        async fetchTask() {
            const res = await fetch(`api/tasks/${id}`);
            const data = await res.json();
            return data;
        },
    }
}
</script>