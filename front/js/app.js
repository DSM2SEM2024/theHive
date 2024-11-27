
//rotas
import { Login } from './components/login.js';
import { Navbar } from './components/navbar.js';
import { Notificacoes } from './components/notificacoes.js';
import { Home } from './components/home.js';
import { Laboratorio } from './components/laboratorio.js';
import { Calendario } from './components/calendario.js';
import { Usuarios } from './components/usuarios.js';
import { criarReserva } from './components/criarReserva.js';
import { Equipamentos } from './components/equipamentos.js';

const routes = [
    { path: '/', component: Login },
    { path: '/home', component: Home },
    { path: '/laboratorio', component: Laboratorio },
    { path: '/notificacoes', component: Notificacoes },
    { path: '/calendario/:idLab', name: 'Calendario', component: Calendario, props: true},
    { path: '/criarReserva/:idLab', name: 'Criar Reserva', component: criarReserva, props: true},
    { path: '/usuarios', component: Usuarios },
    { path: '/criarReserva', component: criarReserva },
    { path: '/equipamentos', component: Equipamentos },
    
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
});

//impede o acesso da home caso chegue ao login
router.beforeEach((to, from, next) => {
    if (to.path === '/') {
        if (localStorage.getItem('token')) {
            return next('/home');
        }
        document.documentElement.classList.add('login-background');
        document.querySelector('main').classList.add('login-background');
    } else {
        document.documentElement.classList.remove('login-background');
        document.querySelector('main').classList.remove('login-background');
    }
    if (to.path === '/home' && !localStorage.getItem('token')) {
        return next('/');
        document.documentElement.classList.add('login-background');
        document.querySelector('main').classList.add('login-background');
    }
    next();
});

const app = {
    components: {
        Navbar
    },
    setup() {
        const urlBase = 'http://localhost:3000/'; 
        return {
            urlBase
        };
    },
    provide() {
        return {
            urlBase: this.urlBase 
        };
    },
    template: `
    <Navbar></Navbar>
    `
}

const App = Vue.createApp(app);
App.use(router);
App.mount('#app');
