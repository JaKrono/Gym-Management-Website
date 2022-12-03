<template>
    <q-page>
        <div class="row content-center q-px-lg" style="align-items:center">

            <h5 class="">اعضا</h5>
            <q-space></q-space>
            <!-- <q-btn @click="navigateToCoachSearch" color="primary" icon="add" style="height:40px">افزودن مربی</q-btn> -->
        </div>
        <div class="row justify-start q-pa-lg" :class="{'justify-center':$q.screen.xs}">
            <div v-for="customer in customerList" :key="customer.id" class="q-pa-md col-lg-3 col-sm-6 col-xs-12">
                <CustomerComponent :model="customer" :isInAddState="false"></CustomerComponent>
            </div>
        </div>
        
    </q-page>
</template>

<script lang="ts">
import CustomerComponent from '@/components/Customer/CustomerComponent.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components:{
        CustomerComponent
    },
    data:()=>({
        leftDrawerOpen:true,
        search:'',
        customerList:[{id:1,name:'بیژن مرتضوی',email:'test@gmail.com',isActive:true},{id:2,name:'بیژن مرتضوی',email:'test@gmail.com',isActive:false}]
    }),
    mounted(){

    },
    methods:{
        navigateToCoachSearch(){
            this.$router.push('/search-coach')
        }
    }
})
</script>

<style scoped>
    .dashboard-landing{
        background-color: black;
        height: 200px;
    }
    .manager-account{
        height: 10vh;
    }
    .options-list{
        height:90vh;
        background-color: rgb(35, 34, 36);
    }
    .search-section{
        padding: 50px 200px;
    }
    .search-bar{
        box-shadow: 0 10px 20px 5px #8383838e;
    }
    .grow-flex-1{
        flex-grow: 1;
    }
</style>