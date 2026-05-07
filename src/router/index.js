import { createRouter, createWebHistory } from 'vue-router'

import StartView from '../views/StartView.vue'
import ProfileView from '../views/ProfileView.vue'
import SettingsView from '../views/SettingsView.vue'
import RepositoryView from '../views/RepositoryView.vue'
import WebManagerView from '../views/WebManagerView.vue'

const routes = [
  {
    path: '/start',
    name: 'Start',
    component: StartView
  },
  {
    path: '/',
    redirect: '/start'
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileView,
    children: 
    [
      {
        path: 'settings',
        name: 'Settings',
        component: SettingsView
      },
      {
        path: 'repository',
        name: 'Repository',
        component: RepositoryView
      },
      {
        path: 'manager',
        name: 'WebManager',
        component: WebManagerView
      },
      {
        path: '',
        redirect: { name: 'WebManager' }
      }
    ]
  }
]

const router = createRouter(
{
  history: createWebHistory(),
  routes
})

export default router