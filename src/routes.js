import { createRouter, createWebHistory } from "vue-router";
import { recupUser } from "./utiles";

const routes = [
    {path:'/', component: ()=> import('./views/LoginView.vue'), name:"Login"},
    {path:'/home/:id', component: ()=> import('./components/MuzartHome.vue'), meta: {require:true}},
    {path:'/homeusers/:iduser', component: ()=> import('./components/MuzartHomeUzers.vue')},
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// console.log(window.localStorage.getItem("auth"));

// router.beforeEach((to, from) => {
//     const isAuthenticated = Boolean(window.localStorage.getItem("auth"));
//     console.log(isAuthenticated);
    
//     if (!isAuthenticated && to.path !== '/') {
//       return { path: '/' };
//     }
//   });

const user = ()=> recupUser()?recupUser():{isAuthenticated:false}

router.beforeEach(async(to, from, next) => {
    if (to.meta.require && to.name !== 'Login' && !user().isAuthenticated) next({ name: 'Login' })
    else next()
  })

export default router;
