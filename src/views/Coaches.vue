<template>
    <q-page>
        <div class="row content-center q-px-lg" style="align-items:center">

            <h5 class="">مربی ها</h5>
            <q-space></q-space>
            <q-btn @click="navigateToCoachSearch" color="primary" icon="add" style="height:40px">افزودن مربی</q-btn>
        </div>
        <div class="row justify-start q-pa-lg" :class="{'justify-center':$q.screen.xs}">
            <div class="q-pa-md col-lg-4 col-sm-6 col-xs-12">
                <CoachComponent2 :isInAddState="false"></CoachComponent2>
            </div>
            <div class="q-pa-md col-lg-4 col-sm-6 col-xs-12">
                <CoachComponent2 :isInAddState="false"></CoachComponent2>
            </div>
            <div class="q-pa-md col-lg-4 col-sm-6 col-xs-12">
                <CoachComponent2 :isInAddState="false"></CoachComponent2>
            </div>
        </div>
        
    </q-page>
</template>

<script lang="ts">
import CoachComponent1 from '@/components/CoachComponent1.vue';
import CoachComponent2 from '@/components/CoachComponent2.vue';
import SearchBarComponent from '@/components/SearchBarComponent.vue';
import { defineComponent } from 'vue';
import { mapState, mapActions } from 'vuex';
import CoachComponent from "../components/CoachComponent.vue"

export default defineComponent({
    components:{
    CoachComponent,
    CoachComponent1,
    CoachComponent2,
    SearchBarComponent
    },
    data:()=>({
        leftDrawerOpen:true,
        search:''
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

<style>
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