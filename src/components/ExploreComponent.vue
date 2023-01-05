<template>
    <div class="post-list">
        <template v-for="postItem in postList">
            <PostComponent :postObject="postItem"></PostComponent>
        </template>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import PostComponent from './PostComponent.vue';
import type { PostModel, PostCommentModel } from '@/common/interfaces';
import { PostsExploreService } from "@/repositories/index";

export default defineComponent({
    components: {
        PostComponent
    },
    data: () => ({
        postList: [] as PostModel[],
    }),
    async beforeMount() {
        await this.getPosts();
    },
    mounted() {
        // for (let i = 0; i < 10; ++i) {
        //     let commonComment: PostCommentModel = {
        //         postId: String(i),
        //         comment: 'چرت و پرت چرت و پرت چرت و پرت چرت و پرت',
        //         writerName: 'حسام'
        //     }

        //     let tempPost: PostModel = {
        //         id: String(i),
        //         title: `پست ${i}`,
        //         content: 'چرت و پرت چرت و پرت چرت و پرت چرت و پرت چرت و پرت چرت و پرت چرت و پرت چرت و پرت چرت و پرت چرت و پرت چرت و پرت و پرت و پرت و پرت',
        //         picUrl: '',
        //         likedUserIds: ['0', '1', '2'],
        //         comments: [commonComment, commonComment, commonComment, commonComment],
        //         date: '1401/10/14',
        //         coachName: ' حسام حسینی',
        //         coachId: '0',
        //         postCategoriesId: '1,2'
        //     }

        //     this.postList.push(tempPost);
        // }
    },
    methods: {
        async getPosts() {
            try {
                const result = await PostsExploreService.getPosts();

                if (result.status === 200) {
                    this.postList = result.data;
                }
                else {
                    alert('حطا در ارتباط');
                }
            }
            catch (err) { }
        }
    }
})
</script>
<style lang="scss">
.post-list {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: flex-start;
    padding: 40px;
    gap: 40px;
    background-color: $background;
}
</style>