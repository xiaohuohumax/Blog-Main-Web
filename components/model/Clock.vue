<template>
  <div class="clock d-flex align-items-center justify-content-center mx-auto">
    <div class="appAll position-relative" :style="`--alldeg:${deg}deg`" ref="appAll">
      <!-- 小时 -->
      <div class="appHour appTimeBlock" :style="`--deg:-${hour * 15}deg`">
        <div
          class="appTimeSon w-50 text-right position-absolute"
          v-for="(item, index) in 24"
          :key="index"
          :style="`--i:${index * 15}deg`"
          :class="{ 'text-danger': index == hour }"
        >
          {{ index }}
        </div>
      </div>
      <!-- 分钟 -->
      <div class="appMinute appTimeBlock" :style="`--deg:-${minute * 6}deg`">
        <div
          class="appTimeSon w-50 text-right position-absolute"
          v-for="(item, index) in 60"
          :key="index"
          :style="`--i:${index * 6}deg`"
          :class="{ 'text-danger': index == minute }"
        >
          {{ index }}
        </div>
      </div>
      <!-- 秒 -->
      <div class="appAsecond appTimeBlock" :style="`--deg:-${second * 6}deg`">
        <div
          class="appTimeSon w-50 text-right position-absolute"
          v-for="(item, index) in 60"
          :key="index"
          :style="`--i:${index * 6}deg`"
          :class="{ 'text-danger': index == second }"
        >
          {{ index }}
        </div>
      </div>
      <!-- 吃豆人脸 -->
      <div class="appPacFace appTimeBlock">
        <div class="appPacFaceTop">
          <div class="appPacTopEye position-absolute rounded-circle">
            <div class="appPacTopEyeCenter position-absolute"></div>
          </div>
        </div>
        <div class="appPacFaceBottom"></div>
        <div class="appPacFaceLeft"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hour: 0,
      second: 0,
      minute: 0,
      deg: 0,
    };
  },
  methods: {
    byXYGetDeg(x2, y2) {
      // 根据坐标得出关于x轴的度数 0-360
      let res = (Math.atan2(x2, -y2) * 180) / Math.PI - 90;
      return res > 0 ? res : 360 + res;
    },
  },
  mounted() {
    let appAll = this.$refs.appAll;
    // appAll.addEventListener("mousemove", (e, obj) => {
    //     e = e ? e : window.event;
    //     this.deg = this.byXYGetDeg(
    //         e.clientX - appAll.offsetLeft,
    //         e.clientY - appAll.offsetTop
    //     );
    // });
    setInterval(() => {
      let time = new Date();
      this.hour = time.getHours();
      this.second = time.getSeconds();
      this.minute = time.getMinutes();
    }, 500);
  },
};
</script>

<style lang="less" scoped>
.clock {
  min-height: 200px;
  min-width: 200px;
  width: 200px;
  height: 200px;
  // overflow: hidden;

  .appAll {
    transform: rotate(var(--alldeg));
  }

  .appTimeBlock {
    position: absolute;
    border-radius: 50%;
    transform: translate(-50%, -50%) rotate(var(--deg));
  }

  .appTimeSon {
    top: 50%;
    left: 50%;
    height: 0;
    line-height: 0rem;
    font-weight: bold;
    transform: translate(0, -50%);
    transform-origin: center left;
    transform: rotate(var(--i));
  }

  .appHour {
    width: 100px;
    height: 100px;
  }

  .appMinute {
    width: 150px;
    height: 150px;
  }

  .appAsecond {
    width: 200px;
    height: 200px;
  }

  .appPacFace {
    // display: none;
    width: 200px;
    height: 200px;
    transform: translate(-50%, -50%);

    @keyframes openTop {
      0% {
        transform: rotate(0);
      }

      100% {
        transform: rotate(45deg);
      }
    }

    @keyframes openBottom {
      0% {
        transform: rotate(0);
      }

      100% {
        transform: rotate(-45deg);
      }
    }

    @keyframes eyeMove {
      0%,
      100% {
        top: 0;
        left: 50%;
        transform: translate(-50%, 0);
      }

      25% {
        top: 50%;
        left: 50%;
        transform: translate(0, -50%);
      }

      50% {
        top: 50%;
        left: 50%;
        transform: translate(-50%, 0);
      }

      75% {
        top: 50%;
        left: 0;
        transform: translate(0, -50%);
      }
    }

    .appPacFaceTop,
    .appPacFaceBottom,
    .appPacFaceLeft {
      position: absolute;
      width: 0;
      height: 0;
      border: 100px solid;
      border-radius: 50%;
      z-index: 2;
    }

    .appPacFaceLeft {
      border-color: transparent transparent yellow yellow;
      z-index: 1;
    }

    .appPacFaceTop {
      border-color: yellow transparent transparent yellow;
      animation: openTop 1s infinite alternate ease-out;

      .appPacTopEye {
        width: 40px;
        z-index: 10;
        height: 40px;
        background: black;
        transform: translate(0, -85px);

        .appPacTopEyeCenter {
          width: 50%;
          height: 50%;
          border-radius: 50%;
          background: white;
          animation: eyeMove 4s infinite;
        }
      }
    }

    .appPacFaceBottom {
      border-color: transparent transparent yellow yellow;
      animation: openBottom 1s infinite alternate ease-out;
    }
  }
}
</style>
