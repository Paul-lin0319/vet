import UserManager from '@/views/System/userManager/index.vue';
import Test from '@/views/System/userManager/test.vue';
export default [
  {
    path: 'userManager',
    name: 'userManager',
    meta: { title: '用户管理' },
    component: UserManager
  },
  {
    path: 'test',
    name: 'test',
    meta: { title: '测试' },
    component: Test
  }
]