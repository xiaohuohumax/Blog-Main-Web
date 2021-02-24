<template>
  <div class="music-player d-none d-lg-block">
    <div class="music-player-left">
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
        <div class="music-control-button p-4" style="--deg: 7.5deg; --size: 1.05rem">
          <div
            class="music-cb-body rounded-circle cursor-pointer theme-card-background"
            @click="randomPlaylist"
          >
            <Icon type="md-sync" title="随机切换歌单" class="music-cb-item" />
          </div>
        </div>
        <div class="music-control-button p-4" style="--deg: -27.5deg; --size: 1.35rem">
          <div
            class="music-cb-body rounded-circle cursor-pointer theme-card-background"
            @click="wordShow = !wordShow"
          >
            <Icon
              :type="wordShow ? 'md-code' : 'md-code-working'"
              title="显示歌词"
              class="music-cb-item"
            />
          </div>
        </div>
        <div class="music-control-button p-4" style="--deg: -62.5deg; --size: 1.35rem">
          <div
            class="music-cb-body rounded-circle cursor-pointer theme-card-background"
            @click="muted = !muted"
          >
            <Icon
              :type="muted ? 'md-volume-off' : 'md-volume-up'"
              title="静音"
              class="music-cb-item"
            />
          </div>
        </div>
        <div class="music-control-button p-4" style="--deg: -98deg; --size: 1.05rem">
          <div
            class="music-cb-body rounded-circle cursor-pointer theme-card-background"
            @click="playPrev"
          >
            <Icon type="ios-rewind" title="上一首" class="music-cb-item" />
          </div>
        </div>
      </div>
    </div>

    <div
      v-show="wordShow"
      class="theme-card-background rounded music-player-word text-center mb-2"
      style="min-width: 40rem; min-height: 1rem"
    >
      <div class="font-weight-bold" style="font-size: 1.5rem">
        {{ lrcWord }}
      </div>
      <div class="music-player-word-sub">{{ musicName }}-[{{ playlist.title }}]</div>
    </div>
  </div>
</template>

<script>
import LrcFormat from "@/plugins/lrcFormat";
import config from "@/config";

export default {
  props: {
    playlist: {
      type: Object,
      default: () => ({
        // title: "",
        // subTitle: "",
        // icon: "",
        // musics: [{name:"",icon:"",lrc:"",url:""}],
        // musicInf: [],
      }),
    },
  },

  data() {
    return {
      palyed: false, // 是否播放
      loading: false, // 是否加载

      timePercent: 0, // 时间百分比
      soundPercent: 0, // 音量百分比
      loadErrorMax: 2, // 最多允许加载错误 3次

      muted: false, // 静音
      url: "",

      musicsCheckedList: [],
      playIndex: 0, // 播放下标
      imgError: `this.src='${config.musicplayer.defineIcon}'`,
      dbClickTime: 0,

      lrcFormat: new LrcFormat(), // 歌词解析器

      lrcWord: "", // 当前歌词

      wordShow: false, // 显示歌词
    };
  },
  watch: {
    playlist: "copyList", // 重新加载歌单
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
    muted() {
      this.musicAudio.muted = this.muted;
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
    musicName() {
      return this.musicInf && this.musicInf.name;
    },
  },
  mounted() {
    this.musicAudio = this.$refs.musicAudio;
    this.copyList();
  },
  methods: {
    // 随机歌单
    randomPlaylist() {
      this.$emit("randomplaylist");
    },
    // 下载歌词
    loadLrc() {
      if (!this.musicInf) return;
      this.$http
        .getLrc(this.musicInf.lrc)
        .then((result) => {
          this.lrcFormat.setLrc(result);
        })
        .catch((err) => {
          this.lrcFormat.setNotWord(`[${this.musicInf.name}]暂无歌词~`);
        });
    },
    // 拷贝歌单 并添加错误计数
    copyList() {
      const musics = this.playlist.songInf;
      console.log(musics);
      if (!musics) return;
      this.musicsCheckedList = [].concat(musics).map((val) => ({ ...val, _errorSum: 0 }));
      this.playLoad();
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
  .music-player-left {
    position: fixed;
    bottom: 0rem;
    left: 0rem;

    z-index: 800;
    &:hover .music-player-control {
      transform: translate(0.5rem, -0.5rem);
      .music-bg-icon {
        z-index: -1;
      }
      .music-control-button {
        opacity: 1;
        visibility: visible;
        width: 100%;
      }
    }

    .music-player-control {
      transition: all 1s;
      transform: translate(-40%, 40%);
      position: absolute;
      left: 0;
      bottom: 0;
      -webkit-user-select: none;
      width: 4.5rem;
      height: 4.5rem;
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

      & > .music-circle {
        border-radius: 50%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }

      .music-control-button {
        transition: all 0.5s;
        visibility: hidden;
        opacity: 0;
        width: 0%;
        height: 100%;
        position: absolute;
        z-index: -1;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) rotate(var(--deg));
        .music-cb-body {
          position: absolute;
          top: 50%;
          left: calc(100% + 0.15rem);
          transform: translate(0, -50%);
          .music-cb-item {
            margin: 0.15rem;
            font-size: var(--size) !important;
            width: var(--size);
            height: var(--size);
            transform: rotate(calc(-1 * var(--deg)));
          }
        }
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
  }

  .music-player-word {
    position: fixed;
    bottom: 0;
    left: 50%;
    animation: text 5s linear infinite;
    color: transparent;

    transform: translate(-50%, 0);
    &:hover .music-player-word-sub {
      display: block;
    }
    .music-player-word-sub {
      display: none;
    }
  }
}
</style>
