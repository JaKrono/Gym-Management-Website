<template>
    <div class="page">
        <div class="header">
            <div v-if="!isChangablePage" @click="goToCoachListPage()" class="button-field">
                <img class="back-button" src="src/assets/images/back-icon.png" alt="back-icon">
            </div>
        </div>
        <div v-if="profileDto && profileDto.user" class="container">
            <div class="avatar-field">
                <img class="avatar-icon"
                    v-bind:src="(profileDto.user.picUrl) ? profileDto.user.picUrl : 'src/assets/images/avtar-icon.png'"
                    alt="avatar-icon">
            </div>
            <div class="mobile-edit-button">
                <img v-if="(isChangablePage && isMobile)" class="edit-icon" src="src/assets/images/edit-icon.png"
                    alt="edit-icon" @click="openEditModal()">
            </div>
            <div class="avatar-detail-field">
                <RankingCoachComponent style="margin-left: 15px;" :rankNumber="profileDto.rank_number"></RankingCoachComponent>
                <div class="avatar-detail">
                    <div class="font-size-up-5 avatar-name">
                        {{ profileDto.user.first_name + ' ' + profileDto.user.last_name }}
                    </div>
                    <div class="q-py-lg font-size-up-1">{{ profileDto.description }}</div>
                </div>
                <div class="button-field">
                    <q-btn v-if="bottonButtonShow()" @click="buttonAction()" color="primary">
                        {{ buttonTitle() }}
                    </q-btn>
                </div>
            </div>
            <div class="page-section">
                <div v-if="(profileDto.detail_set && profileDto.detail_set.length !== 0)" class="section-title">مشخصات :
                </div>
                <div class="table">
                    <div v-for="detailItem in profileDto.detail_set" class="table-row">
                        <div class="table-row-section main-section">{{ detailItem.title }}</div>
                        <div class="table-row-section detail-section">{{ detailItem.value }}</div>
                    </div>
                </div>
            </div>
            <div class="page-section">
                <div v-if="(profileDto.achievement_set && profileDto.achievement_set.length !== 0)"
                    class="section-title">دستاورد ها :</div>
                <div class="achievement-list">
                    <div v-for="achievement in profileDto.achievement_set" class="achievement-item">
                        <img class="achievement-icon" src="src/assets/images/achievement-icon.png"
                            alt="achievement-icon">
                        <div class="achievement-detail">
                            <div class="achievement-title">{{ achievement.title }}</div>
                            <div class="achievement-date">{{ achievement.dateRange }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="inviteModalShow" class="modal-shadow">
        <div class="modal-content">
            <div class="modal-header">
                <img class="close-icon" src="src/assets/images/close-icon.svg" alt="close-icon"
                    @click="inviteModalShow = false">
            </div>
            <div class="modal-container">
                <textarea v-model="inviteObject.describtion" class="text-field" cols="30" rows="10"></textarea>
                <div class="button-field">
                    <q-btn @click="sendInviteCoach()" color="primary">ارسال دعوتنامه</q-btn>
                </div>
            </div>
        </div>
    </div>
    <div v-if="editModalShow" class="modal-shadow">
        <div class="modal-content">
            <div class="modal-header">
                <img class="close-icon" src="src/assets/images/close-icon.svg" alt="close-icon"
                    @click="editModalShow = false">
            </div>
            <div class="modal-container">
                <div class="edit-modal">
                    <div class="modal-item">
                        <div class="item-title">نام :</div>
                        <input class="modal-text-field" v-model="tempProfileObject.user.first_name" type="text">
                    </div>
                    <div class="modal-item">
                        <div class="item-title"> نام خانوادگی :</div>
                        <input class="modal-text-field" v-model="tempProfileObject.user.last_name" type="text">
                    </div>
                    <div class="modal-item">
                        <div class="item-title">بیوگرافی :</div>
                        <textarea class="modal-text-field" v-model="tempProfileObject.description"></textarea>
                    </div>
                    <div class="modal-item">
                        <div class="item-title">عکس پروفایل :</div>
                        <input type="file" accept="image/*" (change)="getPhoto($event)">
                    </div>
                    <div class="modal-item">
                        <div class="item-title">مشخصات :</div>
                        <div class="edit-detail">
                            <div v-for="detailItem in tempProfileObject.detail_set" class="edit-detail">
                                {{ detailItem.title + ':' }}
                                <input v-model="detailItem.value" type="text">
                            </div>
                        </div>
                    </div>
                    <div class="modal-item">
                        <div class="item-title">دستاوردها :</div>
                        <div class="edit-achievement">
                            <div v-for="(achievement, index) in tempProfileObject.achievement_set"
                                class="edit-achievement-item">
                                <input v-model="achievement.title" type="text" placeholder="عنوان دستاورد">
                                <input v-model="achievement.dateRange" type="text" placeholder="بازه دستاورد">
                                <q-btn @click="deleteAchievement(index)" color="red">حذف</q-btn>
                            </div>
                            <div @click="addAchievement()" class="add-achievement-item">افزودن دستاورد</div>
                        </div>
                    </div>
                    <div class="modal-item">
                        <div class="edit-button-field">
                            <q-btn @click="editProfile()" color="primary">ذخیره</q-btn>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import RankingCoachComponent from './rankingCoachComponent.vue';
import type { CoachAchievementModel, InviteCoachModel, SearchCoachModel } from '@/common/interfaces';
import { mapActions } from 'vuex';
import { CoachProfileService } from "@/repositories/index";

export default defineComponent({
    components: {
        RankingCoachComponent
    },
    data: () => ({
        coachId: '',
        gymId: '',
        imageBase64: '',
        inviteModalShow: false,
        editModalShow: false,
        isChangablePage: false,
        isMobile: false,
        profileDto: {} as SearchCoachModel,
        tempProfileObject: {} as SearchCoachModel,
        inviteObject: {} as InviteCoachModel
    }),
    async beforeMount() {
        //it's unsafe methed for handel this issue
        if (!this.$route.query.coachId || !this.$route.query.gymId) {
            return;
        }

        this.coachId = (this.$route.query.coachId)?.toString();
        this.gymId = (this.$route.query.gymId)?.toString();
        this.isChangablePage = (this.$route.query.isCoach)?.toString().toLocaleLowerCase() === 'true';
        this.onResizePage();

        await this.initProfile();
    },
    mounted() {
        window.addEventListener('resize', this.onResizePage);
    },
    unmounted() {
        window.removeEventListener('resize', this.onResizePage);
    },
    methods: {
        ...mapActions({
            sendInviteAsync: 'user/sendInvite',
            getCoachDetailAsync: 'user/getCoachDetail',
            editCoachDetailAsync: 'user/editCoachDetail'
        }),
        onResizePage() {
            this.isMobile = (window.innerWidth <= 599.99);
        },
        async initProfile() {
            try {
                // await this.getCoachDetailAsync(this.coachId);
                const result = await CoachProfileService.getCoachProfileDetail(this.coachId);
                if (result.status === 200) {
                    this.profileDto = result.data;
                }
                else {
                    alert('حطا در ارتباط');
                }
            }
            catch (err) { }
        },
        buttonTitle() {
            return (this.isChangablePage) ? 'ویرایش' : 'دعوت';
        },
        buttonAction() {
            if (this.isChangablePage) {
                this.openEditModal();
            }
            else {
                this.openInviteModal();
            }
        },
        openEditModal() {
            this.editModalShow = true;
            this.tempProfileObject = JSON.parse(JSON.stringify(this.profileDto)) as typeof this.profileDto;
        },
        openInviteModal() {
            this.inviteModalShow = true;

            this.inviteObject = {
                coach: this.profileDto.user_id,
                gym: this.gymId,
                describtion: ''
            }
        },
        async editProfile() {
            this.tempProfileObject.user.picUrl = this.imageBase64;
            try {
                // this.profileDto = await this.editCoachDetailAsync(this.coachId, this.tempProfileObject);
                const result = await CoachProfileService.editCoachProfileDetail(this.coachId, this.tempProfileObject);
                if (result.status === 201) {
                    this.profileDto = result.data;
                }
                else {
                    alert('خطا در ارتباط');
                }
            }
            catch (err) { }

            this.editModalShow = false;
        },
        deleteAchievement(index: number) {
            this.tempProfileObject.achievement_set.splice(index, 1);
        },
        addAchievement() {
            let tempAchievement: CoachAchievementModel = {
                title: '',
                dateRange: ''
            }

            this.tempProfileObject.achievement_set.push(tempAchievement);
        },
        async sendInviteCoach() {
            try {
                // await this.sendInviteAsync(this.inviteObject);
                const result = await CoachProfileService.sendInviteMessage(this.inviteObject);
                if (result.status !== 201) {
                    alert('خطا در ارتباط');
                }
            }
            catch (err) { }

            this.inviteModalShow = false;
        },
        goToCoachListPage() {
            if (!this.isChangablePage) {
                this.$router.push('/search-coach');
            }
        },
        bottonButtonShow(): boolean {
            if (this.isChangablePage) {
                return !this.isMobile;
            }

            return true;
        },
        getPhoto(event: any) {
            let reader = new FileReader();
            reader.readAsDataURL(event);

            reader.onload = (_event) => {
                if (reader.result) {
                    this.imageBase64 = reader.result.toString();
                }
                else {
                    this.imageBase64 = "";
                }
            }
        }
    }
})
</script>
<style scoped lang="scss">
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

.centerlize-item {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: flex-start;
}

* {
    cursor: default;
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

.text-field {
    width: 100%;
    height: 180px;
    margin-bottom: 10px;
}

.page {
    @extend .centerlize-item;
    flex-flow: row wrap;
    width: 100%;
    height: 100%;
}

.header {
    display: flex;
    justify-content: right;
    padding: 10px;
    width: 100%;
    height: 150px;
    background-color: $primary;
    box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.05);

    .button-field {
        @extend .centerlize-item;
        min-width: 35px;
        max-width: 35px;
        height: 35px;
    }

    .back-button {
        min-width: 30px;
        max-width: 30px;
        height: 30px;
        cursor: pointer;
    }
}

.container {
    width: 100%;
    position: relative;
    background-color: #ffffff;
}

.mobile-edit-button {
    display: none;
}

.avatar-field {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border: 7px solid #ffffff;
    background-color: #eeeeee;
    position: absolute;
    left: 90px;
    top: -100px;

    .avatar-icon {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
}

.avatar-detail-field {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
    padding: 0 25px 0 300px;
    margin: 30px 0;

    .avatar-detail {
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        align-content: flex-start;
        justify-content: left;
        gap: 15px;
        height: 150px;
    }

    .avatar-name {
        width: 100%;
        text-align: left;
    }

    .avatar-description {
        width: 100%;
        min-width: 720px;
        max-width: 720px;
        font-size: 18px;
        font-weight: 500;
        text-align: justify;
        position: absolute;
        top: 120px;
        left: 150px;
    }

    .button-field {
        display: flex;
        height: 45px;
        align-items: center;
        align-content: flex-start;
        flex-flow: row nowrap;
        gap: 15px;
    }
}

.page-section {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    padding: 0 90px;
    margin-bottom: 30px;

    .section-title {
        width: 100%;
        font-size: 24px;
        font-weight: 700;
        text-align: left;
        margin-bottom: 25px;
    }

    .table {
        width: 100%;
        max-width: 480px;
        display: flex;
        flex-flow: row wrap;
        justify-content: left;
        align-items: flex-start;
        align-content: flex-start;
        gap: 15px;

        .table-row {
            @extend .centerlize-item;
            width: 100%;
            height: 55px;
            flex-flow: row nowrap;
            border-radius: 8px;
        }

        .table-row-section {
            @extend .centerlize-item;
            width: 100%;
            height: 100%;
            color: white;
            font-size: 18px;
            font-weight: 700;
        }

        .main-section {
            background-color: $secondary;
            border-radius: 8px 0 0 8px;
        }

        .detail-section {
            background-color: $primary;
            border-radius: 0 8px 8px 0;
        }
    }

    .achievement-list {
        display: flex;
        align-content: flex-start;
        width: 100%;
        justify-content: left;
        flex-flow: row wrap;
        gap: 15px;

        .achievement-item {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            justify-content: left;
            width: 100%;
            max-width: 720px;
            height: 85px;
            border-radius: 8px;
            background-color: #e8e8e8;
            padding: 10px 15px;
            gap: 20px;
        }

        .achievement-icon {
            width: 65px;
            height: 65px;
            box-sizing: border-box;
        }

        .achievement-detail {
            display: flex;
            flex-flow: column nowrap;
        }

        .achievement-title {
            font-size: 18px;
            font-weight: 700;
            color: #000000;
        }

        .achievement-date {
            font-size: 16px;
            font-weight: 500;
            color: #7b7b7b;
        }
    }
}

.edit-modal {
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    gap: 20px;
    align-content: flex-start;

    .modal-item {
        width: 100%;
        display: flex;
        flex-flow: row wrap;
        justify-content: left;
        align-items: center;
        gap: 10px;

        input {
            width: 100%;
            height: 40px;
            border: 1px solid $background;
        }

        textarea {
            width: 100%;
            height: 100px;
            border: 1px solid $background;
        }

        .item-title {
            width: 100%;
            font-size: 18px;
            font-weight: 700;
        }

        .edit-detail {
            width: 100%;
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            align-items: center;
            font-size: 16px;
            font-weight: 500;
            gap: 10px;

            .detail-item {
                display: flex;
                flex-flow: row nowrap;
                gap: 5px;
            }
        }
    }
}

.modal-text-field {
    text-align: left;
    padding-left: 10px;
    font-size: 18px;
    font-weight: 500;
}

.edit-button-field {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: right;
}

.edit-achievement {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
    gap: 10px;

    .edit-achievement-item {
        display: flex;
        flex-flow: row nowrap;
        gap: 15px;
        justify-content: left;
        align-items: center;
        width: 100%;
        height: 40px;
    }

    .add-achievement-item {
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 18px;
        font-weight: 700;
        border-radius: 5px;
        background-color: $secondary;
        color: white;
        margin-top: 15px;
        cursor: pointer;
    }
}

@media all and (min-width: 600px) and (max-width: 1023.99px) {
    .header {
        height: 100px;
    }

    .avatar-field {
        width: 150px;
        height: 150px;
        left: 7%;
        top: -75px;
    }

    .avatar-detail-field {
        padding: 0 25px 0 calc(7% + 170px);
        margin: 30px 0;

        .avatar-name {
            font-size: 24px;
        }

        .avatar-description {
            min-width: 620px;
            max-width: 620px;
            font-size: 14px;
            font-weight: 400;
            top: 120px;
            left: 50px;
        }

        .button-option {
            width: 100px;
            height: 35px;
            font-size: 16px;
            font-weight: 500;
        }
    }

    .page-section {
        padding: 0 50px;
        margin-bottom: 15px;

        .section-title {
            font-size: 18px;
            margin-bottom: 15px;
        }

        .table {
            max-width: unset;
            gap: 10px;

            .table-row {
                height: 45px;
            }
        }

        .achievement-list {

            .achievement-item {
                max-width: unset;
                background-color: unset;
            }
        }
    }
}

@media all and (max-width: 599.99px) {
    .mobile-edit-button {
        width: 100%;
        height: 25px;
        display: flex;
        justify-content: right;
        padding-right: 25px;
        margin-top: 20px;

        .edit-icon {
            width: 25px;
            height: 100%;
            box-sizing: border-box;
            cursor: pointer;
        }
    }

    .header {
        height: 100px;
    }

    .avatar-field {
        width: 150px;
        height: 150px;
        left: 5%;
        top: -75px;
    }

    .avatar-detail-field {
        flex-flow: row wrap;
        justify-content: left;
        padding: 0 35px !important;
        margin: 30px 0 0 0;

        .avatar-detail {
            height: 170px;
        }

        .avatar-name {
            width: 100%;
            font-size: 24px;
        }

        .avatar-description {
            width: 100%;
            min-width: unset;
            max-width: calc(100% - 40px);
            font-size: 16px;
            font-weight: 400;
            top: 120px;
            left: 20px;
        }

        .button-field {
            width: 100%;
            margin-bottom: 15px;
        }

        .button-option {
            width: 100%;
            font-size: 18px;
            font-weight: 500;
            border-radius: 50px;
        }

        .edit-btn {
            display: none;
        }
    }

    .page-section {
        padding: 0 30px;
        margin-bottom: 25px;

        .section-title {
            font-size: 18px;
            margin-bottom: 15px;
        }

        .table {
            max-width: unset;
            gap: 10px;
            margin: 0 20px;

            .table-row {
                height: 45px;
                border-radius: 20px;
            }
        }

        .achievement-list {

            .achievement-item {
                max-width: 100%;
                background-color: unset;
                height: 65px;
                padding: 10px 5px;
                gap: 20px;
            }

            .achievement-icon {
                width: 45px;
                height: 45px;
            }

            .achievement-detail {
                gap: 7px;
            }

            .achievement-title {
                font-size: 16px;
                font-weight: 500;
            }

            .achievement-date {
                font-size: 12px;
                font-weight: 400;
            }
        }
    }
}
</style>