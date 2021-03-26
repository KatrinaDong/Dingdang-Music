<template>
  <div id="app">
    <TopNav></TopNav>
    <div
      :style="{
        paddingTop: $route.meta.showNav ? '90px' : '',
      }"
    ></div>
    <Play></Play>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
     <router-view v-if="!$route.meta.keepAlive"></router-view>
    <div
      :style="{
        paddingBottom: $root.musicStore.musicID ? '60px' : '',
      }"
    ></div>
  </div>
</template>
<script>
import TopNav from "@/components/TopNav";
import Play from "@/components/Play";
export default {
  name: "App",
  data() {
    return {
      // musicID:null
    };
  },
  methods: {
    // play(musicID){
    //   this.musicID = musicID ;
    // }
  },
  created() {
    console.log("123");
  },
  components: {
    TopNav,
    Play,
  },
};
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
