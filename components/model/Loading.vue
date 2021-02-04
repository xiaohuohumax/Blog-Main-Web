<template>
  <div ref="loading" class="loading" v-if="isShow" :class="unOver ? '' : 'loading-over'">
    <div class="line" :style="item" v-for="(item, index) in lines" :key="index"></div>
    <div :class="nowFireEnd ? 'fire-end' : ''" class="fire d-flex justify-content-center align-items-center">
      <span>🚀</span>
    </div>
    <div class="loading-text text-white">
      <Spin fix>
        <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
        <div>Loading</div>
      </Spin>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    loading: Boolean,
  },
  data() {
    return {
      unOver: true,
      isShow: true,
      lineSum: 40,
      lines: [],
      nowFireEnd: false,
    };
  },
  watch: {
    loading() {
      !this.loading ? this.clearLoading() : "";
    },
    unOver(val) {
      !val
        ? setTimeout(() => {
            this.isShow = false;
          }, 2000)
        : "";
    },
  },
  methods: {
    clearLoading() {
      this.nowFireEnd = true;
      this.unOver = false;
      this.lines = [];
      this.$emit("isover");
    },
    addLine() {
      for (let x = 0; x < this.lineSum; x++) {
        let height = this.getRandom(60, 160) + "px";
        let width = this.getRandom(4, 8) + "px";
        let left = this.getRandom(0, document.body.clientWidth) + "px";
        let animationDuration = this.getRandom(1000, 4000) + "ms";
        let animationDelay = this.getRandom(0, 6000) + "ms";
        this.lines.push({ height, width, left, animationDuration, animationDelay });
      }
    },
    getRandom(minNum, maxNum) {
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
    },
  },
  mounted() {
    this.addLine();
  },
};
</script>

<style lang="less">
@keyframes line-move {
  0% {
    top: -100%;
  }
  100% {
    top: 100%;
  }
}

@keyframes fire-move {
  0% {
    bottom: 20%;
  }
  100% {
    bottom: 20%;
    transform: translate(-50%, -40px) rotate(-45deg);
    box-shadow: 0 0 10px rgba(13, 222, 250, 0.603), inset 0 0 10px rgba(13, 222, 250, 0.603);
  }
}

@keyframes fire-up {
  0% {
    bottom: 20%;
  }
  100% {
    bottom: 100%;
  }
}

@keyframes fire-start {
  0% {
    bottom: -100%;
  }
  100% {
    bottom: 20%;
  }
}
@keyframes text-start {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes fire-end {
  0% {
    bottom: 20%;
  }
  100% {
    bottom: 200%;
  }
}
.loading {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background: #333333;
  z-index: 9999;
  position: fixed;
  .demo-spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
  }
  @keyframes ani-demo-spin {
    from {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .line {
    border-radius: ~"5rem 100% 5rem 5rem / 5rem 100% 5rem 5rem";

    background: linear-gradient(0deg, tomato, rgba(124, 93, 93, 0));
    top: -100%;
    position: absolute;

    animation: line-move linear infinite;
  }
  .fire {
    font-size: 3rem;
    position: absolute;
    width: 6rem;
    text-align: center;
    height: 6rem;
    left: 50%;
    bottom: -100%;
    transform-origin: center;
    transform: translate(-50%, 0) rotate(-45deg);
    text-shadow: -5px 5px 10px rgba(13, 222, 250, 0.603);

    animation-delay: 0s, 3s;
    animation-duration: 3s, 1s;
    animation-iteration-count: 1, infinite;
    animation-timing-function: linear, linear;
    animation-fill-mode: forwards, initial;
    animation-direction: initial, alternate;
    animation-name: fire-start, fire-move;
  }

  .fire-end {
    animation: fire-end 2s 1 forwards;
  }
  .loading-text {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    opacity: 0;
    bottom: 6%;
    animation: text-start 6s 1 forwards linear;
  }
}

@keyframes loading-over {
  0% {
    opacity: 1;
    background: #333333;
  }
  100% {
    opacity: 0;
    background: white;
  }
}
.loading-over {
  animation: loading-over 2s 1 forwards;
}
</style>
