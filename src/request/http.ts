import axios from 'axios'; // 引入axios
import QS from 'qs'; // 引入qs模块，用来序列化post类型的数据，后面会提到
import { Message } from 'element-ui'; // elementde提示消息组件


// 环境的切换
let baseURL: string = '';
if (process.env.NODE_ENV == 'development') {
  // axios.defaults.baseURL = 'https://www.baidu.com';
}
else if (process.env.NODE_ENV == 'debug') {
  // axios.defaults.baseURL = 'https://www.ceshi.com';
}
else if (process.env.NODE_ENV == 'production') {
  // axios.defaults.baseURL = 'https://www.production.com';
}


const service = axios.create({
  baseURL,
  headers: {
    get: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    post: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  },
  // 跨域请求时是否需要使用凭证
  // withCredentials: true,
  // 请求 30s 超时
  timeout: 1000 * 15,
  validateStatus() {
    // 使用async-await，处理reject情况较为繁琐，所以全部返回resolve，在业务代码中处理异常
    return true
  },
  // 在向服务器发送请求前，序列化请求数据
  transformRequest: [data => {
    data = JSON.stringify(data)
    return data
  }],
  // 在传递给 then/catch 前，修改响应数据
  transformResponse: [data => {
    if (typeof data === 'string' && data.startsWith('{')) {
      data = JSON.parse(data)
    }
    return data
  }]
});

// 根据不同的状态码，生成不同的提示信息
const showStatus = (status: number | string) => {
  let message = ''
  // 这一坨代码可以使用策略模式进行优化
  switch (parseInt(status as string)) {
    case 400:
      message = '请求错误(400)'
      break
    case 401:
      message = '未授权，请重新登录(401)'
      break
    case 403:
      message = '拒绝访问(403)'
      break
    case 404:
      message = '请求出错(404)'
      break
    case 408:
      message = '请求超时(408)'
      break
    case 500:
      message = '服务器错误(500)'
      break
    case 501:
      message = '服务未实现(501)'
      break
    case 502:
      message = '网络错误(502)'
      break
    case 503:
      message = '服务不可用(503)'
      break
    case 504:
      message = '网络超时(504)'
      break
    case 505:
      message = 'HTTP版本不受支持(505)'
      break
    default:
      message = `连接出错(${status})!`
  }
  return `${message}，请检查网络或联系管理员！`
}

export default service;