import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Main',
        component: () =>
            import ('../views/Main.vue'),
        children: [{
                path: 'home',
                alias: '',
                name: 'Home',
                component: () =>
                    import ('../views/Home.vue')
            },
            {
                path: 'menu',
                name: 'Menu',
                component: () =>
                    import ('../views/Menu.vue')
            },
            {
                path: 'shopbag',
                name: 'Shopbag',
                component: () =>
                    import ('../views/Shopbag.vue')
            },
            {
                path: 'my',
                name: 'My',
                component: () =>
                    import ('../views/My.vue')
            }
        ]
    },
    {
        path: '/detail/:pid',
        name: 'Detail',
        component: () =>
            import ('../views/Detail.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ('../views/Login.vue')
    },
    {
        path: '/orderbuy',
        name: 'OrderBuy',
        component: () =>
            import ('../views/OrderBuy.vue')
    },
    {
        path: '/address',
        name: 'Address',
        component: () =>
            import ('../views/Address.vue')
    },
    {
        path: '/order',
        name: 'Order',
        component: () =>
            import ('../views/Order.vue')
    },
    {
        path: '/myaddress',
        name: 'MyAddress',
        component: () =>
            import ('../views/MyAddress.vue')
    },
    {
        path: '/account',
        name: 'Account',
        component: () =>
            import ('../views/Account.vue')
    },
    {
        path: '/like',
        name: 'Like',
        component: () =>
            import ('../views/Like.vue')
    },
    {
        path: '/secure',
        name: 'Secure',
        component: () =>
            import ('../views/Secure.vue')
    },
    {
        path: '/forget',
        name: 'Forget',
        component: () =>
            import ('../views/Forget.vue')
    },
    {
        path: '/forgetnext',
        name: 'ForgetNext',
        component: () =>
            import ('../views/ForgetNext.vue')
    },
    {
        path: '/search',
        name: 'Search',
        component: () =>
            import ('../views/Search.vue')
    },
]

const router = new VueRouter({
    // mode: 'hash',
    // mode: 'history',
    routes
})

export default router