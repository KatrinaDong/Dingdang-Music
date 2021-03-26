<template>
  <!-- 推荐歌单点击进去后的列表界面 -->
  <div class="listMeg">
    <div class="listTitle">
      <img
        class="bigImg"
        :src="listImg + '?imageView=1&type=webp&thumbnail=369x0'"
      />
      <div class="smallBox">
        <img
          class="smallImg"
          :src="listImg + '?imageView=1&type=webp&thumbnail=369x0'"
        />
        <i>歌单</i>
      </div>
      <h2 class="listName">{{ listName }}</h2>
      <img class="creatorImg" :src="creatorImg" />
      <span class="creatorName">{{ creatorName }}</span>
    </div>
    <!-- <div>歌单信息{{listID}}</div> -->
    <div class="listSong">
      <h2>歌曲列表</h2>
      <ul v-if="listSong.length > 0">
        <li v-for="(l, index) in listSong" :key="l.id">
          <SongItem :item="l">{{ index + 1 }}</SongItem>
        </li>
      </ul>
      <Loading v-if="isLoading"></Loading>
      <div v-if="listSong.length > 0" class="loadingmore" @click="moreMusic">
        {{ loadText }}
      </div>
    </div>
    <!-- 评论 -->
    <div class="commentBox">
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
            </h2>
            <!-- {{c.time | formatTime}} -->
            <span class="commentTime">{{ c.time | formatTime }}</span>
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
  </div>
</template>
<script>
import SongItem from "@/components/SongItem";
import Loading from "@/components/Loading";
export default {
  data() {
    return {
      listID: null,
      listImg: null, // 歌单的图片
      listName: null, //歌单标题
      creatorImg: null, //歌单的作者头像
      creatorName: null, //歌单的作者名
      listSong: [], //显示的歌单歌曲
      allSongs: [], //该歌单总全部歌曲

      isLoading: true, //是否在加载
      page: 1, //记载页码
      loadText: "加载更多", //加载按钮的文本显示

      commentList: [], //评论列表
      commentNum: 0, //评论总数量
    };
  },
  components: {
    SongItem,
    Loading,
  },
  created() {
    //获取当前进入的歌单信息ID
    this.listID = this.$route.params.id;

    this.loadMusic();
    //获取歌单评论
    this.$http.get("/comment/playlist?id=" + this.listID).then((data) => {
      console.log("歌单评论===>", data);
      this.commentNum = data.data.comments.length;
      data.data.comments.map((d) => {
        // console.log("d====>",d);
        d.commentorImg = d.user.avatarUrl;
        d.commentorName = d.user.nickname;
        // console.log(d.time);
        if (d.beReplied.length > 0) {
          d.isReply = true;
        } else {
          d.isReply = false;
        }
        this.commentList.push(d);
        // console.log("---",this.commentList)
        return d;
      });
    });
  },
  filters: {
    // 评论时间
    formatTime(uTime) {
      //当前时间
      let nowDate = new Date();
      let nowMinutes = nowDate.getMinutes(); //分
      let nowHours = nowDate.getHours(); //时
      let nowDays = nowDate.getDate(); //日
      let nowMonths = nowDate.getMonth() + 1; //月
      let nowYears = nowDate.getFullYear(); //年

      //需转化的时间对象
      let formatDate = new Date(uTime);
      let minutes = formatDate.getMinutes(); //分
      let minutesShow = ("0" + minutes).substr(-2);
      // console.log(minutes);
      let hours = formatDate.getHours(); //时
      let hoursShow = ("0" + hours).substr(-2);
      let days = formatDate.getDate(); //日
      let months = formatDate.getMonth() + 1; //月
      let years = formatDate.getFullYear(); //年

      //进行比较
      //年
      if (years <= nowYears) {
        if (years == nowYears) {
          //月
          if (months == nowMonths) {
            //日
            if (days == nowDays) {
              //一天以内
              //比较时
              if (hours == nowHours) {
                //一小时以内
                if (minutes == nowMinutes) {
                  return "1分钟前";
                } else if (minutes < nowMinutes) {
                  return nowMinutes - minutes + "分钟前";
                } else {
                  return false;
                }
              } else if (hours < nowHours) {
                //少的时间在一个小时以内
                if ((nowHours - hours) * 60 - minutes + nowMinutes < 60) {
                  return (
                    (nowHours - hours) * 60 - minutes + nowMinutes + "分钟前"
                  );
                } else {
                  return hoursShow + ":" + minutesShow;
                }
              } else {
                return false;
              }
            } else if (days < nowDays) {
              //少的时间在一天内即昨天的数据
              if (nowDays - days == 1) {
                return "昨天" + hoursShow + ":" + minutesShow;
              } else {
                return months + "月" + days + "日";
              }
            } else {
              return false;
            }
          } else if (months < nowMonths) {
            return months + "月" + days + "日";
          } else {
            return false;
          }
        } else {
          //不是今年  直接返回xxxx年xx月xx日
          return years + "年" + months + "月" + days + "日";
        }
      } else {
        return false;
      }
    },
  },
  methods: {
    // judgeReply(){
    //     if(this.replyLength == 0){
    //         this.isReply = false ;
    //     }else{
    //         this.isReply = true ;
    //     }
    // },
    changeLike(i) {
      // this.commentList[i]isLike = !this.isLike ;
      // console.log(i);
      this.commentList[i].liked = !this.commentList[i].liked;
      if (this.commentList[i].liked) {
        this.commentList[i].likedCount++;
        // console.log()
      } else {
        this.commentList[i].likedCount--;
      }
    },
    loadMusic() {
      //获取歌单详情
      this.$http
        .get("/playlist/detail?id=" + this.listID)
        .then((data) => {
          console.log("歌单详情==>", data);
          this.listImg = data.data.playlist.coverImgUrl;
          this.listName = data.data.playlist.name;
          this.creatorName = data.data.playlist.creator.nickname;
          this.creatorImg = data.data.playlist.creator.avatarUrl;

          //记录该歌单的总歌曲
          this.allSongs = data.data.playlist.trackIds;
          // console.log("总===>",this.allSongs);

          //加载10条歌曲
          let trackIDs = data.data.playlist.trackIds.slice(
            (this.page - 1) * 10,
            10 * this.page
          );
          // console.log("trackIDs",trackIDs);
          let ids = trackIDs.map((d) => {
            return d.id;
          });
          return ids.join(",");
        })
        .then((ids) => {
          //获取歌曲详情
          this.$http
            .get("http://music.kele8.cn/song/detail?ids=" + ids)
            .then((songData) => {
              this.isLoading = false;
              console.log("---songData.data.songs", songData.data.songs);
              songData.data.songs.map((d) => {
                console.log("歌曲详情d=>", d);
                //处理数据和SongItem不一致 转换数据
                d.song = {
                  artists: d.ar,
                };
                d.picUrl = d.al.picUrl;
                this.listSong.push(d); //push加入数组
                return d;
              });
            });
        });
      // console.log("this.listSong",this.listSong);
    },
    moreMusic() {
      // //加载更多
      this.page++;
      //加载总页数
      let allPage = 0;
      if (this.allSongs.length % 10 == 0) {
        allPage = this.allSongs.length / 10;
      } else {
        allPage = parseInt(this.allSongs.length / 10) + 1;
      }
      console.log("allPage", allPage);
      if (this.page > allPage) {
        this.loadText = "没有更多了哦~~";
        return false;
      }
      this.isloading = true;
      this.loadMusic();
    },
  },
};
</script>
<style lang="less" scoped>
.listMeg {
  position: relative;
  .listTitle {
    width: 100%;
    height: 180px;
    overflow: hidden;
    display: flex;
    position: relative;
    .bigImg {
      width: 160%;
      height: 150%;
      position: absolute;
      top:-10px;
      left:-10px;
      filter: blur(10px);
    }
    &::after {
      content: "";
      display: block;
      background-color: rgba(0, 0, 0, 0.3);
      position: absolute;
      top: -10px;
      left: -10px;
      width: 150%;
      height: 200px;
      z-index: 1;
    }
    .smallBox {
        width: 100px;
        height: 100px;
        position: absolute;
        top: 25px;
        left: 25px;
        z-index:4;
        .smallImg {
            width: 100%;
            height: 100%;
        }
        i{
            display: block;
            width:40px;
            height:17px;
            line-height:17px;
            background-color: #6495ED;
            color:#fff;
            font-size:12px;
            position: absolute;
            font-style:normal;
            top:10px;
            left:0px;
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
            
        }
      
      
    }

    .listName {
      position: absolute;
      top: 30px;
      color: #fff;
      left: 160px;
      width: 180px;
      z-index: 2;
    }
    .creatorImg {
      position: absolute;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      top: 88px;
      left: 160px;
      z-index: 2;
    }
    .creatorName {
      color: #cdc1c4;
      z-index: 2;
      position: absolute;
      top: 88px;
      left: 190px;
      width: 120px;
      overflow: hidden;
      text-overflow: ellipsis; //用省略号显示
      white-space: nowrap; //不换行
      font-size: 14px;
      padding-top: 5px;
    }
  }
  .listSong {
    // box-shadow: 0px 0px 10px #6495ED;
    h2 {
      margin: 0;
      height: 24px;
      line-height: 24px;
      text-align: left;
      padding-left: 10px;
      width: 100%;
      background-color: #eeeff0;
      color: #666666;
      font-size: 12px;
    }
    position: absolute;
    width: 100%;
    height: 586px;
    overflow-y: auto;
    background-color: #fff;
    top: 150px;
    // border-top-left-radius: 40px;
    // border-top-right-radius: 40px;
    // overflow-y:scroll;
    // padding-top:15px;
    z-index: 2;
    ul {
      li {
        &:first-of-type,
        &:nth-of-type(2),
        &:nth-of-type(3) {
          color: cornflowerblue;
          font-weight: bold;
        }
      }
    }

    .loadingmore {
      height: 36px;
      line-height: 36px;
      // background: #7AA5F7;
      color:#7AA5F7;
      border-bottom:1px solid #7AA5F7;
    }
  }
  .commentBox {
    position: absolute;
    top: 751px;
    width: 100%;
    height: 300px;
    
    h2 {
      // text-align:left;
    }
    ul {
      li {
        display: flex;
        .commentorImg {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin: 10px;
        }
        .comment {
          flex: 1;
          display: flex;
          flex-direction: column;
          .commentor {
            text-align: left;
            font-size: 14px;
            padding-top: 10px;
            position: relative;
            .likedCount {
              color: #58b3ff;
              font-size: 14px;
              // background-color: red;
              position: absolute;
              right: 45px;
            }
            .likeIcon {
              width: 16px;
              height: 16px;
              position: absolute;
              right: 20px;
              top: 10px;
            }
          }
          .commentTime {
            color: #ccc;
            font-size: 12px;
            text-align: left;
          }
          .content {
            font-size: 15px;
            text-align: left;
            margin-top: 10px;
            padding-bottom: 10px;
            border-bottom: 1px solid #ebe9e9;
            padding-right: 30px;
          }
          .replybox {
            ul {
              li {
                display: flex;
                flex-direction: column;
                border-bottom: 1px solid #eee;
                .replycon {
                  text-align: left;
                  margin-top: 5px;
                  margin-bottom: 6px;
                  margin-right: 40px;
                  span {
                    color: cornflowerblue;
                  }
                }
                .replyWhich {
                  padding: 8px;
                  text-align: left;
                  border: 1px solid #ddd;
                  color: #888888;
                  font-size: 14px;
                  margin-right: 30px;
                  margin-bottom: 10px;
                }
              }
            }
          }
        }
      }
    }
    .spaceBox {
      height: 65px;
      width: 100%;
      // background-color: red;
    }
  }
}
</style>