import { createRouter, createWebHistory } from 'vue-router'
import StartView from '../views/StartView.vue'
import ProfileView from '../views/ProfileView.vue'
import SettingsView from '../views/profile/SettingsView.vue'
import CreateProfileView from '../views/CreateProfileView.vue'
import EditProfileView from '../views/EditProfileView.vue'
import { useLoaderStore } from '@bloodstone/stores/loader';


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
    path: '/edit-profile',
    component: EditProfileView
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
          { 
            path: 'dashboard',
            component: () => import('@bloodstone/views/DashboardView.vue')
          },
          { path: 'management', component: () => import('@bloodstone/views/ManagementView.vue'), name: 'management' },
          { path: 'repository', component: () => import('@bloodstone/views/RepositoryView.vue') },
          { path: 'settings', component: () => import('@bloodstone/views/SettingsView.vue') },
          { path: 'admin', component: () => import('@bloodstone/views/AdminView.vue') },
          {
            path: 'elements/create',
            name: 'element-create',
            component: () => import('@bloodstone/views/ElementView.vue')
          },
          {
            path: 'elements/details/:uuid',
            name: 'element-details',
            component: () => import('@bloodstone/views/ElementView.vue'),
          },
          {
            path: 'elements/edit/:uuid',
            name: 'element-edit',
            component: () => import('@bloodstone/views/ElementView.vue'),
          },
          {
            path: 'elements/duplicate/:uuid',
            name: 'element-duplicate',
            component: () => import('@bloodstone/views/ElementView.vue'),
          },
        ]
      }
    ]
  }
]

const router = createRouter(
{
  history: createWebHistory(),
  routes
})

router.beforeEach(() => 
{
  const loaderStore = useLoaderStore()
  loaderStore.isLoading = true
  return;
});

export default router