<template>
  <div class="video-player rounded shadow borer border-danger">
    <div class="appView position-relative" ref="appView">
      <video
        class="appVideo w-100 mb-0 rounded-top"
        :src="videosrc"
        ref="appVideo"
        webkit-playsinline="true"
        :poster="icon"
        x5-video-player-type="h5"
        x5-video-orientation="portraint"
      ></video>
      <canvas
        v-show="danmuOpen"
        class="appCnavas position-absolute"
        :style="{ opacity: danmuOpacity }"
        ref="appCanvas"
      ></canvas>
      <div
        class="appSetTools position-absolute w-100 h-100 text-white d-flex align-items-center justify-content-center"
        :class="{ appSetToolsShow: toolsOpen }"
      >
        <i
          class="appSTStart position-absolute fas"
          @click="videoPOPTol"
          :class="palyOrPause ? 'fa-pause' : 'fa-play'"
        ></i>
        <div class="appSTBottom position-absolute w-100">
          <div class="appSTBTime shadow-sm rounded" @click="changeTime" ref="appSTBTime">
            <div ref="appSTBTimeItem" class="appSTBTimeItem"></div>
          </div>
          <div
            class="appSTBOther d-flex align-items-center small justify-content-between"
          >
            <div class="d-flex align-items-center">
              <i
                class="fas mr-2 fa-lg"
                :class="palyOrPause ? 'fa-pause' : 'fa-play'"
                @click="videoPOPTol"
                title="播放/暂停"
              ></i>
              <div class="p-1 mr-2">{{ getPlayTime }}</div>
              <div class="mx-3">
                弹幕
                <i-switch
                  size="small"
                  v-model="danmuOpen"
                  true-color="#13ce66"
                  false-color="#ff4949"
                />
              </div>
              <div class="mr-3" @click="vSoundOpen">
                静音
                <i
                  class="fa big fa-lg ml-1"
                  :class="videoMuted ? 'fa-volume-off text-danger' : 'fa-volume-up'"
                ></i>
              </div>
            </div>
            <div class="d-flex align-items-center">
              <i
                class="fa mr-2"
                :class="fullScreen ? 'fa-compress' : 'fa-expand'"
                title="全屏"
                @click="videoFullScreen"
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="appSet d-flex align-items-center justify-content-between py-2 px-1">
      <div class="d-flex align-items-center">
        <div class="mr-2 mr-md-3 text-success small d-none d-md-inline-block">
          <Icon type="md-paper-plane" />
          共: {{ danmu.length + danmuAdd }} 条弹幕
        </div>
      </div>
      <div class="text-right" v-if="!logined">
        <Button type="primary" ghost :to="loginpath">弹幕,请先登录呦~</Button>
      </div>
      <div class="d-flex justify-content-end align-items-center flex-grow-1" v-else>
        <i-switch
          class="flex-shrink-0 mx-2"
          v-model="danmuOpen"
          true-color="#13ce66"
          false-color="#ff4949"
        >
          <span slot="open">开</span>
          <span slot="close">关</span>
        </i-switch>

        <Poptip class="d-none d-md-block" placement="top" width="200" trigger="click">
          <Icon type="md-color-palette" size="25" class="mx-2" />
          <div class="form-group mb-0" slot="content">
            <label>颜色</label>
            <div class="row">
              <div class="col">
                <input
                  type="text"
                  class="form-control form-control-sm"
                  placeholder="颜色"
                  v-model="userColor"
                  :disabled="danmuFire"
                />
              </div>
              <div class="col">
                <div
                  class="border rounded h-100"
                  :style="{ background: `${userColor}` }"
                ></div>
              </div>
            </div>
            <div class="d-flex flex-wrap pt-2 justify-content-center">
              <div
                class="p-2 m-1 rounded shadow-sm"
                v-for="(item, index) in color"
                :key="index"
                @click="setDanmuColor(item)"
                :title="item"
                :style="{ background: `${item}` }"
              ></div>
            </div>
          </div>
        </Poptip>

        <Poptip class="d-none d-md-block" placement="top" width="350" trigger="click">
          <Icon type="ios-analytics" size="25" class="mx-2" />
          <div class="form-group mb-0" slot="content">
            <div v-for="(item, index) in emoji" :key="index">
              <div v-show="item.name == emojiCho" class="appEmoji">
                <div class="d-flex text-center justify-content-center flex-wrap">
                  <div
                    class="py-2 appEmojiItem"
                    v-for="(items, indexs) in getEmoji(item.size)"
                    :key="indexs"
                    @click="addEmoji(items)"
                  >
                    {{ String.fromCodePoint(items) }}
                  </div>
                </div>
              </div>
            </div>
            <!-- 列表 -->
            <div class="d-flex pt-2 px-2">
              <div
                class="mr-2 px-2 appEmojiItemList"
                :class="{ appEmojiItemListCho: item.name == emojiCho }"
                v-for="(item, index) in emoji"
                :key="index"
                @click="setEmojiCho(item.name)"
              >
                <label>{{ item.name }}</label>
              </div>
            </div>
          </div>
        </Poptip>
        <Input
          style="max-width: 20rem"
          search
          clearable
          enter-button="发送"
          class="bg-0"
          placeholder="发个弹幕见证当前"
          @on-search="uploadDanmu"
          v-model="userDamu"
          :disabled="danmuFire"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    danmu: Array,
    videosrc: String,
    logined: Boolean,
    loginpath: String,
    icon: String,
  },
  data() {
    return {
      damuOpen: true,
      setOpen: false,
      fullScreen: false, // 全屏
      toolsOpenSet: undefined, // 计时器对象
      toolsOpen: false, // 是否显示控件
      toolsOpenTime: 3000, // 显示控件时间
      videoMuted: false, // 是否静音
      palyOrPause: false, // 播放或暂停
      currentTime: "00:00",
      duration: "00:00",
      emoji: [
        { name: "表情", size: [0x1f600, 0x1f645] },
        { name: "动物", size: [0x1f400, 0x1f43d] },
        { name: "交通", size: [0x1f680, 0x1f6aa] },
        { name: "其它", size: [0x1f340, 0x1f36f] },
      ],
      /* emoji 编码格式 十进制
      [E:1234567]
      */
      emojiCho: "表情",
      color: [
        "#42b883",
        "#347474",
        "#35495e",
        "#ff7e67",
        "#e7305b",
        "#0e9aa7",
        "#303960",
        "#82c4c3",
        "#f76a8c",
        "#be79df",
        "#b590ca",
        "#0f4c81",
        "#65587f",
        "#50bda1",
        "#ffffff",
        "#000000",
      ], // 颜色列表
      userDamu: "", // 用户要发松的弹幕
      userColor: "#ffffff", // 发射弹幕的颜色
      danmuSize: 18, // 弹幕字体大小
      danmuSteep: 5, // 弹幕垂直间隔
      danmuVelocity: 1.1, //弹幕速度
      danmuOpen: true, // 弹幕开关
      danmuFire: false, // 是否在发送弹幕
      danmuOpacity: 0.9, // 弹幕透明度
      danmuShowSize: 3, // 弹幕显示位置
      danmuAdd: 0, // 新添加的弹幕数量
      // video
      appVideo: undefined,
      appCanvas: undefined,
      canPaly: false, // 能否播放
      canFire: false, // 能否发射弹幕
      animationFrame: undefined, // 动画对象
      // 弹幕
      // 弹幕模板
      danmuMuBan: {
        content: "", // 弹幕内容
        color: "#ffffff", // 弹幕颜色
        start: 0, // 发射时间
        moveX: 0,
        moveY: 0,
        velocity: 1, //速度
        live: true, // 是否存活
        nowFire: false, // 是否是现在发送的
      },
      danmuList: [], //弹幕列表
      danmuReadyList: [], // 弹幕准备完成队列
    };
  },
  watch: {
    toolsOpen(newVal) {
      if (newVal) {
        clearTimeout(this.toolsOpenSet);
        this.toolsOpenSet = setTimeout(() => {
          this.toolsOpen = false;
        }, this.toolsOpenTime);
      }
    },
  },
  mounted() {
    this.appVideo = this.$refs.appVideo;
    this.appCanvas = this.$refs.appCanvas;

    this.videoToolsOpen(); // 控件显示监视
    this.toolsOpen = true; // 默认显示几秒

    // 视频是否可以播放
    this.appVideo.addEventListener("canplay", () => {
      this.canPaly = true;
      this.danmuTransformation();
      this.setCanvasSize();
      window.cancelAnimationFrame(this.animationFrame); // 清除弹幕动画防止重复调用
      this.drawFrame();
      this.duration = this.bySecondToString(this.appVideo.duration); // 设置总时长
    });
    //监听播放开始
    this.appVideo.addEventListener("play", () => {
      this.canFire = true;
    });
    //监听播放结束
    this.appVideo.addEventListener("pause", () => {
      this.canFire = false;
    });
    //监听播放结束
    this.appVideo.addEventListener("ended", () => {
      this.clearFrame();
      this.danmuReadyList = [];
      this.vidoPlayOrPause(false);
    });
    // 添加弹幕
    this.appVideo.addEventListener("timeupdate", () => {
      this.setTime((this.appVideo.currentTime / this.appVideo.duration) * 100);
      this.currentTime = this.bySecondToString(this.appVideo.currentTime); // 设置时长
      if (this.danmuOpen) {
        this.addDannmu();
      }
    });
    // 窗口变化
    window.addEventListener("resize", () => {
      this.setCanvasSize();
    });
  },
  methods: {
    // 静音
    vSoundOpen() {
      if (this.canPaly) {
        this.videoMuted = !this.videoMuted;
        this.$refs.appVideo.muted = this.videoMuted;
      }
    },
    // 显示控件
    videoToolsOpen() {
      let appView = this.$refs.appView;
      appView.addEventListener("mouseover", () => {
        this.toolsOpen = true;
      });
      appView.addEventListener("mousemove", () => {
        this.toolsOpen = true;
      });
      appView.addEventListener("mouseout", () => {
        this.toolsOpen = false;
      });
    },
    // 全屏切换
    videoFullScreen() {
      if (this.canPaly) {
        this.fullScreen = !this.fullScreen;
        this.fullScreen
          ? this.$refs.appView.webkitRequestFullscreen()
          : document.webkitExitFullscreen();
      }
    },
    // 点击时间轴
    changeTime(event) {
      if (this.canPaly) {
        this.clearNowDanmu();
        this.vidoPlayOrPause(true);
        this.appVideo.currentTime =
          (event.offsetX * this.appVideo.duration) / this.$refs.appSTBTime.clientWidth;
      }
    },
    // 切播放状态
    videoPOPTol() {
      if (this.canPaly) {
        this.palyOrPause = !this.palyOrPause;
        this.vidoPlayOrPause(this.palyOrPause);
      }
    },
    // 设置是否播放
    vidoPlayOrPause(flag) {
      if (this.canPaly) {
        this.palyOrPause = flag;
        flag ? this.appVideo.play() : this.appVideo.pause();
      }
    },
    // 秒钟转时间
    bySecondToString(time) {
      let min = parseInt(time / 60);
      let sec = parseInt(time % 60);
      return `${min > 9 ? min : `0${min}`}:${sec > 9 ? sec : `0${sec}`}`;
    },
    setTime(width) {
      if (this.canPaly && this.$refs.appSTBTimeItem) {
        this.$refs.appSTBTimeItem.style.width = `${width}%`;
      }
    },
    addEmoji(emojiID) {
      if (!this.danmuFire) {
        this.userDamu += String.fromCodePoint(emojiID);
      }
    },
    getEmoji(size) {
      let res = [];
      for (let x = size[0]; x < size[1]; x++) {
        res.push(x);
      }
      return res;
    },
    setEmojiCho(cho) {
      this.emojiCho = cho;
    },
    // 设置弹幕显示大小
    setCanvasSize() {
      this.appCanvas.width = this.appVideo.offsetWidth;
      this.appCanvas.height = this.appVideo.offsetHeight;
    },
    // 清除弹幕
    clearFrame() {
      let ctx = this.appCanvas.getContext("2d");
      ctx.clearRect(0, 0, this.appCanvas.width, this.appCanvas.height);
    },
    // 绘制弹幕
    drawFrame() {
      if (this.canPaly && this.canFire && this.danmuOpen) {
        let ctx = this.appCanvas.getContext("2d");
        this.clearFrame();
        this.danmuReadyList = this.danmuReadyList.filter((val) => {
          return val.live;
        });
        this.danmuReadyList.forEach((val) => {
          let realyMoveY = val.moveY * this.danmuSize + this.danmuSteep;
          // 范围过滤
          if (realyMoveY > (this.danmuShowSize / 4) * this.appCanvas.height) {
            return;
          }
          ctx.beginPath();
          ctx.font = `${this.danmuSize}px Arial`;
          // 横坐标改变
          val.moveX -=
            val.velocity *
            (this.danmuVelocity > 0
              ? this.danmuVelocity < 10
                ? this.danmuVelocity
                : 10
              : 1);
          // 移动出边界标志消亡
          if (val.moveX < -ctx.measureText(val.content).width) {
            val.live = false;
          }
          if (realyMoveY > this.appCanvas.height) {
            val.live = false;
          }
          // 现在发送的
          if (val.nowFire) {
            ctx.strokeStyle = "white";
            ctx.rect(
              val.moveX - 10,
              realyMoveY + this.danmuSteep + this.danmuSize * 0.2,
              ctx.measureText(val.content).width + 20,
              0
            );
            ctx.stroke();
          }
          ctx.fillStyle = val.color;
          ctx.fillText(val.content, val.moveX, realyMoveY);
          ctx.closePath();
        });
      }
      this.animationFrame = window.requestAnimationFrame(this.drawFrame);
    },
    // 获取范围内随机整数
    randomNumber(start, end) {
      return Math.floor(Math.random() * (end - start + 1)) + start;
    },
    // 设置弹幕是否打开
    setDanmuOpen() {
      this.danmuOpen = !this.danmuOpen;
    },
    // 设置发送弹幕的颜色
    setDanmuColor(color) {
      if (!this.danmuFire) {
        this.userColor = color;
      }
    },
    // 添加弹幕
    addDannmu() {
      let moveYMax = Math.floor(this.appCanvas.height / this.danmuSize) - 1;
      this.danmuList = this.danmuList.filter((val) => {
        if (this.appVideo.currentTime > val.start) {
          if (this.appVideo.currentTime < val.start + 5) {
            this.danmuReadyList.push({
              ...val,
              moveX: this.appCanvas.width,
              moveY: this.randomNumber(1, moveYMax >= 0.1 ? moveYMax : 1),
              velocity: this.randomNumber(8, 15) * 0.1,
            });
          }
          return false;
        }
        return true;
      });
    },
    // 将传入的弹幕格式转换为模板样式
    danmuTransformation() {
      this.danmu.forEach((val) => {
        this.danmuList.push({
          ...this.danmuMuBan,
          ...val,
          content: val.content,
        });
      });
    },
    // 上传发射的弹幕
    uploadDanmu() {
      if (this.userDamu == "") {
        return;
      }
      this.danmuFire = true;

      this.$emit(
        "uploaddanmu",
        {
          color: this.userColor,
          content: this.userDamu,
          start: this.appVideo.currentTime,
        },
        (flag) => {
          this.danmuFire = false;
          if (flag) {
            this.addDanmu();
          } else {
            alert("error");
          }
          this.userDamu = "";
        }
      );
    },
    addDanmu() {
      this.danmuAdd++; // 弹幕总数添加
      // 确定当前最大竖轴位置
      let moveYMax = Math.floor(this.appCanvas.height / this.danmuSize) - 1;
      let danmu = {
        ...this.danmuMuBan,
        content: this.userDamu,
        color: this.userColor,
        moveX: this.appCanvas.width,
        moveY: this.randomNumber(1, moveYMax >= 0.1 ? moveYMax : 1),
        nowFire: true,
        velocity: this.randomNumber(8, 15) * 0.1,
      };
      // 加入弹幕队列
      this.danmuReadyList.push(danmu);
      this.userDamu = "";
    },
    // 清除当期弹幕
    clearNowDanmu() {
      this.danmuReadyList = [];
    },
  },
  computed: {
    getPlayTime() {
      return `${this.currentTime} / ${this.duration}`;
    },
  },
};
</script>

<style scoped lang="less">
.video-player {
  .bg-none {
    background: none !important;
  }
  line-height: 0;
  // overflow: hidden;
  .appView {
    background: black;
    overflow: hidden;
    .appVideo {
      position: relative;
    }
    .appCnavas {
      top: 0;
      left: 0;
    }
    .appSetTools {
      line-height: initial;
      top: 0;
      left: 0;
      &,
      & * {
        transition: all 0.5s;
      }
      .appSTStart {
        visibility: hidden;
        opacity: 0;
        font-size: 4rem;
        width: 4rem;
        height: 4rem;
        color: tomato;
      }
      .appSTBottom {
        bottom: 0;
        left: 0;

        .appSTBOther {
          height: 0;
          opacity: 0;
          overflow: hidden;
          i:hover {
            color: tomato;
          }
        }
        .appSTBTime {
          background: rgba(197, 195, 195, 0.431);
          cursor: pointer;
        }
        .appSTBTimeItem {
          width: 0;
          padding: 0.125rem 0;
          background: #23ade5;
        }
      }
    }
    .appSetToolsShow {
      .appSTStart {
        visibility: visible;
        opacity: 1;
        opacity: 1;
      }
      .appSTBottom {
        .appSTBOther {
          height: auto;
          padding: 0.5rem 0.75rem;
          opacity: 1;
        }
        .appSTBTime {
          margin: 0 0.5rem;
          .appSTBTimeItem {
            padding: 0.25rem 0;
            border-radius: 0.25rem;
          }
        }
      }
    }
  }
  .appSet {
    line-height: initial;
    position: relative;

    .ivu-input {
      background: none !important;
    }
    .ivu-poptip-popper {
      background: initial !important;
    }

    .appEmojiItem {
      width: 2.5rem;
      cursor: pointer;
      border: 1px solid transparent;
      &:hover {
        border: 1px solid teal;
      }
    }
    .appEmojiItemList {
      color: tomato !important;
      &:hover {
        color: teal !important;
      }
    }
    .appEmojiItemListCho {
      color: teal !important;
    }
  }
}
</style>
