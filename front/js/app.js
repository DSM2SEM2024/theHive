
//rotas
import { Login } from './components/login.js';
import { Navbar } from './components/navbar.js';
import { Notificacoes } from './components/notificacoes.js';
import { Home } from './components/home.js';
import { Laboratorio } from './components/laboratorio.js';
import { Calendario } from './components/calendario.js';
import { Usuarios } from './components/usuarios.js';
import { criarReserva } from './components/criarReserva.js';
import { Lixeira } from './components/lixeira.js';
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
    { path: '/lixeira', component: Lixeira }
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
    data() {
        return {
            professor: false, // Inicialmente como false
            usuario: {
                nome: '',
                email: '',
                perfil: ''
            }
        }
    },
    components: {
        Navbar
    },
    setup() {
        const urlBase = 'http://localhost:3000/'; 
        return {
            urlBase,
        };
    },
    mounted() {
        this.getUserInfo();
    },
    provide() {
        return {
            urlBase: this.urlBase,
            isProfessor: Vue.computed(() => this.professor)
        };
    },
    methods: {
        async getUserInfo() {
            const id_usuario = localStorage.getItem('id_usuario');
            const token = localStorage.getItem('token');
            if (!id_usuario) return;

            try {
                const response = await fetch(`${this.urlBase}users/${id_usuario}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Erro ao obter informações do usuário');
                }

                const data = await response.json();
                if (data.error) {
                    console.error(data.error);
                    return;
                }

                this.usuario.nome = data.nome || "Não especificado";
                this.usuario.email = data.email || "Não especificado";
                this.usuario.perfil = data.perfil || "Não especificado";
                localStorage.setItem('usuario_nome', this.usuario.nome);

                this.professor = this.usuario.perfil === 'Professor';
            } catch (error) {
                console.error('Erro ao buscar informações do usuário:', error);
            }
        },
    },
    template: `
    <Navbar></Navbar>
    `
}

const App = Vue.createApp(app);
App.use(router);
App.mount('#app');

