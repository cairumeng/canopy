import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:4000/api'

// http response 拦截器
axios.interceptors.response.use(
  response => {
    const data = response.data

    return data
  },
  err => {
    // 这里是返回状态码不为200时候的错误处理
    // // 根据返回的code值来做不同的处理(和后端约定)
    // switch (data.code) {
    //     case 401:
    //         break;
    //     case 403:
    //         break;
    //     case 404:
    //         console.log('404')
    //         break;
    //     case 500:
    //         break;
    //     default:
    //         return data;
    // }

    return Promise.reject(err.response.data)
  }
)

export default axios
