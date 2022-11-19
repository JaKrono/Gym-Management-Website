<template>
    <div class="row column coach-card">
        <div class="col-lg-5 bg-primary first-section">
            <div class="row justify-end">

                <q-btn v-if="isInAddState" icon="add" flat color="white" rounded fab></q-btn>
            </div>
            <div class="image-cn">
                <img src="player.jpg" class="user-image"/>
            </div>
        </div>
        <div class="col-lg-7 q-pa-md second-section row column ">
            
            <div style="font-size:1.3em">بیژن مرتضوی</div>
            <div>مربی</div>
            <q-space></q-space>
            <q-btn color="primary" outline>مشاهده پروفایل</q-btn>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

    export default defineComponent({
        props:['isInAddState'],
        mounted(){
            console.log(this.isInAddState);
            
        }
    })
</script>
<style scoped lang="scss">
    .coach-card{
        box-shadow: 0 0 4px 0.3px #000;
        .first-section{
            position: relative;
            height: 150px;
        }
        .image-cn{
            width: 100px;
            height: 100px;
            overflow: hidden;
            border-radius: 50%;
            position: absolute;
            bottom: -30px;
            right: 10px;
            .user-image{
                width:100px;
                height:100px;
                object-fit: cover;
                bottom: 0;
            }
        }
        .second-section{
            height: 300px;
        }
    }
</style> 