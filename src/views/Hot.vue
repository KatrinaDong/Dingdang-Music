<template>
  <!-- 热歌榜界面 --导航栏-->
  <div>
    <div v-if="playList" class="banner">
      <h2>热歌榜</h2>
      <i>更新日期：{{ playList.updateTime | formatDate }}</i>
    </div>
    <ul class="newsong" v-if="hotSong.length > 0">
      <li class="newLi" v-for="(s, index) in hotSong" :key="s.id">
        <SongItem :item="s">{{ index + 1 }}</SongItem>
      </li>
    </ul>
    <Loading v-if="isLoading"></Loading>
    <div class="loadingmore" v-if="hotSong.length > 0" @click="loadMore">{{ loadText }}</div>
  </div>
</template>
<script>
import SongItem from "@/components/SongItem";
import Loading from "@/components/Loading";
export default {
  name: "Hot",
  data() {
    return {
      //热歌榜列表
      playList: null,
      page: 1,
      isLoading: true,
      loadText: "加载更多", //加载按钮的文本显示
      hotSong: [], //显示的歌单歌曲
      allSongs: [], //该歌单总全部歌曲
    };
  },
  created() {
    this.loadMusic();
  },
  methods: {
    loadMusic() {
      //获取热歌榜歌单列表详情（通过网易云官网获取热歌榜id）
      this.$http
        .get("/playlist/detail?id=3778678")
        .then((data) => {
          console.log("热歌榜...", data);
          //把tracksID变成字符串
          //记录该歌单的总歌曲
          this.allSongs = data.data.playlist.trackIds;
          let tracksIDS = data.data.playlist.trackIds.slice(
            (this.page - 1) * 20,
            20 * this.page
          );
          this.playList = data.data.playlist;
          console.log("this.playList", this.playList);
          let ids = tracksIDS.map((d) => {
            return d.id;
          });
          return ids.join(",");
        })
        .then((ids) => {
          //获取歌曲详情
          this.$http
            .get("http://music.kele8.cn/song/detail?ids=" + ids)
            .then((songData) => {
              console.log("songData", songData);
              this.isLoading = false;
              songData.data.songs.map((d) => {
                //处理数据和SongItem不一致 转换数据
                d.song = {
                  artists: d.ar,
                };
                d.picUrl = d.al.picUrl;
                this.hotSong.push(d); //push加入数组

                return d;
              });
              //this.hotSong = songDat;//直接赋值
            });
        });
    },
    loadMore() {
      //加载更多
      this.page++;
      //加载总页数
      let allPage = 0;
      if (this.allSongs.length % 10 == 0) {
        allPage = this.allSongs.length / 20;
      } else {
        allPage = parseInt(this.allSongs.length / 20) + 1;
      }
      console.log("allPage", allPage);
      console.log("this.page",this.page)
      if (this.page > allPage) {
        this.loadText = "没有更多了哦~~";
        return false;
      }
      this.isLoading = true;
      this.loadMusic();
    },
  },
  components: {
    SongItem,
    Loading,
  },
  filters: {
    formatDate(val) {
      let date = new Date(val);
      return date.getMonth() + 1 + "月" + date.getDate() + "日";
    },
  },
};
</script>
<style lang="less" scoped>
.loadingmore {
  background-color: bisque;
  text-align: center;
}
.banner {
  height: 150px;
  background-color: #fa85ad7a;
  h2 {
    height: 110px;
    font-size: 40px;
    font-family: round;
    text-shadow: 2px 2px 5px #fff;
    // text-align:left;
    padding: 10px;
    line-height: 110px;
    font-style: italic;
  }
  i {
    font-size: 12px;
    color: #fff;
    font-style: normal;
  }
}
.newsong {
  .newLi {
    &:first-of-type,
    &:nth-of-type(2),
    &:nth-of-type(3) {
      color: cornflowerblue;
      font-weight: bold;
    }
  }
}
</style>