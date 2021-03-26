import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'


Vue.config.productionTip = false
//播放音乐相关的数据存储到Vue实例
//在整个项目组件里面都可以通过this.$root获取Vue实例
let musicStore={
  musicID:null,
  isPlay:false,
  musicList:[],//当前播放列表
  currentMusic:null//记录当前播放这一首音乐的信息
}
new Vue({
  data:{
    musicStore,
    
  },
  // watch:{
  //   musicStore:{
  //     handler(){//监听执行函数
  //       // console.log("musicStore变化了...")
  //       let musicID = this.musicStore.musicID;
  //       //根据musicID获歌词
  //       //歌词 [00:39.536]怎么 沾染情愫
  //       this.$http.get('http://music.kele8.cn/lyric?id='+musicID).then(data=>{
  //         // console.log(data);
  //         let lyricArr = data.data.lrc.lyric.split('\n');
  //         lyricArr.pop(); //取出匹配不到最后一条
  //         // console.log(lyricArr);
  //         let reg = /\[(\d+):(\d+\.\d+)\](.*)/;//时间有，歌词部分地方没有歌词内容 *可有可无 +则必须有 所以这里用*
  //         let newLyric = lyricArr.map(d=>{
  //           if(reg.test(d)){
  //             return {
  //               time:(parseInt(RegExp.$1)*60)+parseFloat(RegExp.$2),
  //               lyric:RegExp.$3
  //             }
  //           }
  //         });
  //         // ------------我不懂！！！！！！！！！！！！！ newLyric.pop()  为什么加了这个就可以去掉末尾的undefined;！！！！！！！！！！！！！！
  //         // console.log('歌词数组=newLyric=>',newLyric);
  //         this.lyric = newLyric;
  //         // console.log(this.lyric);
  //       })

  //     },
  //     deep:true //侦听对象里面所有的变化
  //   }
  // },
  router, 
  render: h => h(App)
}).$mount('#app')
