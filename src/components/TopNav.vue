<template>
  <div class="top" v-show="$route.meta.showNav">
    <div class="title"><i></i>叮当音乐</div>
    <ul class="topnav">
      <!-- <keep-alive> -->
      <li><router-link to="/recommend">推荐音乐</router-link></li>
      <li><router-link to="/hot">热歌榜</router-link></li>
      <li><router-link to="/search">搜索</router-link></li>
      <!-- </keep-alive> -->
      <!-- <li><router-link to="/singers">歌手榜</router-link></li> -->
    </ul>
  </div>
</template>
<style lang="less" scoped>
.top{
    position: fixed;
    top: 0px;
    height:90px;
    width: 100%;
    z-index: 9;
    .title{
        height:50px;
        background-color: #6495ED;
        color:#fff;
        font-size:20px;
        text-align:left;
        line-height:50px;
        padding-left:55px;
        position: relative;
        i{
          width:30px;
          height:30px;
          background:url('../assets/ling.svg');
          background-size:cover;
          display: block;
          position:absolute;
          top:10px;
          left:15px;
        }
    }
    .topnav {
      display: flex;
      background-color: #fff;
      border-bottom: 1px solid #ccc;
      
      li {
        flex: 1;
        height: 40px;
        text-align: center;
        line-height: 40px;
        a {
          // color:#dd001b;
          color: #333;
          display: inline-block;
          text-decoration: none;
          &.router-link-exact-active {
            color: #6495ED;
            border-bottom: 2px solid #6495ED;
          }
        }
      }
    }
}
</style>