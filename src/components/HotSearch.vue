<template>
    <!-- 搜索界面的热门搜索部分 -->
    <div>
        <h2>热门搜索</h2>
        <ul class="hotSearch">
            <li v-for="(hot,index) in hotSearch" 
            @click="$emit('change',hot.first)"
            :key="index">
                <span class="hotNum">{{index+1}}</span>
                {{hot.first}}
            </li>
        </ul>
        <div class="historySearch" v-if="searchHistory">
            <h2>历史搜索 <i @click="deleteHis()"></i></h2>
            <ul v-if="searchHistory">
                <li v-for="(item,index) in searchHistory" 
                :key="index"
                @click="$emit('change',item)"
                >
                    <img class="clock" src="../assets/clock.svg" />{{item}}
                    
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name:"HotSearch",
    data(){
        return {
            hotSearch:[],
            searchHistory:[],
        }
    },
    created(){
        //加载历史记录 localStorage.getItem();
        //获取热搜列表
        this.$http.get('/search/hot').then(data=>{
            // console.log("hot的data==>",data);
            this.hotSearch = data.data.result.hots;
            // console.log("this.hotSearch=>",this.hotSearch)
        });
        this.searchHistory = JSON.parse(localStorage.getItem("musicName"))
    },
    methods:{
        deleteHis(){
            localStorage.removeItem("musicName");
            this.searchHistory=[];

        }
    },
    
}
</script>
<style lang="less" scoped>
h2{
    text-align:left;
    margin-left:15px;
    margin-right:15px;
    font-weight:bold;
    font-size:14px;
    height:30px;
    line-height:30px;
    border-bottom:1px solid #ddd;
}
.hotSearch{
        list-style:none;
        // overflow: hidden;
        display: flex;
        flex-wrap:wrap;
        justify-content: space-between;
        
        li {
            float:left;
            height:45px;
            line-height:45px;
            border-radius:15px;
            font-size:16px;
            width:50%;
            text-align:left;
            overflow: hidden;
            text-overflow: ellipsis; //用省略号显示
            white-space: nowrap;  //不换行
            &:first-of-type,&:nth-of-type(2),&:nth-of-type(3){
                font-weight:bold;
                .hotNum{
                    color:#6495ED;
                    font-weight:bold;
                }
            }
            .hotNum{
                padding-left:15px;
                padding-right:5px;
            }
        }
    }
.historySearch{
    h2{
        position: relative;
        i{
            position:absolute;
            display: block;
            background:url("../assets/trash.svg") no-repeat;
            width:15px;
            height:16px;
            top:8px;
            left:20%;
        }
    }
    ul{
        li{
            width:100%;
            height:40px;
            line-height: 40px;
            padding-left:40px;
            padding-right:50px;
            text-align: left;
            overflow: hidden;
            text-overflow: ellipsis; //用省略号显示
            white-space: nowrap;  //不换行
            position: relative;
            // i{
            //     position: absolute;
            //     font-size: 20px;
            //     color:#ccc;
            //     top:3px;
            //     right:5%;
            // }
            .clock{
                width:20px;
                height:20px;
                position: absolute;
                top:10px;
                left:15px;
            }
        }
    }

}
</style>