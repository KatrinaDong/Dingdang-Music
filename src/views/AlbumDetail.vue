<template>
  <div class="albumdetail">
    <!-- 专辑ID:{{ albumID }} -->
    <!-- 推荐歌单点击进去后的列表界面 -->
    <div class="listTitle" v-if="albumMeg">
      <img class="bigImg" :src="albumMeg.blurPicUrl+'?imageView=1&type=webp&thumbnail=369x0'" />
    <img class="smallImg" :src="albumMeg.blurPicUrl+'?imageView=1&type=webp&thumbnail=369x0'" />
      <h2 class="listName">{{ albumMeg.name }}</h2>
      <img class="creatorImg" :src="creatorImg" />
      <span class="creatorName">{{ creatorName }}</span>
      <!-- <span class="company">发行公司：{{ albumMeg.company }}</span> -->
    </div>
    <!-- <div>歌单信息{{listID}}</div> -->
    <div class="listSong">
      <ul v-if="albumSongs.length > 0">
        <li v-for="al in albumSongs" :key="al.id">
          <SongItem :item="al"></SongItem>
        </li>
      </ul>
    </div>
    <!-- 评论 -->
    <!-- <div class="commentBox">
      <h2>最新评论({{ commentNum }})</h2>
      <ul>
        <li v-for="(c, index) in commentList" :key="index">
          <img class="commentorImg" :src="c.commentorImg" />
          <div class="comment">
            <h2 class="commentor">
              {{ c.commentorName }}
              <span class="likedCount">{{
                c.likedCount ? c.likedCount : ""
              }}</span>
              <img
                @click="changeLike(index)"
                class="likeIcon"
                :src="
                  c.liked
                    ? require('../assets/Key Likes.svg')
                    : require('../assets/like.svg')
                "
              />
            </h2> -->
    <!-- <span class="commentTime">{{ c.time | formatTime }}</span>
            <p v-show="!c.isReply" class="content">{{ c.content }}</p>
            <div class="replybox" v-show="c.isReply">
              <ul>
                <li v-for="(r, i) in c.beReplied" :key="i">
                  <p class="replycon">
                    回复<span>@{{ r.user.nickname }}</span
                    >:{{ c.content }}
                  </p>
                  <p class="replyWhich">
                    @{{ r.user.nickname }}:{{ r.content }}
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
      <div class="spaceBox" v-show="$root.musicStore.musicID"></div>
    </div>
  </div> -->
  </div>
</template>
<script>
import SongItem from "@/components/SongItem";
export default {
  name: "albumdetail",
  data() {
    return {
      albumID: null,
      albumSongs: [],
      albumMeg: [], //获取该歌手的个人信息
      creatorImg: null,
      creatorName: null,
    };
  },
  components: {
    SongItem,
  },
  created() {
    //获取歌手的部分信息和热门歌曲
    this.albumID = this.$route.params.id;
    this.$http.get("/album?id=" + this.albumID).then((data) => {
      console.log("获取专辑的信息", data.data);
      //   关于专辑
      this.albumMeg = data.data.album;
      this.creatorImg = this.albumMeg.artist.picUrl;
      this.creatorName = this.albumMeg.artist.name;
      //关于专辑相关歌曲
      this.albumSongs = data.data.songs;
      console.log("this.albumSongs", this.albumSongs);
      data.data.songs.map((d)=>{
          d.song={
              artists:[{
                name:this.creatorName
                }],
          } 
      })
    });
  },
};
</script>
<style lang="less" scoped>
.albumdetail {
  position: relative;
  .listTitle {
    width: 100%;
    height: 180px;
    display: flex;
    position: relative;
    .bigImg {
      width: 100%;
      height: 180px;
      filter: blur(20px);
    }
    &::after {
      content: "";
      display: block;
      background-color: rgba(0, 0, 0, 0.25);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 180px;
      z-index: 1;
    }
    .smallImg {
      width: 110px;
      height: 110px;

      position: absolute;
      top: 28px;
      left: 28px;
      box-shadow: -3px -3px 5px #6495ed;
      z-index:4;
    }
    .listName {
      position: absolute;
      top: 40px;
      color: #fff;
      text-shadow: 0px 0px 3px #6495ED;
      left: 170px;
      width: 180px;
      z-index: 2;
      font-size: 20px;
      letter-spacing:5px;
    }
    .creatorImg {
      position: absolute;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      top: 80px;
      left: 170px;
      z-index: 2;
    }
    .creatorName {
      color: #cdc1c4;
      z-index: 2;
      position: absolute;
      top: 92px;
      left: 205px;
      width: 120px;
      overflow: hidden;
      text-overflow: ellipsis; //用省略号显示
      white-space: nowrap; //不换行
      font-size: 16px;
    }
    .company {
      color: #cdc1c4;
      position: absolute;
      top: 110px;
      left: 170px;
      font-size: 12px;
      z-index: 2;
      display: block;
      width: 200px;
      text-align: center;
    }
  }
  .listSong{
        box-shadow: 0px 0px 10px #6495ED;
        position:absolute;
        width:100%;
        height:586px;
        overflow-y:auto;
        background-color: #fff;
        top:150px;
        border-top-left-radius: 40px;
        border-top-right-radius: 40px;
        // overflow-y:scroll;
        padding-top:15px;
        z-index:2;
    
        .loadingmore{
            height:36px;
            line-height:36px;
            background: bisque;
        }

    }
}
</style>