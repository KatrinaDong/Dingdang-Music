<template>
    <h3 class="border-title"><slot></slot></h3>
</template>
<style lang="less" scoped>
.border-title {
    text-align:left;
    height:40px;
    line-height: 40px;
    padding-left:12px;
    position:relative;
    // padding:0;
    &::before {
        content:'';
        height:15px;
        display:inline-block;
        border-left:3px solid #6495ED;
        position:absolute;
        left:2px;
        top:12px;
    }
}
</style>