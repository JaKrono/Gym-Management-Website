<template>
    <div class="bg-white row search-container content-center">
        <q-input @keyup.enter="search" class="search-input" v-model="coachName" borderless clearable type="search">
            <template v-slot:prepend>
                <q-icon name="search" />
            </template>
        </q-input>
        <!-- <q-separator spaced vertical /> -->
        <!-- <q-input class="search-input" v-model="coachName" borderless type="search">
            <template v-slot:prepend>
                <q-icon name="location_on" />
            </template>
        </q-input> -->
        <q-btn @click="search" color="primary search-button">اعمال</q-btn>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    data: () => ({
        coachName: ''
    }),
    methods: {
        search() {
            this.$emit('searchButtonClicked', this.coachName)
        }
    }
})
</script>
<style lang="scss" scoped>
.search-container {
    height: auto;
    padding: 10px 20px;

    box-shadow: 0 10px 50px 5px #676767a1;
}

.search-input {
    flex-grow: 1;
    // width:40%;
}

.search-button {
    width: 100px;
}
</style>