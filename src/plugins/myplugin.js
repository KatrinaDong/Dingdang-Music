import Vue from 'vue'
//定义构造函数 myPlugin
let myPlugin = function(){}
//插件
myPlugin.install = function(vue){
    console.log('插件 myPlugin.install...');
    Vue.hello = function(){
        console.log('Vue 全局hello函数');
    };
    Vue.prototype.$hello = function(){
        console.log('vue实例方法 $hello');
    }
};
Vue.use(myPlugin);//调用 MyPlugin的install
export default myPlugin;