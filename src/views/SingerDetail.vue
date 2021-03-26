<template>
    <!-- 当前进入的歌手详情界面 -->
  <div class="singerdetail">
    <!-- 歌手ID:{{singerID}} -->
    <div class="bigImg">
      <img :src="singerMeg.picUrl+'?imageView=1&type=webp&thumbnail=369x0'" alt="" />
      <h2>{{ singerMeg.name }}</h2>
    </div>
    <div class="singerBox">
      <ul class="classify">
        <li :class="{ active: isType == 'SingerSongs' }"
            @click="tab('SingerSongs')"
        >
          热门歌曲
        </li>
        <li
          :class="{ active: isType == 'SingerMeg' }"
          @click="tab('SingerMeg')"
        >
          个人介绍
        </li>
      </ul>
      <component 
        :is="isType"
        :singerID="singerID"
        ></component>
    </div>
  </div>
</template>
<script>
import SingerSongs from '@/components/SingerSongs'
import SingerMeg from '@/components/SingerMeg'
export default {
  data() {
    return {
      singerID: null,
      singerMeg: [], //获取该歌手的个人信息
      isType:'SingerSongs',
    };
  },
  components:{
      SingerSongs,
      SingerMeg
  },
  created() {
    //获取歌手的部分信息和热门歌曲
    this.singerID = this.$route.params.id;
    this.$http.get("/artists?id=" + this.singerID).then((data) => {
      console.log("获取歌手的部分信息和热门歌曲", data);
      this.singerMeg = data.data.artist;
      console.log(this.singerMeg);
      this.hotSongsList = data.data.hotSongs;
    });
  },
  methods:{
      tab(myType){
          this.isType = myType ;
      }
  }
};
</script>
<style lang="less" scoped>
.singerdetail {
  .bigImg {
    width: 100%;
    height: 300px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    box-shadow: 0px 0px 10px #1b64eb;
    overflow: hidden;
    position: relative;
    img {
      width: 100%;
    }
    h2 {
      position: absolute;
      bottom: 10%;
      left: 6%;
      color: #fff;
      font-size: 28px;
      text-shadow: 0px 0px 5px #1b64eb;
      letter-spacing:3px;
    }
  }
  .singerBox{
      .classify{
          display: flex;
          li{
              width:100px;
              height:40px;
              line-height:40px;
              &.active{
                  // background-color: #ddd;
                  // border-bottom:2px solid #6495ED;
                  box-shadow: 1px 1px 3px #6495ED;
              }
          }
      }
  }
}
</style>