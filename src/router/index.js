import Vue from 'vue'
import Router from 'vue-router'
// import enter from '@/components/pages/enter'
// import main from '@/components/pages/main'
// import order from '@/components/order/order'
// import notice from '@/components/notice/notice'
// import loan from '@/components/pages/loan'
// import rent from '@/components/pages/rent'
// import wishWall from '@/components/pages/wishWall'
// import goodDetail from '@/components/pages/goodDetail'
// import wishDetail from '@/components/pages/wishDetail'
// import releaseWish from '@/components/pages/releaseWish'
// import getMessage from '@/components/pages/getMessage'
// import myrent from '@/components/order/myrent'
// import myloan from '@/components/order/myloan'
// import mywish from '@/components/order/mywish'
// import noticeDetail from '@/components/notice/noticeDetail'
// import me from '@/components/personal/me'
// import info from '@/components/personal/info'
// import ordinance from '@/components/personal/ordinance'
// import suggest from '@/components/personal/suggest'
// import collection from '@/components/personal/collection'
// import user from '@/components/user/user'
Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            redirect: '/enter/main'
        },
        {
            path: '/enter',
            name: 'enter',
            component: resolve => require(['@/components/pages/enter'], resolve),
            children: [{
                    path: 'main',
                    name: 'main',
                    component: resolve => require(['@/components/pages/main'], resolve),
                }, {

                    path: 'order',
                    name: 'order',
                    component: resolve => require(['@/components/order/order'], resolve),
                    children: [{
                            path: 'myrent',
                            name: 'myrent',
                            component: resolve => require(['@/components/order/myrent'], resolve),
                        },
                        {
                            path: 'myloan',
                            name: 'myloan',
                            component: resolve => require(['@/components/order/myloan'], resolve),
                        },
                        {
                            path: 'mywish',
                            name: 'mywish',
                            component: resolve => require(['@/components/order/mywish'], resolve),
                        },
                        {
                            path: 'gotwish',
                            name: 'gotwish',
                            component: resolve => require(['@/components/order/gotwish'], resolve),
                        }
                    ]
                },
                {
                    path: 'notice',
                    name: 'notice',
                    component: resolve => require(['@/components/notice/notice'], resolve),
                },
                {
                    path: 'me',
                    name: 'me',
                    component: resolve => require(['@/components/personal/me'], resolve),
                },
            ]
        },
        {
            path: '/rent',
            name: 'rent',
            component: resolve => require(['@/components/pages/rent'], resolve),
            meta: {
                keepAlive: true
            },

        }, {
            path: '/loan',
            name: 'loan',
            component: resolve => require(['@/components/pages/loan'], resolve),
        }, {
            path: '/wishWall',
            name: 'wishWall',
            component: resolve => require(['@/components/pages/wishWall'], resolve),
        },
        {
            path: '/goodDetail',
            name: 'goodDetail',
            component: resolve => require(['@/components/pages/goodDetail'], resolve),
        }, {
            path: '/wishDetail',
            name: 'wishDetail',
            component: resolve => require(['@/components/pages/wishDetail'], resolve),
        }, {
            path: '/releaseWish',
            name: 'releaseWish',
            component: resolve => require(['@/components/pages/releaseWish'], resolve),
        }, {
            path: '/getMessage',
            name: 'getMessage',
            component: resolve => require(['@/components/pages/getMessage'], resolve),
        }, {
            path: '/noticeDetail',
            name: 'noticeDetail',
            component: resolve => require(['@/components/notice/noticeDetail'], resolve),
        },
        {
            path: '/info',
            name: 'info',
            component: resolve => require(['@/components/personal/info'], resolve),
        }, {
            path: '/ordinance',
            name: 'ordinance',
            component: resolve => require(['@/components/personal/ordinance'], resolve),
        }, {
            path: '/collection',
            name: 'collection',
            component: resolve => require(['@/components/personal/collection'], resolve),
        },
        {
            path: '/suggest',
            name: 'suggest',
            component: resolve => require(['@/components/personal/suggest'], resolve),
        },
        {
            path: '/user',
            name: 'user',
            component: resolve => require(['@/components/user/user'], resolve),
        },
        {
            path: '/infoEdit',
            name: 'infoEdit',
            component: resolve => require(['@/components/personal/infoEdit'], resolve),
        },
        {
            path: '/editMessage',
            name: 'editMessage',
            component: resolve => require(['@/components/personal/editMessage'], resolve),
        },
        {
            path: '/registered',
            name: 'registered',
            component: resolve => require(['@/components/user/registered'], resolve),
        },
        {
            path: '/forget',
            name: 'forget',
            component: resolve => require(['@/components/user/forget'], resolve),
        },
        {
            path: '/resetPass',
            name: 'resetPass',
            component: resolve => require(['@/components/user/resetPass'], resolve),
        },
        {
            path: '/editGood',
            name: 'editGood',
            component: resolve => require(['@/components/pages/editGood'], resolve),
        },

    ]
})