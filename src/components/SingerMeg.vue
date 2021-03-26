<template>
  <!-- 搜索的该歌手的对应的热门歌曲 -->
  <div class="megBox">
      <span></span>{{singerMeg.briefDesc}}
    <!-- <SongItem></SongItem> -->
  </div>
</template>
<script>
export default {
  name: "SingerMeg",
  props: ["singerID"],
  data() {
    return {
      singerMeg: [], //获取该歌手的个人信息
    };
  },
  created() {
    this.$http.get("/artists?id=" + this.singerID).then((data) => {
    //   console.log("获取歌手的部分信息和热门歌曲", data);
      this.singerMeg = data.data.artist;
      console.log(this.singerMeg);
    });
  },
};
</script>
<style lang="less" scoped>
  .megBox{
    padding:20px;
    span{
      padding-left: 2em;
    }
  }
</style>