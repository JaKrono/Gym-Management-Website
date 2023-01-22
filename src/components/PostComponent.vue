<template>
    <div class="wrapper">
        <div class="post-header">
            <img class="post-image"
                v-bind:src="(postObject.picUrl) ? postObject.picUrl : 'src/assets/images/post-template.jpg'"
                alt="post-picture">
            <div class="post-title-field">
                <div class="post-title">{{ postObject.title }}</div>
                <div class="post-date">{{ postObject.date }}</div>
            </div>
            <div class="post-content">{{ postObject.content }}</div>
        </div>
        <div class="post-footer">
            <div class="footer-detail">
                <div class="category-section">
                    <div v-for="item in categoryList" class="col-xs-12 q-mr-xs">
                        <q-badge class="q-pa-sm" rounded :label="item.title" :color="item.color"></q-badge>
                    </div>
                </div>
                <div class="writer-section" @click="goToCoachProfile()">{{ postObject.coachName }}</div>
            </div>
            <div v-if="false" class="like-comment-field">
                <div class="like-comment-item">
                    <img class="like-comment-icon" src="src/assets/images/like-icon.png" alt="like">
                    {{ postObject.likedUserIds.length }}
                </div>
                <div class="like-comment-item">
                    {{ postObject.comments.length }}
                    <img class="like-comment-icon" src="src/assets/images/comment-icon.png" alt="comment">
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import type { PostModel, PostCommentModel, CategoryModel } from '@/common/interfaces';
import { CategoryList } from '@/common/category-list';

export default defineComponent({
    props: ['postObject'],
    data: () => {
    },
    mounted() { },
    methods: {
        goToCoachProfile() {
            let params = {
                coachId: this.postObject.coachId,
                gymId: String(this.$store.state.user.gym.id),
                isCoach: String((this.$store.state.user.role === 1))
            };

            this.$router.push({ path: '/coach-profile', query: params })
        }
    },
    computed: {
        categoryList() {
            let result: CategoryModel[] = []
            for (let index of this.postObject.postCategoriesId.split(',')) {
                result.push(CategoryList[parseInt(index) - 1]);
            }
            return result
        }
    }
})
</script>
<style lang="scss">
.wrapper {
    min-width: 300px;
    max-width: 300px;
    height: 485px;
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    background-color: white;
    padding: 10px;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
}

.post-image {
    width: 100%;
    height: 175px;
    border-radius: 4px;
}

.post-title-field {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 5px;

    .post-title {
        text-align: left;
        font-size: 18px;
        font-weight: 700;
    }

    .post-date {
        font-size: 14px;
        font-weight: 500;
        color: gray;
    }
}

.post-content {
    width: 100%;
    text-align: left;
    font-size: 16px;
    font-weight: 500;
}

.post-header {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;
    align-content: flex-start;
    gap: 10px;
}

.post-footer {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    align-items: flex-end;
    align-content: flex-end;
}

.footer-detail {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid $secondary;
    padding: 0 5px 10px 5px;

    .category-section {
        display: flex;
        justify-content: left;
        align-items: center;
        gap: 5px;
    }

    .writer-section {
        font-size: 16px;
        font-weight: 500;
        text-align: right;
        cursor: pointer;
    }
}

.like-comment-field {
    width: 100%;
    height: 35px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0 5px 0;

    .like-comment-item {
        display: flex;
        justify-content: left;
        align-items: flex-end;
        font-size: 16px;
        font-weight: 700;
        gap: 5px;
        cursor: pointer;
    }

    .like-comment-icon {
        width: 25px;
        height: 25px;
    }
}
</style>