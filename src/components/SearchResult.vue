<template>
  <!-- 搜索结果---显示音乐列表部分 -->
  <div class="result">
    <!-- <div>搜索结果：{{ keywords }}</div> -->
    <!-- 搜索歌曲的界面 -->
    <ul class="resultClassify">
      <li :class="{active:resultType=='SongsType'}" @click="tabChange('SongsType')">歌曲</li>
      <li :class="{active:resultType=='SingersType'}"  @click="tabChange('SingersType')">歌手</li>
      <li :class="{active:resultType=='AlbumsType'}" @click="tabChange('AlbumsType')">专辑</li>
    </ul>
    <keep-alive>
    <component 
        :is="resultType"
        :keywords="keywords" 

        ></component>
        <!--         @change="change" -->
    </keep-alive>
    
  </div>
</template>
<script>
import SongsType from "@/components/SongsType"
import SingersType from "@/components/SingersType"
import AlbumsType from "@/components/AlbumsType"
export default {
  name: "SearchResult",
  props: ["keywords"],
  data() {
    return {
      resultType:'SongsType',
      
    };
  },
  components:{
    SongsType,
    SingersType,
    AlbumsType,
  },
  methods:{
    tabChange(type){
      this.resultType = type;
    }
  }
  
}
</script>
<style lang="less" scoped>
.result {
  .resultClassify{
    overflow: hidden;
    padding-left:20px;
    display: flex;
    justify-content: left;
    margin-top:6px;
    margin-bottom:10px;
    li{
      float:left;
      width:60px;
      height:30px;
      line-height:30px;
      text-align:center;
      &.active{
        background-color: #EBECEC;
        
      }
    }

  }
}
</style>


