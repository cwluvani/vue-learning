<template>
    <p class="greeting">{{ greeting }}</p>
</template>

<script>

export default {
    data() {
        return {
            greeting: 'hello world!'
        }
    }
}
</script>

<style lang="scss">

    $greetingColor: red;
    $greetingFontWeight: bold;

    .greeting {
        color: $greetingColor;
        font-weight: $greetingFontWeight;
    }


</style>


