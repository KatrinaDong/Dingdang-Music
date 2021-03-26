<template>
    <!-- 加载图标 -->
    <div class="loading">
        <div>
            <i></i>
            <i></i>
            <i></i>
        </div>
    </div>
</template>
<style lang="less" scoped>
.loading {
    div {
        margin:0 auto;
        width:16px;
        display: flex;
        justify-content: space-between;

        i {
            display:inline-block;
            width:4px;
            height:20px;
            background-color: cornflowerblue;
            transform-origin: bottom;
            animation: loading .5s linear 0.2s infinite alternate-reverse;
            &:nth-of-type(2){
                //负数指直接跳过0.2s，直接到达0.2时的状态
                animation-delay: -0.2s;    
            }
            &:nth-of-type(3){
                animation-delay: -0.4s; 
            }
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
</style>