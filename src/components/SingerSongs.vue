<template>
  <!-- 搜索的该歌手的对应的热门歌曲 -->
  <div class="SingerSongs">
      <!-- {{hotSongsList}} -->
    <ul class="hotLists" v-if="hotSongsArr.length>0">
            <li v-for="(h,index) in hotSongsArr" :key="index">
                <SongItem :item="h"></SongItem>
            </li>
    </ul>
  </div>
</template>
<script>
import SongItem from '@/components/SongItem'
export default {
  name: "SingerSongs",
  props: ["singerID"],
  components:{
      SongItem,
  },
  data() {
    return {
      singerName:null,
      hotSongsList: [],
      hotSongsArr: [],
    };
  },
  created() {
    this.$http.get("/artists?id=" + this.singerID).
    then((data) => {
      console.log("获取歌手的部分信息和热门歌曲", data);
      this.singerName = data.data.artist.name;
      // console.log("this.singerMeg",this.singerMeg);
      this.hotSongsList = data.data.hotSongs;
      console.log(this.hotSongsList);
      this.hotSongsList.map((d)=>{
      //     console.log("d==>",d);
          
          d.song={
              artists:[{
                name:this.singerName
                }],
          } 
          // console.log(d.song)
          // console.log("d.song.artists",d.song.artists)
          this.hotSongsArr.push(d);
          console.log(this.hotSongsArr)
      //     return d;
      })

    });
  },
};
</script>
<style scoped lang="less">

</style>