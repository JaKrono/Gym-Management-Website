<template>
    <q-page>
        <div class="row content-center q-px-lg" style="align-items:center">

            <h5 class="">اعضا</h5>
            <q-space></q-space>
            <!-- <q-btn @click="navigateToCoachSearch" color="primary" icon="add" style="height:40px">افزودن مربی</q-btn> -->
        </div>
        <!-- <q-scroll-area class="scroll"> -->
        <div v-if="(customers.length > 0 && !loading)" class="row justify-start q-pa-lg"
            :class="{ 'justify-center': $q.screen.xs }">
            <div v-for="customer in customers" :key="customer.id" class="q-pa-md col-lg-3 col-sm-6 col-xs-12">
                <CustomerComponent @removeCustomer="handleRemove" :model="customer" :isInAddState="false">
                </CustomerComponent>
            </div>
        </div>
        <template v-else-if="(customers.length == 0 && !loading)">
            <div class="row q-mt-lg justify-center">
                <div class="col-12 text-center">
                    <img class="not-found-image" src="noItemFound.png" />
                    <p class="font-size-up-5">عضوی پیدا نشد</p>
                </div>
            </div>

        </template>
        <!-- </q-scroll-area> -->


        <q-inner-loading :showing="loading" color="primary" />
    </q-page>

</template>

<script lang="ts">
import CustomerComponent from '@/components/Customer/CustomerComponent.vue';
import { defineComponent } from 'vue';
import { mapActions, mapState } from 'vuex';
export default defineComponent({
    components: {
        CustomerComponent
    },
    data: () => ({
        leftDrawerOpen: true,
        search: '',
        loading: true,
        // customerList: [{ id: 1, name: 'بیژن مرتضوی', email: 'test@gmail.com', isActive: true }, { id: 2, name: 'بیژن مرتضوی', email: 'test@gmail.com', isActive: false }, { id: 2, name: 'بیژن مرتضوی', email: 'test@gmail.com', isActive: false }, { id: 2, name: 'بیژن مرتضوی', email: 'test@gmail.com', isActive: false }, { id: 1, name: 'بیژن مرتضوی', email: 'test@gmail.com', isActive: true }, { id: 2, name: 'بیژن مرتضوی', email: 'test@gmail.com', isActive: false }, { id: 2, name: 'بیژن مرتضوی', email: 'test@gmail.com', isActive: false }, { id: 2, name: 'بیژن مرتضوی', email: 'test@gmail.com', isActive: false }, { id: 1, name: 'بیژن مرتضوی', email: 'test@gmail.com', isActive: true }, { id: 2, name: 'بیژن مرتضوی', email: 'test@gmail.com', isActive: false }, { id: 2, name: 'بیژن مرتضوی', email: 'test@gmail.com', isActive: false }, { id: 2, name: 'بیژن مرتضوی', email: 'test@gmail.com', isActive: false }]
    }),
    computed: {
        ...mapState({
            customers: state => state.user.customers
        })
    },
    async mounted() {
        await this.getCustomers();
        this.loading = false;
    },
    methods: {
        ...mapActions({
            getCustomers: 'user/getCustomers',
            removeCustomer: 'user/removeCustomer'
        }),
        navigateToCoachSearch() {
            this.$router.push('/search-coach')
        },
        async handleRemove(id: number) {
            await this.removeCustomer(id)
        }
    }
})
</script>

<style scoped>
.dashboard-landing {
    background-color: black;
    height: 200px;
}

.scroll {}

.manager-account {
    height: 10vh;
}

.options-list {
    height: 90vh;
    background-color: rgb(35, 34, 36);
}

.search-section {
    padding: 50px 200px;
}

.search-bar {
    box-shadow: 0 10px 20px 5px #8383838e;
}

.grow-flex-1 {
    flex-grow: 1;
}
</style>