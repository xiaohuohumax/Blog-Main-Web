<template>
  <div class="indexmore">
    <Card class="theme-card-background mb-3">
      <div class="text-center my-3">
        <div class="h5">{{ tool.title }}</div>
        <div class="small my-2">
          {{ tool.subTitle }}
        </div>
        <div class="flex-center">
          <Icon type="md-eye" class="mr-1" /> {{ tool.watch }}
          <Icon type="md-happy" class="ml-2 mr-1" /> {{ tool.nice }}
          <Icon type="md-heart" class="ml-2 mr-1" /> {{ tool.love }}
        </div>
      </div>

      <iframe
        :src="tool.toolUrl"
        frameborder="0"
        id="iframe"
        class="w-100 rounded"
        scrolling="no"
      ></iframe>
      <div class="mb-3">
        <Button type="success" long>
          <Icon type="md-heart" class="ml-2 mr-1" />赞
        </Button>
      </div>
      <div class="mb-3">
        <p>标签(20):</p>
        <div class="mt-2">
          <Tag
            size="medium"
            type="border"
            color="success"
            v-for="(item, index) in tool.tags"
            :key="index"
            >{{ item }}</Tag
          >
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // tool: {},
    };
  },
  async asyncData({ route, $http, redirect }) {
    try {
      return {
        tool: (await $http.toolFindbyid(route.params.id)).data[0],
      };
    } catch (error) {
      redirect("/Error404");
    }
  },
  mounted() {
    this.addListener();
  },
  methods: {
    frameListener(event) {
      var data = event.data;
      if (!data.height) return;
      document.getElementById("iframe").height = data.height;
    },
    addListener() {
      window.addEventListener("message", this.frameListener);
    },
    removeListener() {
      window.removeEventListener("message", this.frameListener);
    },
  },
  beforeDestroy() {
    // this.removeListener();
  },
};
</script>

<style></style>
