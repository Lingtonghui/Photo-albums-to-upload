<template>
  <div>
    <div>
      <img :src="photoInfo.imgUrl" alt="" />
      <p>
        {{ photoInfo.name }}
      </p>
    </div>

    <div>
      <button @click="back">back</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id"],
  methods: {
    back() {
      this.$router.back();
    }
  },
  computed: {
    photoInfo() {
      // 没有值的话，你可以单独的去请求后端接口
      // 找到对应的 item 显示
      return this.$store.state.photos.find(item => item.id === this.id);
    }
  }
};
</script>

<style></style>
