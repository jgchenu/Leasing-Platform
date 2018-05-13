import axios from 'axios'
import qs from 'qs'
import {
    Indicator,
    MessageBox
} from 'mint-ui';
import router from '../router'
const instance = axios.create({
    baseURL: '/',
    timeout: 6000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;'
    },
    withCredentials: true
});

instance.interceptors.request.use((config) => {
    Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
    });
    if (config.method === 'post') {
        config.data = qs.stringify(config.data);
    }
    return config;
}, (error) => {
    Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
    });
    return Promise.reject(error);
});
instance.interceptors.response.use((res) => {
    Indicator.close();
    if (res.status != 200) {
        return Promise.reject(res);
    } else if (res.data.retcode === 20040308) {
        MessageBox.alert(res.data.retmsg).then(() => {
            router.replace({ path: "/infoEdit" });
        });
    } else if (res.data.retcode === 20040403) {
        MessageBox.alert(res.data.retmsg);
    }
    return res;
}, (error) => {
    Indicator.close();
    //404等问题可以在这里处理
    if (error.response.status === 412) {
        MessageBox.confirm("你还没有登录，点击跳转").then(() => {
            router.push({
                path: "/user"
            });
        }, () => {
            MessageBox.alert("你取消了登录");
        })
    } else if (error.response.status === 500) {
        MessageBox.alert(error.response.data);
    } else if (error.response.status === 403) {
        function getCookie(name) {
            var arr,
                reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
            else return null;
        }

        function delCookie(name) {
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var cval = getCookie(name);
            if (cval != null)
                document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/";
        }


        MessageBox.alert("登录异常，请重新登录").then(() => {
            delCookie('token');
            router.push({
                path: "/user"
            });
        })

    }



    return Promise.reject(error);
});
export default instance