<template>
  <div class="app">
    <Header />
    <Banner />

    <Body />
    <Footer />
    <Tools />
    <MusicPlayer @randomplaylist="randomPlaylist" :playlist="playlist" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      playlist: {},
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
            this.$Message.success(`歌单已切换至[${this.playlist.title}]`);
          } else {
            this.$Message.error("切换失败!");
          }
        })
        .catch((err) => this.$Message.error("切换失败!"));
    },
  },
};
</script>

<style lang="less">
.app {
  min-height: 100vh;
}
</style>
