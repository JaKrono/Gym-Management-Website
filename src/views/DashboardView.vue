<template>
    <q-page>
        <!-- <div class="search-section bg-secondary">
            <div class="row column" style="gap:3em">
            <div class="col-lg-12">
                <SearchBarComponent></SearchBarComponent>
            </div>
            <div class="row" style="gap:1em">
                <div class="filter-item">
                    <label class="field-label ">رشته:</label>
                    <q-select class="bg-white q-mt-sm" outlined></q-select>
                </div>
                <div class="filter-item">
                    <label class="field-label ">رشته:</label>
                    <q-select class="bg-white q-mt-sm" outlined></q-select>
                </div>
                <div class="filter-item">
                    <label class="field-label ">رشته:</label>
                    <q-select class="bg-white q-mt-sm" outlined></q-select>
                </div>
                <div class="filter-item">
                    <label class="field-label ">رشته:</label>
                    <q-select class="bg-white q-mt-sm" outlined></q-select>
                </div>  
            </div>
        </div>
    </div> -->
        <div class="row content-center q-px-lg" style="align-items:center">

            <h5 class="">مربی ها</h5>
            <q-space></q-space>
            <q-btn @click="navigateToCoachSearch" color="primary" icon="add" style="height:40px">افزودن مربی</q-btn>
        </div>
        <div class="row q-pa-md flex-gap">
        <div class="col-lg-3">
            <CoachComponent2></CoachComponent2>
        </div>
        <div class="col-lg-3">
            <CoachComponent2></CoachComponent2>
        </div>
        <div class="col-lg-3">
            <CoachComponent2></CoachComponent2>
        </div>
        <div class="col-lg-3">
            <CoachComponent2></CoachComponent2>
        </div>
        <div class="col-lg-3">
            <CoachComponent2></CoachComponent2>
        </div>
        <!-- <div class="col-lg-3">
            <CoachComponent1></CoachComponent1>
        </div>
        <div class="col-lg-3">
            <CoachComponent2></CoachComponent2>
        </div> -->
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
            this.$router.push('/coach-search')
        }
    }
})
</script>

<style>
    .flex-gap{
        gap:2em;
    }
    .filter-item{
        flex-grow: 1;
    }
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