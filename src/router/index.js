import { createRouter, createWebHistory } from 'vue-router'

import SettingsView from '../views/SettingsView.vue'
import RepositoryManagementView from '../views/RepositoryManagementView.vue'
import ManagerSiteView from '../views/ManagerSiteView.vue'

const routes = [
  {
    path: '/settings',
    name: 'Settings',
    component: SettingsView
  },
  {
    path: '/repository',
    name: 'repository',
    component: RepositoryManagementView
  },
  {
    path: '/',
    name: 'Manager',
    component: ManagerSiteView
  }
]

const router = createRouter(
{
  history: createWebHistory(),
  routes
})

export default router