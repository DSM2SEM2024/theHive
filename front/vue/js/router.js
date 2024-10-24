import FormAluno from './components/FormAluno.js';
import HomeProfessor from './components/HomeProfessor.js/HomeProfessor.js';
import PainelAdmin from './components/PainelAdmin.js';
import Login from './public/login/index.html';

function getRotaDinamica() {
    const paginasPermitidas = JSON.parse(localStorage.getItem('paginasPermitidas')) || [];
    const rotaDinamica = [];
    const adminChildren = [];

    paginasPermitidas.forEach(page => {
        switch (page.path) {
            case '/form-aluno':
                rotaDinamica.push({ path: page.path, component: FormAluno, meta: { precisaDeAutenticacao: true, tipoUsuario: 'aluno' } });
                break;
            case '/home-professor':
                rotaDinamica.push({ path: page.path, component: HomeProfessor, meta: { precisaDeAutenticacao: true, tipoUsuario: 'professor' } });
                break;
            case '/painel-admin':
                rotaDinamica.push({
                    path: page.path,
                    component: PainelAdmin,
                    meta: { precisaDeAutenticacao: true, tipoUsuario: 'administrador' },
                    children: adminChildren
                });
                break;
            default:
                rotaDinamica.push({ path: '/', 
                beforeEnter() {
                    window.location.href = './public/login/index.html';
                },
                component: Login, meta: { precisaDeAutenticacao: false } });
        }
    });

    return rotaDinamica;
}

const routes = [
    { path: '/', 
    beforeEnter() {
        window.location.href = './public/login/index.html';
    },
    component: Login, meta: { precisaDeAutenticacao: false } },
    { 
        path: '/home-professor', 
        beforeEnter() {
            window.location.href = './public/home/homeProfessor.html';
        },
        meta: { precisaDeAutenticacao: true, tipoUsuario: 'professor' }
    },
    { path: '/:pathMatch(.*)*', redirect: '/' }
];

const rotaDinamica = getRotaDinamica();
routes.push(...rotaDinamica);

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 };
    }
});

router.beforeEach((to, from, next) => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    console.log('Navegando para:', to);
    console.log('Usuário Logado:', usuario);
    if (to.matched.some(record => record.meta.precisaDeAutenticacao)) {
        if (!usuario) {
            console.log()
            return next({ path: '/' });
        }

        const tipoUsuario = to.meta.tipoUsuario;
        if (usuario.tipo === tipoUsuario || usuario.tipo === 'administrador') {
            return next();
        }

        alert("Acesso negado: Você não tem permissão para acessar esta página.");
        return next({ path: '/' });
    }
    return next();
});

export default router;
