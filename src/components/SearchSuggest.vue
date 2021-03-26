<template>
    <div class="suggest">
        <div class="searchWhich">搜索：“{{keywords}}”</div>
        <ul>
            <template v-if="suggestList.artists" >
                <li class="singer" v-for="(v) in suggestList.artists" 
                :key="v.id" 
                @click="$emit('change',v.name)">
                    <img :src="v.img1v1Url" />
                    <span>歌手：{{v.name}}</span>
                </li>
            </template>
            <template v-if="suggestList.albums">
                <li class="album" v-for="(v) in suggestList.albums" 
                :key="v.id" 
                @click="$emit('change',v.name)">
                    <img :src="v.artist.picUrl" />
                    <span>专辑：{{v.name}}</span>
                </li>
            </template>
            <template v-if="suggestList.songs" >
                <li class="music" v-for="(v) in suggestList.songs" 
                :key="v.id" 
                @click="$emit('change',v.name)">
                    歌曲：{{v.name}} <span class="singerName"> - {{v.artists[0].name}} </span>
                </li>
            </template>
        </ul>
    </div>
</template>
<script>
export default {
    name:"SearchSuggest",
    //接收Search.vue传过来的keywords值
    props:['keywords'],
    data(){
        return {
            suggestList:{}
        }
    },
    //-------第一下输入会不触发keywords,因为第一次输入，触发的是Search组件切换SearchSuggest组件------
    // 所以用created来实现第一次输入可开始搜索------------
    //组件第一次渲染执行一次   第一次进入触发
    created(){
        this.loadSuggest(this.keywords);
    },
    //侦听值变化
    watch:{
        keywords(val){
            // console.log(val);
            //调用loadSuggest方法，获取搜索结果
            this.loadSuggest(val);  
        }
    },
    methods:{
        loadSuggest(val){
            //搜索结果分类 orders==>songs音乐歌曲   artists艺术家  albums专辑
            this.$http.get('/search/suggest?keywords='+val+'&type=mobile')
            .then(data=>{
                let result = data.data.result.allMatch;
                this.suggestList = result;
                // console.log("result==>",this.suggestList);
                
            })
        }
    }
}
</script>
<style lang="less" scoped>
.suggest{
    width:85%;
    margin:-5px auto;
    border-radius:20px;
    box-shadow: 0px 0px 5px #6495ED;
    padding-bottom:10px;
    .searchWhich{
        text-align: left;
        margin-left:8px;
        margin-right: 8px;
        color:#6495ED;
        padding-top:8px;
        padding-bottom:8px;
    }
    ul {
        li {
            // height:45px;
            // line-height:45px;
            text-align:left;
            display: flex;
            &.singer,&.album{
                border-bottom:1px dashed #99b4e5;
                img{
                    width:50px;
                    height:50px;
                    border-radius:50%;
                    margin:5px;
                    margin-left:15px;
                    margin-right:10px;
                }
                span{
                    display: block;
                    height:65px;
                    line-height:65px;
                    overflow: hidden;
                    text-overflow: ellipsis; //用省略号显示
                    white-space: nowrap;  //不换行
                }
            }
            &.music {
                padding-left:20px;
                padding-right: 20px;
                height:65px;
                line-height:65px;
                border-bottom:1px dashed #99b4e5;
                text-align:center;
                overflow: hidden;
                    text-overflow: ellipsis; //用省略号显示
                    white-space: nowrap;  //不换行
                .singerName{
                    color:rgb(179, 179, 179);
                }
            }
            
        }
    }
}
</style>
