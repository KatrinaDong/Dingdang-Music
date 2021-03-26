<template>
  <div>
    <!-- 搜索的歌手---->
    <ul class="SingersList" v-if="artistsArr.length > 0">
      <li v-for="(a, index) in artistsArr" :key="index">
        <router-link :to="`/singerdetail/${a.id}`">
          <img :src="a.picUrl+'?imageView=1&type=webp&thumbnail=369x0'" alt="加载中..." />
          <h2>{{ a.name }}</h2>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
// import SongItem from "@/components/SongItem";
// import Loading from "@/components/Loading";
export default {
  name: "SingersType",
  props: ["keywords"],
  components: {
    // SongItem,
    // Loading,
  },
  data() {
    return {
      artistsArr: [],
      //   searchResult: [],
      //   page: 1,
    //   showLoading: true, //是否显示loading组件 -> 一开始进来显示
    };
  },
  created() {
    this.loadSearch();
  },
  methods: {
    loadSearch() {
      //搜索歌手
      this.$http
        .get("/search?keywords=" + this.keywords + "&type=100")
        .then((data) => {
          console.log("歌手的数据==>", data.data.result.artists);
          this.artistsArr = data.data.result.artists;
          for (let i = 0; i < this.artistsArr.length; i++) {
            if (!this.artistsArr[i].picUrl) {
              this.artistsArr[i].picUrl =
                "http://p3.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg?param=130y130";
            }
          }
        });
    }
  },
};
</script>
<style lang="less" scoped>
.SingersList {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding-left: 5px;
  padding-right: 5px;
  justify-content: space-around;
  li {
    width: 30%;
    padding-bottom: 100%;
    padding: 3px;
    
    a { 
        width:100%;
        height:100%;
        display: flex;
        flex-direction: column;
        text-decoration: none;
        color:#5F5F5F;
      img {
        width: 100%;
        flex: 1;
        box-shadow: 0px 0px 5px #6495ed;
        // border:1px solid #6495ED;
        // padding-bottom:100%;
      }
      h2 {
        width: 100%;
        height: 30px;
        line-height: 30px;
        overflow: hidden;
        text-overflow: ellipsis; //用省略号显示
        white-space: nowrap; //不换行
      }
    }
  }
}
</style>