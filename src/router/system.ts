import UserManager from '@/views/System/UserManager/index.vue';
import ApplicationManagement from '@/views/System/ApplicationManagement/index.vue';
import CountryManager from '@/views/System/CountryManager/index.vue';
import CurrenciesManager from '@/views/System/CurrenciesManager/index.vue';
import PlatformManager from '@/views/System/PlatformManager/index.vue';
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
    path: 'system/countryManager',
    name: 'countryManager',
    meta: { title: '国家管理' },
    component: CountryManager
  },
  {
    path: 'system/currenciesManager',
    name: 'currenciesManager',
    meta: { title: '货币管理' },
    component: CurrenciesManager
  },
  {
    path: 'system/platformManager',
    name: 'platformManager',
    meta: { title: '平台管理' },
    component: PlatformManager
  },
  {
    path: 'system/test',
    name: 'test',
    meta: { title: '测试' },
    component: Test
  }
]