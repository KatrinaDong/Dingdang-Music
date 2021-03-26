<template>
    <!-- 最新音乐部分 -->
    <!-- :style="{backgroundColor:isClick?'rgba(100,149,237,0.5)':'#FFFFFF'}" -->
    <div class="songItem" >
        <!-- 该div获取组件的index值  用插槽slot -->
        <div class="num"><slot></slot></div>
        <div class="left">
            <!-- 歌名 -->
            <!-- 传入关键字keywords 高亮 -->
            <h3 v-html="$options.filters.highLight(item.name,keywords)" 
                :style="{color:item.id==$root.musicStore.musicID?'cornflowerblue':'#333'}">
                    {{item.name|highLight(keywords)}}
            </h3>
            <!-- <h3 v-html="$options.filter"></h3> -->
            <p>
                <!-- 歌手 -->
                <template v-if="item.song">
                    {{item.song.artists[0].name}} 
                </template>
                <template v-if="item.artists">
                    {{item.artists[0].name}}
                </template>
                - {{item.name}}
            </p>
        </div>
        <span class="playbtn" @click="play(item)" v-if="item.id!=$root.musicStore.musicID||(item.id==$root.musicStore.musicID&&$root.musicStore.isPlay==false)">
            <img src="../assets/play-fill2.svg"/>
        </span>
        <div class="onPlay" v-if="item.id==$root.musicStore.musicID&&$root.musicStore.isPlay==true">
            <i></i>
            <i></i>
            <i></i>
            <i></i>
        </div>
    </div>
</template>
<script>
export default {
    name:"SongItem",
    props:['item','keywords'],
    data(){
        return {
        //    isPlay:false
        }
    },
    methods:{
        play(item){
            // this.$emit('play',item.id);//组件传值的方式 触发父组件的play并传值音乐ID
            //换一种方式 把音乐相关数据存储在Vue实例里面
            //在子组件通过this.$root.musicStore 访问 Vue实例里面数据
            // console.log(this.$root.musicStore);
            // this.isPlay = !this.isPlay;
            // console.log(this.isPlay);
            this.$root.musicStore.musicID = item.id ;
            console.log('=============',item.id)
            //记录当前正在播放的这一首歌曲 currentMusic
            this.$root.musicStore.currentMusic = item ; 
            //查看当前播放的该音乐信息
            console.log("当前播放的该音乐信息==>",item);
            // this.$root.musicStore.musicList.unshift(item);//把当前歌曲放在播放列表开头
            let newArr = this.$root.musicStore.musicList;
            let find = false ;
            for(let n of newArr){
                if(n.id == item.id){
                    find = true ;
                }
            }
            if(!find) this.$root.musicStore.musicList.push(item);//如果当前音乐在播放列表不存在的时候，加入播放列表
            //把当前歌曲列表全部加入播放歌单列表
            this.$emit('add-list');
            
        }
    },
    //过滤器 filters 不能直接调用
    filters:{
        //v-html指令 在html插值的时候渲染里面html 在v-html指令里面调用filters
        //在v-html指令里面调用$options.filters.highLight()
        //val里面如果有keywords的值 替换成html
        highLight(val,keywords){//keywords高亮
            //判断有没有传递关键字keywords，没有则不做正则替换
            if(typeof keywords=="undefined"){
                return val;
            }
            let reg = new RegExp(keywords,'g');//根据keywords关键字创建正则对象
            if(reg.test(val)){//查找关键字，若存在
                //把val里面的关键字keywords替换成span+keywords的方式
                //把html代码动态写入dom里面，如果style设置为scoped,没有给span添加data-xxx属性
                return val.replace(reg,'<span class="highLight">'+keywords+'</span>')
            }
            //若没有匹配到关键字keywords，则返回val
            return val ;
            // return "<span>"+val+"</span>"+keywords;
        }
    }
}
</script>
<style lang="less" >
//scoped 局部的样式
.songItem{
    text-align:left;
    display: flex;
    align-items:center;
    border-bottom:1px solid #eee;
    padding:10px 10px;
    // background-color: #6495ED;
    // opacity: 0.2;
    .left {
        width:60%;
        flex:1;
        h3{
            color:#333;
            width:100%;
            overflow: hidden;
            text-overflow: ellipsis; //用省略号显示
            white-space: nowrap;  //不换行
            
        }
        p {
            color:#aaa;
            font-size:14px;
            width:100%;
            overflow: hidden;
            text-overflow: ellipsis; //用省略号显示
            white-space: nowrap;  //不换行
        }
    }
    span.highLight{  //span.highLight[data-v-14e84df8] 属性选择器 添加了scoped以后
        color:#6495ED;
    }
    .playbtn{
        // background: url(../assets/index_icon.png) -24px 0px;
        display: block;
        width:30px;
        height:30px;
        border:1px solid #cccccc;
        border-radius:50%;
        background-color:transparent;
        position: relative;
        // background-size: 166px 97px;
        img{
            width:25px;
            height:25px;
            position:absolute;
            top:2px;
            left:3px;
        }
    }
    .onPlay{
        margin:0 auto;
        width:25px;
        display: flex;
        justify-content: space-between;
        i {
            display:inline-block;
            width:4px;
            height:20px;
            background-color: cornflowerblue;
            transform-origin: bottom;
            animation: loading .6s linear 0.2s infinite alternate-reverse;
            animation: name duration timing-function delay iteration-count direction fill-mode;;
            &:nth-of-type(2){
                //负数指直接跳过0.2s，直接到达0.2时的状态
                animation-delay: -0.2s;    
            }
            &:nth-of-type(3){
                animation-delay: -0.4s; 
            }
        }
    }
    @keyframes loading {
    0%{
        transform: scaleY(0.4);
    }
    100%{
        transform: scaleY(1.2);
    }
}
    
    .num {
        padding-right:10px;
    }
}


</style>