<template>
  <div>
    <!-- 最佳匹配 歌手 专辑 歌曲-->
    <ul v-if="resultArr.length > 0">
      <li v-for="(song, index) in searchResult" :key="index">
        <SongItem :item="song" :keywords="keywords"></SongItem>
      </li>
    </ul>
    <Loading v-if="showLoading"></Loading>
    <p class="loadmore" @click="loadMore">加载更多...</p>
  </div>
</template>
<script>
import SongItem from "@/components/SongItem";
import Loading from "@/components/Loading";
export default {
  name: "SongsType",
  props: ["keywords"],
  components: {
    SongItem,
    Loading,
  },
  data() {
    return {
      resultArr: [],
      searchResult: [],
      page: 1,
      showLoading: true, //是否显示loading组件 -> 一开始进来显示
    };
  },
  created() {
    this.loadSearch();
  },
  methods: {
    loadSearch() {
      //?keywords=海阔天空&limit=30&offset=60
      //limit 每页显示多少条 offset 偏移量(page-1)*30
      //根据关键字获取搜索结果
      let offset = (this.page - 1) * 30;
      //搜索歌曲信息
      this.$http
        .get("/search?keywords=" + this.keywords + "&type=1&offset=" + offset)
        .then((data) => {
          // console.log(data);
          this.resultArr = this.resultArr.concat(data.data.result.songs);
          // console.log('this.resultArr----',this.resultArr)
          // 加载完结果则不显示加载Loading组件
          this.showLoading = false;
          // console.log("data======>",data);
          let ids = data.data.result.songs.map((d) => {
            return d.id;
          });
          console.log("ids===>", ids);
          return ids.join(",");
        })
        .then((ids) => {
          //获取歌曲详情
          this.$http
            .get("http://music.kele8.cn/song/detail?ids=" + ids)
            .then((songData) => {
              // console.log("songData",songData);
              this.isLoading = false;
              songData.data.songs.map((dd) => {
                //处理数据和SongItem不一致 转换数据
                dd.song = {
                  artists: dd.ar,
                };
                dd.picUrl = dd.al.picUrl;
                // console.log("dd--->",dd)
                // console.log('d.picUrl==>',d.picUrl)
                this.searchResult.push(dd); //push 加入数组
                // console.log(this.searchResult)
                return dd;
              });

              //this.hotSong = songDat;//直接赋值
            });
        });
    },
    loadMore() {
      this.page++;
      this.showLoading = true;
      this.loadSearch();
    },
  },
};
</script>