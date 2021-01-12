<template>
<div class="banner mx-2 mx-md-5 my-3 rounded">
    <Carousel autoplay loop :autoplay-speed="5000">
        <CarouselItem v-for="(item, index) in bannerImage" :key="index">
            <div :style="bannerStyle(item)"></div>
        </CarouselItem>
    </Carousel>
    <div class="one-word text-white font-weight-bold p-2 rounded h5 mb-0">
        {{ oneWord.hitokoto }}
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            oneWord: {},
            oneWordTime: null,
            bannerImage: [{
                    icon: require('@/assets/image/oooo7.jpg'),
                    title: '时间',
                },
                {
                    icon: require('@/assets/image/oooo15.jpg'),
                    title: '节奏',
                },
            ],
            swiperOptions: {
                // pagination: {
                //   el: '.swiper-pagination',
                // },
                autoplay: {
                    delay: 300,
                    stopOnLastSlide: false,
                    disableOnInteraction: false,
                },
                loop: true,
            },
        }
    },
    created() {
        this.getOneWord()
        this.oneWordTime = setInterval(() => {
            this.getOneWord()
        }, 10000)
    },
    methods: {
        bannerStyle(item) {
            return {
                height: '13rem',
                background: `url('${item.icon}') center / cover`,
            }
        },
        getOneWord() {
            this.$http.oneWord().then((data) => {
                this.oneWord = data
            })
        },
    },
    beforeDestroy() {
        clearInterval(this.oneWordTime)
    },
}
</script>

<style lang="less">
.banner {
    overflow: hidden;

    position: relative;

    // .swiper-item {
    //     height: 8rem;
    // }
    .ivu-carousel-arrow {
        outline: none !important;
    }

    .one-word {
        position: absolute;
        bottom: 2rem;
        left: 50%;
        transform: translate(-50%, 0);
        background: rgba(0, 0, 0, 0.3);
    }
}
</style>
