<template>
    <div class="row content-center q-pa-sm coach-card">
        <div class="col-lg-3 ">
            <div class="img-container">
                <img class="coach-image" src="player.jpg"/>
            </div>
        </div>
        <div class="col-lg-5 q-px-lg row column justify-center">
            <div style="font-size:1.3em">بیژن مرتضوی</div>
            <div>مربی</div>
        </div>
        <div class="col-lg-4 row column justify-end">
            <q-btn flat color="primary" class="self-end q-mb-auto" round icon="add">
                <!-- <q-icon name="add"></q-icon> -->
            </q-btn>
            <q-btn outline color="primary">مشاهده پروفایل</q-btn>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

    export default defineComponent({})
</script>
<style scoped lang="scss">
    
    .coach-card{
        box-shadow: 0 0 4px 0.3px #000;
        border-radius: 5px;
        transition: all .3s ease-in-out;
        .img-container{
            overflow: hidden;
            border-radius: 50%;
            width: 100px;
            height: 100px;
        }
        .coach-image{
            width:100px;
            height:100px;
            object-fit: cover;
            transition: all .3s ease-in-out;

        }
        &:hover{
            box-shadow: 0 0 5px 1px #000;
            .coach-image{
                transform: scale(1.05);
                transition: all .3s ease-in-out;

            }
        }
    }

</style> 