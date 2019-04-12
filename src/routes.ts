import Hello from './components/HelloWorld.vue';
import Home from './components/Home.vue';
import Expense from './components/Expense.vue';


export const routes = [
    {
        path: '',
        name: 'home',
        component: Home
    },
    {
        path: '/hello',
        name: 'hello',
        component: Hello
    },
    {
        path: '/expense/:id',
        name: 'expense',
        component: Expense
    }
];