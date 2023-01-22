<template>
    <div class="page-container">
        <div class="post-list">
            <template v-for="postItem in myPosts">
                <PostComponent :postObject="postItem"></PostComponent>
            </template>
        </div>
        <div class="button-field">
            <q-btn class="create-post-btn" @click="openCreateModal()" color="primary">ایجاد پست</q-btn>
        </div>
        <div v-if="createModalShow" class="modal-shadow">
            <div class="modal-content">
                <div class="modal-header">
                    <img class="close-icon" src="src/assets/images/close-icon.svg" alt="close-icon"
                        @click="createModalShow = false">
                </div>
                <div class="modal-container">
                    <div class="post-form">
                        <input class="image-picker" type="file" accept="image/*" @change="imagePicker($event)">
                        <div class="modal-titles">عنوان:</div>
                        <q-input type="textarea" class="col-12" autogrow v-model="newPost.title">
                        </q-input>
                        <div class="modal-titles">محتوا:</div>
                        <q-input style="width: 100%;" :maxlength="128" type="textarea" class="col-12" autogrow
                            v-model="newPost.content">
                        </q-input>
                        <div class="modal-titles">دسته‌بندی:</div>
                        <div class="category-list">
                            <div v-for="item in categoryList" class="col-xs-12 q-mr-xs">
                                <q-badge style="cursor: pointer;" class="q-pa-sm" rounded :label="item.title"
                                    :color="item.color" @click="selectCategory(item)"></q-badge>
                            </div>
                        </div>
                        <div class="selected-category-list">
                            <div v-for="item in selectedCatgories" class="col-xs-12 q-mr-xs">
                                <q-badge style="cursor: pointer;" class="q-pa-sm" rounded :label="item.title"
                                    :color="item.color" @click="selectCategory(item)"></q-badge>
                            </div>
                            <q-btn class="clear-category-list" @click="clearCategoryList()" color="primary">پاک کردن
                                دسته‌ها</q-btn>
                        </div>
                        <div class="submit">
                            <q-btn style="width: 200px;" @click="post()" color="primary">ارسال</q-btn>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import PostComponent from './PostComponent.vue';
import type { PostModel, PostCommentModel, NewPostModel, CategoryModel } from '@/common/interfaces';
import { PostsExploreService } from "@/repositories/index";
import { CategoryList } from '@/common/category-list';

export default defineComponent({
    components: {
        PostComponent
    },
    data: () => ({
        myPosts: [] as PostModel[],
        newPost: {} as NewPostModel,
        createModalShow: false,
        categoryList: CategoryList,
        selectedCatgories: [] as CategoryModel[],
        base64: '',
    }),
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

        //     this.myPosts.push(tempPost);
        // }
    },
    methods: {
        async getPosts() {
            try {
                const result = await PostsExploreService.getPosts();
                if (result.status === 200) {
                    this.myPosts = result.data;

                    let userId = this.$store.state.user.userId;
                    this.myPosts = this.myPosts.filter(item => item.coachId === userId);
                }
                else {
                    alert('حطا در ارتباط');
                }
            }
            catch (err) { }
        },
        async sendPost() {
            try {
                const result = await PostsExploreService.sendPost(this.newPost);
                if (result.status === 201) {
                    this.createModalShow = false;
                    alert('پست ارسال شد.');
                }
                else {
                    alert('حطا در ارتباط');
                }
            }
            catch (err) { }
        },
        openCreateModal() {
            let userId = this.$store.state.user.userId;

            this.newPost = {
                title: '',
                content: '',
                picUrl: '',
                coachId: userId,
                postCategoriesId: ''
            }

            this.selectedCatgories = [];

            this.createModalShow = true;
        },
        selectCategory(categoryItem: CategoryModel) {
            if (this.selectedCatgories.length === 2) {
                alert('بیشتر از دو دسته نمیتوانید انتخاب کنید !');
                return;
            }

            this.selectedCatgories.push(categoryItem);
        },
        clearCategoryList() {
            this.selectedCatgories = [];
        },
        async post() {
            let categoris: string = "";
            this.selectedCatgories.forEach(item => {
                categoris += item.id + ',';
            });

            this.newPost.postCategoriesId = categoris;
            this.newPost.picUrl = this.base64;

            await this.sendPost();
        },
        async imagePicker(image: any) {
            this.base64 = String(await this.getBase64(image));
        },
        async getBase64(file: File) {
            if (!file) {
                return new Promise((resolve, reject) => {
                    resolve('');
                });
            }
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    resolve(reader.result);
                };
            });
        }
    }
})
</script>
<style lang="scss">
.centerlize-item {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: flex-start;
}

.page-container {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-flow: row wrap;
    position: relative;
    align-content: space-between;
    background-color: $background;
}

.button-field {
    position: sticky;
    bottom: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;

    .create-post-btn {
        width: 140px;
        height: 50px;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px 20px;
        cursor: pointer;
        background-color: $primary;
        color: white;
        font-size: 18px;
        font-weight: 500;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

        &:hover {
            background-color: darken($primary, 0.3);
        }
    }
}

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

@keyframes fadeIn {
    0% {
        background: rgba(0, 0, 0, 0);
    }

    100% {
        background: rgba(0, 0, 0, 0.6);
    }
}

@keyframes blowUpModal {
    0% {
        transform: scale(0);
    }

    100% {
        transform: scale(1);
    }
}

.modal-shadow {
    width: 100vw;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba($color: #000000, $alpha: 0.6);
    overflow-y: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;
    animation: fadeIn 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;

    &::-webkit-scrollbar {
        display: none;
    }
}

.modal-content {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    min-width: 320px;
    max-width: 427px;
    background-color: #ffffff;
    padding: 19px 19px 25px 21px;
    border-radius: 12px;
    font-weight: 500;
    font-size: 14px;
    position: absolute;
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    animation: blowUpModal 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;

    &::-webkit-scrollbar {
        display: none;
    }

    .modal-header {
        display: flex;
        flex-flow: row nowrap;
        width: 100%;
        height: 20px;
        justify-content: left;
        margin-bottom: 15px;
    }

    .close-icon {
        width: 20px;
        height: 20px;
        box-sizing: border-box;
        cursor: pointer;
    }

    .modal-container {
        width: 100%;
        display: flex;
        flex-flow: row wrap;
        align-content: flex-start;
    }

    .button-field {
        width: 100%;
        display: flex;
        justify-content: left;

        .modal-button {
            @extend .centerlize-item;
            width: 120px;
            height: 40px;
            border-radius: 5px;
            color: #ffffff;
            background-color: #1e90ff;
            font-size: 16px;
            font-weight: 500;
            padding: 10px;
            cursor: pointer;

            &:hover {
                background-color: darken(#1e90ff, 10%);
            }
        }
    }
}

.post-form {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
    gap: 20px;
}

.image-picker {
    width: 100%;
}

.modal-titles {
    width: 100%;
    font-size: 18px;
    font-weight: 700;
    text-align: left;
}

.category-list {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: left;
    align-items: center;
    gap: 10px;
}

.selected-category-list {
    width: 100%;
    padding-top: 20px;
    border-top: 1px solid $secondary;
    display: flex;
    flex-flow: row wrap;
    justify-content: left;
    align-items: center;
    gap: 10px;
    position: relative;
    margin-bottom: 40px;
}

.clear-category-list {
    position: absolute;
    right: 10px;
    top: 20px;
    width: 170px;
    height: 30px;
    color: white;
}

.submit {
    width: 100%;
    height: 40px;
    justify-content: center;
    align-items: center;
    display: flex;
}
</style>