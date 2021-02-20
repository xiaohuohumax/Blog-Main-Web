<template>
  <div class="theme-card-background footer px-5 py-3 text-center mt-3 bg-white">
    {{ webSet.copyRight }}
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("webSet", ["webSet"]),
  },
};
</script>
