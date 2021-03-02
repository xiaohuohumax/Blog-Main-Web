<template>
  <div>
    <router-view></router-view>
    <MusicPlayer
      v-if="$authres(['view_musicplayer'])"
      @randomplaylist="randomPlaylist"
      :playlist="playlist"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      playlist: {},
      create: false, // 创建查询排除
    };
  },
  mounted() {
    this.randomPlaylist(); // 查询歌单
  },
  methods: {
    randomPlaylist() {
      this.$http
        .playListRandomFindOne()
        .then((result) => {
          if (result.flag) {
            this.playlist = result.data;
            this.create
              ? this.$Message.success(`歌单已切换至[${this.playlist.title}]`)
              : "";
          } else {
            this.create ? this.$Message.error("切换失败!") : "";
          }
        })
        .catch((err) => (this.create ? this.$Message.error("切换失败!") : ""))
        .finally(() => (this.create = true));
    },
  },
};
</script>
