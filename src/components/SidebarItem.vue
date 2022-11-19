<template>
    <q-item :to="path" @click="clicked" :active="isSelected" class="font-size-up-2" clickable>
              
        <q-item-section avatar>
                <q-icon :name="icon" />
              </q-item-section>

              <q-item-section class="unselectable">
                {{title}}
              </q-item-section>
            </q-item>
</template>
<script lang="ts">
    import { defineComponent } from 'vue';
    export default defineComponent({
        props:['title','id','icon','isSelected','path'],
        methods:{
            clicked:function(){
                this.$emit("itemClicked", this.id);
            }
        }
    })
</script>
<style scoped lang="scss">

    .selected-item{
        background-color: $primary;
        color: white;
    }
</style>