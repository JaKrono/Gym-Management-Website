<template>
    <div class="container">
        <img class="image" v-bind:src="starIcon()" alt="rank star">
        <div class="rank-number">{{ rankNumber }}</div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

enum RankStatus {
    Worst = 0,
    Low,
    Medium,
    High
}

export default defineComponent({
    props: ['rankNumber'],
    data: () => ({
        rankStatus: RankStatus.Worst
    }),
    mounted() {
        this.setRankStatus();
    },
    methods: {
        setRankStatus() {
            if (this.rankNumber === 0) {
                this.rankStatus = RankStatus.Worst;
            }
            else if (this.rankNumber < 2.5) {
                this.rankStatus = RankStatus.Low;
            }
            else if (this.rankNumber < 4) {
                this.rankStatus = RankStatus.Medium;
            }
            else {
                this.rankStatus = RankStatus.High;
            }
        },
        starIcon() {
            switch (this.rankStatus) {
                case RankStatus.Worst: return "src/assets/images/black-star.png";
                case RankStatus.Low: return "src/assets/images/red-star.png";
                case RankStatus.Medium: return "src/assets/images/blue-star.png";
                case RankStatus.High: return "src/assets/images/golden-star.png";
            }
        }
    }
})
</script>
<style lang="scss">
.container {
    min-width: 48px;
    max-width: 48px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background-color: none;
}

.rank-number {
    top: 14px;
    position: absolute;
    font-size: 14px;
    font-weight: 500;
    color: white;
}

.image {
    width: 100%;
    height: 100%;
    background-color: none;
}
</style>