<template>
    <!-- 搜索界面--导航栏 -->
    <div>
        <!----表单事件submit提交  键盘enter可触发submit  .prevent阻止默认行为----->
        <form @submit.prevent="change(keywords)">
            <div class="input">
               <i></i> 
                <!-- v-model数据模型  此处作用：当输入框开始输入时，能切换SearchSuggeat组件 -->
                <input type="text" 
                v-model="keywords" 
                placeholder="搜索歌曲，歌手，专辑" 
                @input="inputing=true" />
                <i class="delete" v-show="keywords" @click="changeKeywords">×</i>
            </div>
        </form>
        <!-- <HotSearch></HotSearch>
        <SearchSuggest></SearchSuggest> -->

        <!-- 组件切换 搜索提示 搜索结果 热门搜素  -->
        <!-- 给组件绑定一个自定义事件  @change="change"-->
        <component 
        :is="search" 
        :keywords="keywords" 
        @change="change"
        ></component>
       
    </div>
</template>
<script>
import HotSearch from '@/components/HotSearch'
import SearchSuggest from '@/components/SearchSuggest'
import SearchResult from '@/components/SearchResult'
export default {
    name:"Search",
    data(){
        return {   
            search:'HotSearch',
            // 输入一开始为空
            keywords:'',
            //标记是否为文本框正在输入  
            //如果是文本框输入，则切换SearchSuggest组件，如果是点击搜索结果输入，则切换SearchResult组件
            inputing:false ,
            // historyArr:[],
            historyArr : [],
        }
    },
    created(){},
    methods:{
        changeKeywords(){
            this.keywords = '';
        },
        //点击搜索结果
        change(val){
            //点击之后，就要记录下搜索历史 放在localStorage里面 
            // localStorage.set();//json
            this.keywords = val ;
            //不触发搜索建议提示组件
            this.inputing = false ;
            this.search="SearchResult" ;
            if(localStorage.musicName){
                this.historyArr = JSON.parse(localStorage.getItem("musicName"))
                
            }
            this.historyArr.push(val);
            this.historyArr = this.unique(this.historyArr);
            localStorage.setItem("musicName",JSON.stringify(this.historyArr));
        },
        //数组去重
        unique(arr){
            let obj = {};
            let newArr = [];
            for(let i = 0 ; i < arr.length; i++){
                if(!obj[arr[i]]){
                    obj[arr[i]] = 1 ;
                    newArr.push(arr[i]);
                }
            }
            return newArr;
        }
    },
    // 侦听器 侦听keywords的变化，即是否开始输入
    watch:{
        keywords(val){
            if(val==''){
                this.search='HotSearch'
            }else if(this.inputing){
                //keywords开始输入时，切换SearchSuggest组件
                this.search="SearchSuggest";
            }
        }
    },
    components:{
        HotSearch,
        SearchSuggest,
        SearchResult
    }
}
</script>
<style lang="less" scoped>
form{
    padding:10px;
}
    .input{
        position:relative;
        height:30px;
        box-sizing:border-box;
        background-color: #ebecec;
        border-radius:30px;
        display: flex;
        i{
            display:inline-block;
            width:13px;
            height:13px;
            background-image: url("../assets/search.svg");
            margin:10px;
        }
        input{
            flex:1;
            background-color: transparent;
            outline:none;
            border:none;

        }
        .delete{
            width:16px;
            height:16px;
            line-height:16px;
            text-align:center;
            border-radius:50%;
            background: #ccc;
            color:#EBECEB;
            margin:7px 10px;
        }
        
    }
    
</style>