<template>
  <transition enter-active-class="animate__animated animate__bounceInLeft">
    <!-- 一开始没有音乐时，不显示audio -->
    <div class="player" v-if="$root.musicStore.musicID">
      <!-- timeupdate音频播放事件 -->
      <audio
        :src="`https://music.163.com/song/media/outer/url?id=${$root.musicStore.musicID}.mp3 `"
        autoplay
        @timeupdate="timeUpdate"
        @pause="pause"
        @play="play"
        ref="audio"
      ></audio>
      <!-- <ul>
                <li v-for="m in $root.musicStore.musicList" :key="m.id"
                :style="{color:m.id == $root.musicStore.musicID? 'red':''}">
                    {{m.name}}
                </li>
            </ul> -->
      <!-- 删除audio里的controls属性 自定义样式 -->
      <div class="playBar">
        <i ref="randImg"
          ><img
            :src="
              $root.musicStore.currentMusic.picUrl +
              '?imageView=1&type=webp&thumbnail=369x0'
            "
        /></i>
        <i @click="isFullPage = true">{{
          $root.musicStore.currentMusic.name
        }}</i>
        <i @click="changePlay">
          <canvas height="50" width="50" ref="processBtn"></canvas>
          <img
            class="btn"
            :src="
              $root.musicStore.isPlay
                ? require('../assets/pause-fill.svg')
                : require('../assets/play-fill.svg')
            "
          />
        </i>
      </div>
      <!-- 音乐播放全屏界面 -->
      <div class="fullPage" v-show="isFullPage">
        <!-- 返回键 -->
        <p @click="isFullPage = false">
          <img src="../assets/arrow-left-circle-fill.svg" />
        </p>
        <h2 class="playTitle">{{ $root.musicStore.currentMusic.name }}</h2>
        <div ref="songImg" class="songImg">
          <img
            :src="
              $root.musicStore.currentMusic.picUrl +
              '?imageView=1&type=webp&thumbnail=369x0'
            "
          />
        </div>
        <div class="noLyric" v-if="lyric == null" @timeupdate="timeUpdate">
          纯音乐,请欣赏
        </div>
        <div class="lyric" v-if="lyric != null" @timeupdate="timeUpdate">
          <ul
            :style="{
              transform: `translateY(-${moveTop}px)`,
            }"
          >
            <li
              ref="lyricLis"
              v-for="(l, index) in lyric"
              :key="index"
              :class="{ active: curIndex == index }"
            >
              {{ l.lyric }}
            </li>
          </ul>
        </div>
        <div class="process">
          <!-- 进度条 -->
          <div class="processBar">
            <i class="cTime">{{ mTime }}:{{ sTime }}</i>
            <input
              type="range"
              min="0"
              :max="duration"
              :value="currentTime"
              @change="changeTime"
            />
            <i
              class="brightBar"
              :style="{
                width: `${(currentTime / duration) * 70}vw`,
              }"
            ></i>
            <i class="dTime">{{ alMtime }}:{{ alStime }}</i>
          </div>
        </div>
        <!-- 控制条 -->
        <div class="controlBar">
          <button class="typeBtn" @click="changeType">
            <img
              :src="
                playOrder == 'order'
                  ? require('../assets/arrow-repeat.svg')
                  : require('../assets/shuffle.svg')
              "
            />
          </button>
          <button class="prevBtn" @click="prevSong"><i></i></button>
          <button class="changeBtn" @click="changePlay">
            <!-- {{$root.musicStore.isPlay?'播放':'暂停'}} -->
            <img
              :src="
                $root.musicStore.isPlay
                  ? require('../assets/pause-fill.svg')
                  : require('../assets/play-fill.svg')
              "
            />
          </button>
          <button class="nextBtn" @click="nextSong"><i></i></button>
          <button
            class="showBtn"
            @click="showPlayList = !showPlayList"
          ></button>
        </div>
        <!-- 播放列表 -->
        <transition
          enter-active-class="animate__animated animate__fadeInUp"
          leave-active-class="animate__animated animate__fadeOutDown"
        >
          <div class="playList" v-show="showPlayList">
            <span class="listTitle">播放列表</span>
            <ul>
              <li
                v-for="v in $root.musicStore.musicList"
                :key="v.id"
                ref="lyricLi"
                :style="{
                  color: v.id == $root.musicStore.musicID ? '#6495ED' : '',
                }"
              >
                <span class="musicName" @click="playMusic(v)">
                  {{ v.name }}</span
                >
                <span class="delBtn" @click="delSong(v.id)"></span>
              </li>
            </ul>
            <!-- <i @click="showPlayList = !showPlayList">×</i> -->
          </div>
        </transition>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "Play",
  // props:['musicID'],
  data() {
    return {
      // isPlay:true ,
      isFullPage: false,
      duration: 0, //总时长
      currentTime: 0, //当前播放时间
      showPlayList: false,
      lyric: null,
      //随机模式
      playOrder: "order", //'random',
      //记录当前歌词播放的位置下标
      curIndex: 0, //记录当前歌词播放的位置下标
      moveTop: 0,

      mTime: 0, //当前播放时间的分
      sTime: 0, //当前播放时间的秒

      alMtime: 0, // 总时长的分
      alStime: 0, // 总时长的秒
    };
  },
  methods: {
    delSong(id) {
      for (let i = 0; i < this.$root.musicStore.musicList.length; i++) {
        if (id == this.$root.musicStore.musicList[i].id) {
          this.$root.musicStore.musicList.splice(i, 1);
        }
      }
    },
    changeType() {
      if (this.playOrder == "order") {
        this.playOrder = "random";
      } else {
        this.playOrder = "order";
      }
    },
    pause(event) {
      //暂停事件
      this.$root.musicStore.isPlay = true;
      this.changePlay(); //改变状态及动画
      this.timeUpdate(event); //改变canvas里面的播放暂停状态
    },
    play(event) {
      //播放事件
      this.$root.musicStore.isPlay = false;
      this.changePlay();
      this.timeUpdate(event);
    },
    playMusic(item) {
      this.$root.musicStore.musicID = item.id;
      this.$root.musicStore.currentMusic = item;
    },
    changeSong() {
      //顺序播放 随机播放 单曲循环...
      //找到上一曲的ID信息 改变哪些东西
      let currentIndex = 0;
      let musicList = this.$root.musicStore.musicList;
      console.log("musicList", musicList);
      //随机播放
      if (this.playOrder == "random") {
        return parseInt(musicList.length * Math.random());
      }
      for (let i in musicList) {
        //循环所有播放列表 找到当前播放音乐的下标
        console.log("i-----", i);
        if (musicList[i].id === this.$root.musicStore.musicID) {
          currentIndex = i;
          break;
        }
      }
      return currentIndex;
    },

    prevSong() {
      //上一曲
      // console.log(this.$root.musicStore.musicList);
      let currentIndex = this.changeSong();
      let musicList = this.$root.musicStore.musicList;
      currentIndex--; //找到上一曲
      if (currentIndex < 0) {
        //如果上一曲下标为负数 上一曲就是最后一曲
        currentIndex = musicList.length - 1;
      }
      //改变当前播放音乐的信息
      this.$root.musicStore.musicID = musicList[currentIndex].id; //改变播放ID
      this.$root.musicStore.currentMusic = musicList[currentIndex]; //改变当前播放音乐的信息
    },
    nextSong() {
      //下一曲
      let currentIndex = this.changeSong();
      let musicList = this.$root.musicStore.musicList;
      currentIndex++;
      if (currentIndex >= musicList.length - 1) {
        //如果下一曲大于等于整个列表长度 回到第一曲
        currentIndex = 0;
      }
      //改变当前播放音乐的信息
      this.$root.musicStore.musicID = musicList[currentIndex].id; //改变播放ID
      this.$root.musicStore.currentMusic = musicList[currentIndex]; //改变当前播放音乐的信息
    },
    changeTime(event) {
      // console.log(event.target.value)
      let time = event.target.value;
      this.currentTime = time;
      this.$refs.audio.currentTime = time;
    },
    changePlay() {
      let audio = this.$refs.audio;
      let randImg = this.$refs.randImg;
      let songImg = null;
      //判断只有全屏的时候才有图片旋转
      // if(this.isFullPage){
      songImg = this.$refs.songImg;
      // }
      //console.log(randImg.style);
      if (this.$root.musicStore.isPlay) {
        audio.pause();
        this.$root.musicStore.isPlay = false;
        // console.log(randImg);
        //当前音乐的图片停止旋转
        randImg.style.animationPlayState = "paused";
        songImg.style.animationPlayState = "paused";
        if (this.isFullPage) songImg.style.animationPlayState = "paused";
      } else {
        audio.play();
        this.$root.musicStore.isPlay = true;
        // 当前音乐的图片继续旋转
        randImg.style.animationPlayState = "running";
        songImg.style.animationPlayState = "running";
        if (this.isFullPage) songImg.style.animationPlayState = "running";
      }
    },

    timeUpdate(event) {
      // console.log(event.target);
      let audio = event.target; //获取audio元素
      let currentTime = audio.currentTime; //当前播放时间
      // console.log('当前播放时间===>',this.currentTime);
      let duration = audio.duration; //获取音频的总时长
      // console.log("当前播放时间=>",currentTime);
      // console.log("当前播放时间=>",duration);
      this.duration = duration;
      this.currentTime = currentTime;
      this.drawCircle(currentTime, duration);

      //当前播放时间的格式显示 分:秒
      this.mTime = parseInt(this.currentTime / 60);
      this.sTime = parseInt(this.currentTime - this.mTime * 60);
      this.mTime = this.mTime < 10 ? "0" + this.mTime : this.mTime;
      this.sTime = this.sTime < 10 ? "0" + this.sTime : this.sTime;
      // console.log('mTime',this.mTime);
      // console.log('sTime',this.sTime);alMtime

      //总时长时间的格式显示 分:秒
      this.alMtime = parseInt(this.duration / 60);
      this.alStime = parseInt(this.duration - this.alMtime * 60);
      this.alMtime = this.alMtime < 10 ? "0" + this.alMtime : this.alMtime;
      this.alStime = this.alStime < 10 ? "0" + this.alStime : this.alStime;

      for (var i = 0; i < this.lyric.length; i++) {
        if (i >= this.lyric.length - 1) {
          this.curIndex = i;
          break;
        }
        if (
          this.lyric[i].time <= currentTime &&
          currentTime < this.lyric[i + 1].time
        ) {
          if (i >= 2) {
            // console.log(this.lyric);
            // console.log("this.$refs.lyricLi",this.$refs.lyricLis);
            // console.log("this.$refs.lyricLi",this.$refs.lyricLi);

            // console.log("i===>",i);
            // console.log("this.$refs.lyricLi[i].offsetTop---",this.$refs.lyricLis[i].offsetTop);
            this.moveTop = this.$refs.lyricLis[i - 2].offsetTop;

            // console.log(this.moveTop);
          } else {
            this.moveTop = 0;
          }
          this.curIndex = i;

          break;
        }
      }
    },
    drawCircle(currentTime, duration) {
      let canvas = this.$refs.processBtn.getContext("2d"); //画布
      canvas.clearRect(0, 0, 100, 100); //清除画布区域
      canvas.beginPath();
      canvas.strokeStyle = "rgba(100,149,237,0.8)";
      canvas.lineWidth = 5;
      canvas.arc(25, 25, 20, 0, 2 * Math.PI);
      canvas.stroke();
      canvas.closePath();

      canvas.beginPath();
      canvas.strokeStyle = "#fff";
      canvas.lineWidth = 5;
      canvas.arc(
        25,
        25,
        20,
        0,
        2 * Math.PI * parseFloat(currentTime / duration)
      );
      canvas.stroke();
      canvas.closePath();

      // canvas.beginPath();
      // canvas.fillstyle="rgba(255,0,0,0.5)";
      // canvas.font="14px";
      // canvas.textAlign="center";
      // let str="播放";
      // if(!this.isPlay){
      //     str = "暂停";
      // }
      // canvas.fillText(str,25,25);
      // canvas.closePath();
    },
  },
  created() {
    console.log("$root==>", this.$root);
    this.$root.musicStore.isPlay = true;
  },
  computed: {
    //定义computed musicIDS 依赖我们$root.musicStore.musicID
    musicIDS() {
      //根据musicID获歌词
      let musicID = this.$root.musicStore.musicID;
      return musicID;
    },
  },
  watch: {
    musicIDS(musicID) {
      //侦听musicIDS变化  侦听函数里面newValue oldValue参数
      //ajax异步操作放在watch
      //歌词 [00:39.536]怎么 沾染情愫
      this.$http
        .get("http://music.kele8.cn/lyric?id=" + musicID)
        .then((data) => {
          console.log("data==>",data);
          if (
            data.data.lrc == undefined ||
            data.data.lrc.lyric.indexOf("[") == -1
          ) {
            this.lyric = [];
            return;
          } else {
            let lyricArr = data.data.lrc.lyric.split("\n");
            lyricArr.pop(); //取出匹配不到最后一条
            // console.log(lyricArr);
            let reg = /\[(\d+):(\d+\.\d+)\](.*)/; //时间有，歌词部分地方没有歌词内容 *可有可无 +则必须有 所以这里用*
            let newLyric = lyricArr.map((d) => {
              if (reg.test(d)) {
                return {
                  time: parseInt(RegExp.$1) * 60 + parseFloat(RegExp.$2),
                  lyric: RegExp.$3,
                };
              }
            });
            // console.log('歌词数组=newLyric=>',newLyric);
            this.lyric = newLyric;
          }

          //   console.log(this.lyric);
        });
    },
  },
};
// #6495ED
</script>
<style lang="less" scoped>
.player {
  position: fixed;
  z-index: 9;
  bottom: 0px;
  width: 100%;
  background-color: #7aa5f7;
  text-align: left;
  audio {
    height: 50px;
  }
  .playBar {
    display: flex;
    align-items: center;
    padding: 5px 10px;
    i {
      &:first-of-type {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
        animation: randImg 5s linear 0s infinite;
      }
      &:nth-of-type(2) {
        flex: 1;
        text-align: center;
        font-style: normal;
      }
      &:last-of-type {
        // background-color: red;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        position: relative;
        .btn {
          width: 30px;
          height: 30px;
          position: absolute;
          top: 10px;
          left: 11px;
        }
      }
    }
  }
  .fullPage {
    width: 100vw; //view-port视窗 vw  把屏幕宽度分成100份
    height: 100vh; //view-port vh  把屏幕高度分成100份
    background-color: cornflowerblue;
    position: relative;
    z-index: 20;
    p {
      padding-top: 15px;
      padding-bottom: 5px;
      padding-left: 15px;
      img {
        width: 30px;
        height: 30px;
      }
    }
    .playTitle {
      font-size: 24px;
      text-align: center;
      color: rgb(28, 65, 133);
      // color:#000;
      // text-shadow: 0px 0px 5px #fff;
    }
    .songImg {
      width: 60vw;
      height: 60vw;
      margin: 30px auto;
      border-radius: 50%;
      overflow: hidden;
      border: 3px solid rgba(255, 255, 255, 0.3);
      animation: randImg 10s linear 0s infinite;
    }
    .lyric {
      width: 100%;
      height: 22.1vh;
      overflow: hidden;
      text-align: center;
      ul {
        transition: all 0.5s linear;
        li {
          // height:30px;
          padding:5px 0px;
          // line-height: 30px;
          &.active {
            color: white;
          }
        }
      }
    }
    .noLyric {
      width: 100%;
      text-align: center;
      padding-top: 20px;
      font-size: 18px;
    }
    .processBar {
      width: 70vw;
      margin: 0;
      margin-left: 15vw;
      margin-right: 15vw;
      position: absolute;
      bottom: 100px;
      .cTime {
        text-align: right;
        width: 15vw;
        padding-right: 6px;
        position: absolute;
        left: -15vw;
        top: 0;
        color: #fff;
        font-style: normal;
        font-size: 14px;
      }
      .dTime {
        width: 15vw;
        text-align: left;
        padding-left: 6px;
        position: absolute;
        right: -15vw;
        top: 0;
        color: #fff;
        font-style: normal;
        font-size: 14px;
      }
      input {
        //去除默认样式
        appearance: none;
        -webkit-appearance: none;
        width: 100%;
        background: transparent;
        position: relative;
        z-index: 2;
        &::-webkit-slider-thumb {
          //控制滑头
          appearance: none;
          -webkit-appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: #fff;
          box-shadow: 0px 0px 10px #6495ED;
          margin-top: -5px;
          z-index: 5;
        }
        &::-webkit-slider-runnable-track {
          //控制滑槽
          appearance: none;
          -webkit-appearance: none;
          background-color: rgba(red, 0, 0, 1);
          height: 10px;
          border-radius: 5px;
          box-shadow: inset 0px 10px 10px rgba(255, 255, 255, 0.3);
        }
      }
      .brightBar {
        position: absolute;
        width: 50px;
        height: 10px;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        background-color: #fff;
        left: 0px;
        top: 4px;
        z-index: 1;
      }
      .dTime {
        width: 35vw;
        // padding-left:5px;
        position: absolute;
        right: -35vw;
        top: 0;
      }
    }

    .controlBar {
      height: 100px;
      width: 100%;
      position: absolute;
      bottom: 0;
      // padding:30px 0px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .typeBtn {
        width: 50px;
        height: 50px;
        border: none;
        // border:2px solid #ccc;
        background-color: transparent;
        outline: none;
        img {
          margin: 5px 10px;
          width: 32px;
          height: 32px;
          z-index: 1;
          display: block;
        }
      }
      .prevBtn {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        padding: 12px;
        background-color: transparent;
        border: 2px solid #ccc;
        outline: none;
        i {
          width: 20px;
          height: 20px;
          z-index: 1;
          display: block;
          background: url("../assets/player.png") no-repeat 0 -30px;
        }
      }
      .changeBtn {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: transparent;
        border: 2px solid #ccc;
        outline: none;
        position: relative;
        img {
          width: 34px;
          height: 34px;
          position: absolute;
          top: 7px;
          left: 7px;
        }
      }
      .nextBtn {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        padding: 12px;
        background-color: transparent;
        border: 2px solid #ccc;
        outline: none;
        i {
          width: 20px;
          height: 20px;
          z-index: 1;
          display: block;
          background: url("../assets/player.png") no-repeat 0 -52px;
        }
      }
      .showBtn {
        width: 30px;
        height: 30px;
        margin-right: 10px;
        background: url(../assets/list-ul.svg) no-repeat;
        background-size: cover;
        border: none;
        outline: none;
      }
    }
  }
  .playList {
    position: absolute;
    bottom: 25vh;
    border: 1px solid #fff;
    border-radius: 10px;
    background-color: #fff;
    width: 90%;
    height: 50vh;
    margin-left: 5%;
    overflow-y: auto;
    z-index: 100;
    .listTitle {
      height: 40px;
      line-height: 40px;
      width: 100%;
      font-size: 16px;
      display: block;
      text-align: center;
    }
    ul {
      li {
        height: 50px;

        border-bottom: 1px solid rgba(110, 152, 231, 0.2);
        position: relative;
        .musicName {
          overflow: hidden;
          text-overflow: ellipsis; //用省略号显示
          white-space: nowrap; //不换行
          padding-left: 20px;
          margin-right: 50px;
          line-height: 50px;
          display: block;
        }
        .delBtn {
          background: url(../assets/trash.svg) no-repeat;
          display: block;
          width: 22px;
          height: 22px;
          position: absolute;
          top: 14px;
          right: 15px;
        }
      }
    }
    i {
      width: 18px;
      height: 18px;
      background-color: #ddd;
      border-radius: 50%;
      text-align: center;
      line-height: 18px;
      position: absolute;
      right: 5px;
      top: 0px;
      z-index: 110;
    }
  }
}
@keyframes randImg {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>