import UserManager from '@/views/System/UserManager/index.vue';
import ApplicationManagement from '@/views/System/ApplicationManagement/index.vue';
import Test from '@/views/System/UserManager/test.vue';
export default [
  {
    path: 'system/userManager',
    name: 'userManager',
    meta: { title: '用户管理' },
    component: UserManager
  },
  {
    path: 'system/applicationManagement',
    name: 'applicationManagement',
    meta: { title: '应用管理' },
    component: ApplicationManagement
  },
  {
    path: 'system/test',
    name: 'test',
    meta: { title: '测试' },
    component: Test
  }
]