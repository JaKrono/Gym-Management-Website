<template>
    <div class="row column coach-card">
        <div class="col-lg-8 img-container">
            <img class="coach-image" src="player.jpg"/>
        </div>
        <div class="col-lg-4 q-px-lg q-pt-lg q-pb-md row column">
            <div style="font-size:1.3em">بیژن مرتضوی</div>
            <div>مربی</div>
            <div class="row q-mt-md">
                <q-btn icon="add" round flat color="primary" class="self-start"></q-btn>
                <q-btn class="q-ml-auto" outline color="primary">مشاهده پروفایل</q-btn>
            </div>
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

        }
        .coach-image{
            width:100%;
            height:500px;
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