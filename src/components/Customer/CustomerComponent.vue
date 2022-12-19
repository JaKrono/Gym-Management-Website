<template>
    <div class="customer-card q-px-md q-py-sm">
        <div class="row content-center items-center">
            <!-- <div>شماره مشتری:
                <span class="text-primary">{{ model.customer_id }}</span>
            </div> -->
            <q-space></q-space>
            <q-btn @click="removeCustomer" color="secondary" flat dense icon="delete"></q-btn>
        </div>
        <div class="flex flex-gap-5 q-mt-md column text-center content-center">
            <q-avatar class="q-mx-auto" size="5em" color="primary">
                <q-icon size="1em" color="white" name="person"></q-icon>
            </q-avatar>
            <span>{{ model.username }}</span>
            <span class="sub-text font-size-down-1">{{ model.email }}</span>
            <!-- <q-badge rounded class="justify-center q-pa-xs" :color="model.isActive ? 'primary' : 'secondary'">
                <span class="text-primaryBadge">
                    {{ model.isActive ? 'فعال' : 'غیرفعال' }}
                </span>
            </q-badge> -->
        </div>
        <q-separator class="q-my-md"></q-separator>
        <div class="row flex-gap items-center">
            <q-icon class="icon" size="1.5em" name="calendar_month"></q-icon>
            <span class="font-size-down-1 icon">۱۲ مهر ۱۳۹۹</span>
            <q-space></q-space>
            <!-- <q-btn color="secondary" dense flat icon="more_horiz"></q-btn> -->
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import type { GymCustomer } from '@/common/interfaces';
export default defineComponent({
    props: ['model'],
    methods: {
        removeCustomer() {
            this.$emit('removeCustomer', this.model.customer_id)
        }
    }
})
</script>
<style lang="scss" scoped>
.customer-card {
    user-select: none;
    box-shadow: 0 0 5px 1px rgba(127, 126, 126, 0.641);
    border-radius: 5px;
}

.flex-gap {
    gap: 4px;
}

.flex-gap-5 {
    gap: 1em;
}

.icon {
    color: #606060;
}
</style>