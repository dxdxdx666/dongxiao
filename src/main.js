import Vue from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'
import VueAxios from 'vue-axios'

import { tokenUrl } from './valid/tokenUrl'


//导入flexible.js设置rem的基准值
import 'lib-flexible/flexible'

import {
    Tabbar,
    TabbarItem,
    Search,
    Sidebar,
    SidebarItem,
    Toast,
    Tag,
    NavBar,
    Stepper,
    GoodsAction,
    GoodsActionIcon,
    GoodsActionButton,
    Form,
    Field,
    Button,
    Popup,
    Checkbox,
    SwipeCell,
    SubmitBar,
    Empty,
    Icon,
    AddressList,
    AddressEdit,
    Tab,
    Tabs,
    Dialog,
    Cell,
    Uploader,
    Swipe,
    SwipeItem,
    ActionSheet
} from 'vant';

//注册组件
Vue
    .use(Tabbar)
    .use(TabbarItem)
    .use(Search)
    .use(Sidebar)
    .use(SidebarItem)
    .use(Toast)
    .use(Tag)
    .use(NavBar)
    .use(Stepper)
    .use(GoodsAction)
    .use(GoodsActionIcon)
    .use(GoodsActionButton)
    .use(Form)
    .use(Field)
    .use(Button)
    .use(Popup)
    .use(Checkbox)
    .use(SwipeCell)
    .use(SubmitBar)
    .use(Empty)
    .use(Icon)
    .use(AddressList)
    .use(AddressEdit)
    .use(Tabs)
    .use(Tab)
    .use(Dialog)
    .use(Cell)
    .use(Uploader)
    .use(Swipe)
    .use(SwipeItem)
    .use(ActionSheet)


//设置请求基础路径
axios.defaults.baseURL = 'http://www.kangliuyong.com:10002';

//添加一个axios请求之前拦截器
axios.interceptors.request.use(config => {
    //config: 请求配置(请求头, 请求参数, 请求类型, 请求路径, ....)
    // 

    // 
    let tokenString = localStorage.getItem('token');

    let appkey = 'U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=';

    //处理请求的公共参数
    if (config.method === 'get') {
        config.params = config.params || {};
        config.params.appkey = appkey;

        if (tokenUrl.indexOf(config.url) > -1) {
            config.params.tokenString = tokenString;
        }

    } else if (config.method === 'post') {
        config.data = config.data || {};

        if (tokenUrl.indexOf(config.url) > -1) {
            config.data.tokenString = tokenString;
        }

        //序列化post请求参数
        let dataParams = '';
        for (let key in config.data) {
            dataParams += `${key}=${config.data[key]}&`
        }
        dataParams += `appkey=${appkey}`;

        config.data = dataParams;

    }

    //启动加载提示
    Toast.loading({
        message: '加载中...',
        //禁止穿透点击
        forbidClick: true,
        loadingType: 'spinner',
        //不会自动关闭提示
        duration: 0
    })



    return config;
}, err => {

    //关闭加载提示
    Toast.clear();
    return Promise.reject(err);
})

//添加一个响应之前拦截器
axios.interceptors.response.use(res => {
    //res: 服务器响应数据
    // 

    //关闭加载提示
    Toast.clear();

    return res;
}, err => {


    //关闭加载提示
    Toast.clear();

    return Project.reject(err);
})

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

//定义格式化时间过滤器
Vue.filter('formatDate', (value, format) => {
    //value: 日期对象 || 日期字符串
    //format: 格式 ==> 比如 yyyy-MM-dd hh:mm:ss
    //月日时分秒不足十补零, 比如 M 不需要补零, 如果是MM, 并且月份不足十，则需要补零

    if (Object.prototype.toString.call(value) !== ['object Date']) {
        value = new Date(value);
    }

    //获取年份
    let yearReg = /(y+)/;

    if (yearReg.test(format)) {

        //获取匹配组的内容
        let yearContent = RegExp.$1;


        //获取年份
        let year = value.getFullYear().toString();


        let yearText = year.slice(4 - yearContent.length);

        format = format.replace(yearContent, yearText);

    }

    let dateObject = {
        M: value.getMonth() + 1,
        d: value.getDate(),
        h: value.getHours(),
        m: value.getMinutes(),
        s: value.getSeconds()
    };

    //遍历dateObject替换format
    for (let key in dateObject) {

        //动态创建正则表达式
        let reg = new RegExp(`(${key}+)`);


        if (reg.test(format)) {


            //获取匹配组的内容
            let content = RegExp.$1;

            format = format.replace(content, content.length === 1 ? dateObject[key] : dateObject[key] >= 10 ? dateObject[key] : `0${dateObject[key]}`);

        }

    }


    return format;
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')