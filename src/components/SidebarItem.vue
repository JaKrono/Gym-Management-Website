<template>
    <q-item :disable="disable" :to="path" @click="clicked" :active="isSelected" class="font-size-up-2" style="padding: 12px 8px !important" clickable>

        <q-item-section class="q-pa-none q-mb-xs" style="color: inherit !important; margin-bottom: ;" avatar>
            <q-icon :name="icon" />
        </q-item-section>

        <q-item-section class="q-pa-none" avatar>
            <p class="unselectable">{{ title }}</p>
        </q-item-section>

    </q-item>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    props: ['title', 'id', 'icon', 'isSelected', 'path', 'disable'],
    methods: {
        clicked: function () {
            this.$emit("itemClicked", this.id);
        }
    }
})
</script>
<style scoped lang="scss">
.selected-item {
    background-color: $primary;
    color: white;
}

.q-item :deep(.q-item__section--avatar) {
    min-width: 40px;
}
</style>