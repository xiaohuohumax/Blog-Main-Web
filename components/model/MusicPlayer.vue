<template>
  <div class="music-player d-none d-lg-block">
    <div class="music-player-control">
      <audio
        ref="musicAudio"
        class="d-none"
        :src="url"
        @canplay="audioCanplay"
        @timeupdate="audioTimeupdate"
        @volumechange="audioVolumechange"
        @ended="audioEnd"
        @loadstart="audioLoadstart"
        @error="audioError"
        controls
      ></audio>
      <img
        class="music-circle theme-card-background music-bg-icon w-100 h-100 p-1"
        :src="musicIcon"
        :onerror="imgError"
        :class="{ 'music-bg-icon-pause': !palyed }"
      />
      <i-circle
        class="music-circle music-circle-time w-100 h-100 theme-card-background"
        :percent="timePercent"
        stroke-color="tomato"
        :stroke-width="10"
      ></i-circle>
      <i-circle
        class="music-circle music-circle-sound"
        style="width: calc(100% - 1.5rem); height: calc(100% - 1.5rem)"
        :percent="soundPercent"
        :stroke-width="10"
      ></i-circle>
      <div
        class="music-circle music-circle-play w-100 h-100 d-flex justify-content-center align-items-center"
      >
        <Icon
          :type="!palyed ? 'ios-play' : 'ios-pause'"
          @click="playButtonClick"
          size="25"
          class="cursor-pointer"
        />
      </div>
    </div>
    <div
      class="theme-card-background rounded music-player-word text-center mb-2"
      style="min-width: 40rem; min-height: 1rem"
    >
      <div class="font-weight-bold" style="font-size: 1.5rem">
        {{ lrcWord }}
      </div>
      <div class="music-player-word-control my-1">
        <Icon type="ios-rewind" @click="playPrev" size="20" class="cursor-pointer mx-1" />
        <Icon
          :type="!palyed ? 'ios-play' : 'ios-pause'"
          @click="playButtonClick"
          size="20"
          class="cursor-pointer mx-1"
        />
        <Icon
          type="ios-fastforward"
          @click="playNext"
          size="20"
          class="cursor-pointer mx-1"
        />
      </div>
    </div>
  </div>
</template>

<script>
import LrcFormat from "@/plugins/LrcFormat";
import config from "@/config";

export default {
  props: {
    musics: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      palyed: false, // 是否播放
      loading: false, // 是否加载

      timePercent: 0, // 时间百分比
      soundPercent: 0, // 音量百分比
      loadErrorMax: 2, // 最多允许加载错误 3次

      url: "",

      musicsCheckedList: [],
      playIndex: 0, // 播放下标
      imgError: `this.src='${config.musicplayer.defineIcon}'`,
      dbClickTime: 0,

      lrcFormat: new LrcFormat(), // 歌词解析器

      lrcWord: "", // 当前歌词
    };
  },
  watch: {
    musics: "copyList", // 重新加载歌单
    palyed() {
      // 没有歌曲禁止播放
      if (this.musicsCheckedList.length == 0 && this.palyed) {
        this.palyed = false;
      }
    },
    // 没有歌曲禁止播放
    musicsCheckedList() {
      if (this.musicsCheckedList.length == 0) {
        this.palyed = false;
      }
    },
  },
  computed: {
    musicInf() {
      return this.musicsCheckedList[this.playIndex];
    },
    musicIcon() {
      if (this.loading || this.musicsCheckedList.length == 0)
        return config.musicplayer.loadingIcon;
      return this.musicInf && this.musicInf.icon;
    },
  },
  created() {
    this.copyList();
  },

  mounted() {
    this.musicAudio = this.$refs.musicAudio;
    this.playLoad();
  },
  methods: {
    // 下载歌词
    loadLrc() {
      this.$http
        .getLrc(this.musicInf.lrc)
        .then((result) => {
          this.lrcFormat.setLrc(result);
        })
        .catch((err) => {
          this.lrcFormat.setNotWord();
        });
    },
    // 拷贝歌单 并添加错误计数
    copyList() {
      this.musicsCheckedList = []
        .concat(this.musics)
        .map((val) => ({ ...val, _errorSum: 0 }));
    },
    // 加载错误
    audioError() {
      if (this.musicsCheckedList.length == 0) return;
      // 错误计数
      this.musicsCheckedList[this.playIndex]._errorSum++;

      // 超出容忍范围
      if (this.loadErrorMax <= this.musicsCheckedList[this.playIndex]._errorSum) {
        this.musicsCheckedList.splice(this.playIndex, 1); // 去除歌单
        this.playIndex--;
      }
      this.playLoadByFlag(1);
    },
    // 进度条改变
    audioTimeupdate() {
      this.timePercent = (this.musicAudio.currentTime / this.musicAudio.duration) * 100;
      this.lrcWord = this.lrcFormat.getWord(this.musicAudio.currentTime * 1000);
    },
    // 音量改变
    audioVolumechange() {
      this.soundPercent = (this.musicAudio.volume / 1) * 100;
    },
    // 播放结束
    audioEnd() {
      this.playNext();
    },
    // 开始加载
    audioLoadstart() {
      this.loading = true;
    },
    // 加载下一首歌曲
    playLoadByFlag(flag = 1) {
      const len = this.musicsCheckedList.length;
      let index = this.playIndex + (flag % len);
      this.playIndex = index > len - 1 ? 0 : index < 0 ? len - 1 : index;
      console.log(this.playIndex);
      this.playLoad();
    },
    playLoad() {
      if (!this.musicInf) return;
      this.loadLrc(); // 加载歌词
      this.url = this.musicInf.url;
      this.musicAudio.load();
    },
    // 可以播放
    audioCanplay() {
      this.loading = false;

      this.audioTimeupdate();
      this.audioVolumechange();
      this.byFlagPlayOrPause();
    },
    // 下一首
    playNext() {
      this.palyed = true;
      this.playLoadByFlag(1);
    },
    // 上一首
    playPrev() {
      this.palyed = true;
      this.playLoadByFlag(-1);
    },
    // 双击 下一首 单击暂停/播放
    playButtonClick(e) {
      let newTime = Date.now();

      if (newTime - this.dbClickTime < 500) {
        // 双击
        this.playNext();
      } else {
        // 单击
        this.palyed = !this.palyed;
        this.byFlagPlayOrPause();
      }
      this.dbClickTime = Date.now();
    },
    // 播放/暂停
    byFlagPlayOrPause() {
      this.palyed ? this.musicAudio.play().catch((err) => {}) : this.musicAudio.pause();
    },
  },
};
</script>

<style lang="less">
.music-player {
  .music-player-control {
    position: fixed;
    -webkit-user-select: none;
    width: 4.5rem;
    height: 4.5rem;
    bottom: 0.5rem;
    left: 0.5rem;
    z-index: 800;
    @keyframes circle-icon {
      0% {
        transform: translate(-50%, -50%) rotate(0deg);
      }
      100% {
        transform: translate(-50%, -50%) rotate(360deg);
      }
    }
    .music-bg-icon {
      object-fit: cover;
      z-index: 11;
      animation: circle-icon 7s infinite linear;
    }
    .music-bg-icon-pause {
      animation-play-state: paused;
    }
    .music-circle-play {
      z-index: 10;
    }

    &:hover > .music-bg-icon {
      z-index: -1;
    }

    & > .music-circle {
      border-radius: 50%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  @keyframes text {
    0% {
      background: linear-gradient(90deg, #fa8bff, #2bd2ff, #2bff88);
      background-clip: text;
    }
    50% {
      background: linear-gradient(90deg, #2bff88, #fa8bff, #2bd2ff);
      background-clip: text;
    }
    100% {
      background: linear-gradient(90deg, #2bd2ff, #2bff88, #fa8bff);
      background-clip: text;
    }
  }
  .music-player-word {
    position: fixed;
    bottom: 0;
    left: 50%;
    animation: text 5s linear infinite;
    color: transparent;

    transform: translate(-50%, 0);
    &:hover .music-player-word-control {
      display: block;
    }
    .music-player-word-control {
      display: none;
    }
  }
}
</style>
