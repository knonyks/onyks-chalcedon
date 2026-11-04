import { createRouter, createWebHistory } from 'vue-router'
import StartView from '../views/StartView.vue'
import ProfileView from '../views/ProfileView.vue'
import RepositoryView from '../views/profile/RepositoryView.vue'
import SettingsView from '../views/profile/SettingsView.vue'
import CreateProfileView from '../views/CreateProfileView.vue'

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
    path: '/create-profile',
    component: CreateProfileView
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
    ]
  }
]

const router = createRouter(
{
  history: createWebHistory(),
  routes
})

export default router