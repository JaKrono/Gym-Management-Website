<template>
    <div class="class-box">
        hell
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    data: () => ({

    }),
    methods: {

    }
})
</script>
<style lang="scss">
* {
    box-sizing: border-box;
}

.centerlize-item {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: flex-start;
}

.class-box {
    @extend .centerlize-item;
    flex-flow: row wrap;
    min-width: 260px;
    max-width: 260px;
    height: 320px;
    border-radius: 8px;
    background-color: $secondary;
    color: white;
}
</style>