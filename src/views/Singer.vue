<template>
    <!-- 歌手榜音乐界面--导航栏 -->
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