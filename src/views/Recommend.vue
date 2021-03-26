<template>
    <!-- 推荐音乐界面--导航栏 -->
    <div>
        <BorderTitle>推荐歌单</BorderTitle>
        <ul class="songList" v-if="songList.length>0">
            <ListItem v-for="sl in songList" :key="sl.id" :item="sl"></ListItem>
        </ul>
        <!-- 当songlist没数据时显示加载图标 -->
        <Loading v-if="songList.length==0"></Loading>
        <BorderTitle>最新音乐</BorderTitle>
        <ul class="newsong" v-if="newSong.length>0">
            <li v-for="(s,index) in newSong" :key="index">
                <SongItem :item="s" @add-list="addMusicList(newSong)"></SongItem>
            </li>
        </ul>
         <Loading v-if="newSong.length==0"></Loading>
    </div>
</template>
<script>
//模块引入标题导航栏
import BorderTitle from '@/components/BorderTitle'
import ListItem from '@/components/ListItem'
import SongItem from '@/components/SongItem'
import Loading from '@/components/Loading'

export default {
    name:"recommend",
    components:{
        BorderTitle,
        ListItem,
        SongItem,
        Loading
    },
    data(){
        return {
            //推荐歌单数组
            songList:[],
            //最新音乐歌单
            newSong:[]
        }
    },
    methods:{
        // play(musicID){
        //     //触发父组件的play事件
        //     this.$emit('play',musicID);
        // } 
        addMusicList(newSong){//把当前最新歌曲列表加入当前播放歌单列表
            // this.$root.musicStore.musicList=this.$root.musicStore.musicList.concat(newSong);
            //但是添加歌单的时候需要做数组去重！
            let newArr = this.$root.musicStore.musicList;//取出原来的播放列表
            newSong.map(d=>{//处理每一天newSong里面的音乐
                let find = false;
                for(let n of newArr){
                    if(n.id == d.id){//找到了当前音乐 在原歌单里面存在
                        find = true ;
                        break;//中断循环
                    }
                    
                }
                if(!find) newArr.push(d);//如果当前音乐在newArr没有找到，则加入newArr
                
            });
            this.$root.musicStore.musicList = newArr;

        }
    },
    created(){
        //获取推荐音乐
        this.$http.get('/personalized?limit=9').then(data=>{
            this.songList=data.data.result;
        }).catch(err=>{
            console.log(err);
        });
        //获取最新音乐
        this.$http.get('/personalized/newsong?limit=20').then(data=>{
            this.newSong=data.data.result;
            console.log("this.newSong",this.newSong)
        })
    }
}
</script>
<style lang="less" scoped>
.songList {
    display:flex;
    flex-wrap:wrap;
    justify-content: space-between;
    // margin:0 5px;
    padding:0 5px;
    li{
        width:33%;
    }
}
</style>