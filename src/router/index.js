import { createRouter, createWebHistory } from 'vue-router'
import StartView from '../views/StartView.vue'
import ProfileView from '../views/ProfileView.vue'
import RepositoryView from '../views/profile/RepositoryView.vue'
import SettingsView from '../views/profile/SettingsView.vue'
import CreateProfileView from '../views/CreateProfileView.vue'
import { useAuthStore } from '@bloodstone/stores/auth';

const routes = [
  {
    path: '/start',
    name: 'start',
    component: StartView
  },
  {
    path: '/',
    redirect: '/start'
  },
  {
    path: '/create-profile',
    component: CreateProfileView
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
    children: 
    [
      {
        path: 'settings',
        name: 'settings',
        component: SettingsView
      },
      {
        path: 'manager',
        name: 'manager',
        children:
        [
          { path: 'dashboard', component: () => import('@bloodstone/views/DashboardView.vue') },
          { path: 'management', component: () => import('@bloodstone/views/ManagementView.vue') },
          { path: 'repository', component: () => import('@bloodstone/views/RepositoryView.vue') },
          { path: 'settings', component: () => import('@bloodstone/views/SettingsView.vue') },
          { path: 'admin', component: () => import('@bloodstone/views/AdminView.vue') }
        ]
      }

      // { path: 'repository', component: () => import('@bloodstone/views/RepositoryView.vue') },
      // { path: 'settings', component: () => import('@bloodstone/views/SettingsView.vue') },
    ]
  }
]

const router = createRouter(
{
  history: createWebHistory(),
  routes
})

export default router