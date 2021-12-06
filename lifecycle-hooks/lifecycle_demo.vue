<template>
    <div id="app" data-dessert="cake">

    </div>
</template>

<script>
/**
 * creation
 * created is the best place to make any api calls from components
 * 
 * mounting
 * during this phase that the component template or the html is actually mounted onto the DOM which we see in the browser
 * beforeMounted() and mounted()
 * it should be used if the DOM of components needs to be modified immediately before or after they are initially rendered
 * 
 * updating
 * rerender
 * 
 * unmounting
 */

export default {
    data() {
        return {
            foo: 'bar',
            cupcakes: [],
            serving: 'spaghetti'
        }
    },

    template: `<div> {{ serving }} </div>`,

    beforeCreate() {
        console.log(this);
        // this will work and will return the component instance
        console.log(this.foo);
        // This will return undefined as data has not yet been initialized
    },
    created() {
        axios({/**call and get the cupcakes */})
            .then(res => {
                this.cupcakes = res.data;
            })
    },
    beforeMount() {
        console.log(this.$el); // root dom
        console.log(this.$el.dataset.dessert); //cake
        this.serving = this.$el.dataset.dessert;
    },
    mounted() {
        console.log(this.$el); // <div>cake</div>
        console.log(this.$el.dataset.dessert); // undefined
    },
}
</script>