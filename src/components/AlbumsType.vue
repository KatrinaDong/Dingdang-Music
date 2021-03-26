<template>
  <div>
    <!-- 最佳匹配 歌手 专辑 歌曲-->
    <ul class="albumsList" v-if="albumsArr.length > 0">
      <li v-for="(item, index) in albumsArr" :key="index">
        <router-link :to="`/albumdetail/${item.id}`">
          <div class="imgBox">
            <img :src="item.picUrl+'?imageView=1&type=webp&thumbnail=369x0'" alt="加载中..." />
          </div>
          <h2>{{ item.name }}</h2>
          <span class="albumArtist">{{ item.artist.name }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "AlbumsType",
  props: ["keywords"],

  data() {
    return {
      albumsArr: [],
    };
  },
  created() {
    this.loadSearch();
  },
  methods: {
    loadSearch() {
      //搜索歌手
      // this.$http
      //   .get("/search?keywords=" + this.keywords + "&type=100")
      //   .then((data) => {
      //     console.log("歌手的数据==>", data.data.result.artists);
      //     this.artistsArr = data.data.result.artists;
      //     for (let i = 0; i < this.artistsArr.length; i++) {
      //       if (!this.artistsArr[i].picUrl) {
      //         this.artistsArr[i].picUrl =
      //           "http://p3.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg?param=130y130";
      //       }
      //     }
      //   });

      // },
      //搜索专辑
      this.$http
        .get("/search?keywords=" + this.keywords + "&type=10")
        .then((data) => {
          console.log("专辑的数据==>", data);
          this.albumsArr = data.data.result.albums;
          // this.resultArr = this.resultArr.concat(data.data.resultArr.songs);
        });
    },
  },
};
</script>
<style lang="less" scoped>
.albumsList {
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
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      text-decoration: none;
      color: #5f5f5f;
      .imgBox{
        width:103.5px;
        height:103.5px;
        box-shadow: -4px -4px 2px #b5cdf8;
        img {
          width: 100%;
          height: 100%;
          overflow: hidden;
        // border:1px solid #6495ED;
        // padding-bottom:100%;
        }
      }
      
      h2 {
        width: 100%;
        height: 25px;
        line-height: 25px;
        overflow: hidden;
        text-overflow: ellipsis; //用省略号显示
        white-space: nowrap; //不换行
      }
      .albumArtist {
        height: 20px;
        display: block;
        color: #ccc;
        font-size: 12px;
        line-height: 20px;
      }
    }
  }
}
</style>