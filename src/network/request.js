import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/z8',
    timeout: 5000
  })
  //axios拦截器
  //请求拦截作用
  instance.interceptors.request.use(config => {
    return config
  })
  //响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  },error => {
    console.log(error);
  })
  //发送真正的网络请求
  return instance(config)
}

/*
export function request(config) {
  return new Promise((resolve, reject) => {
    //1.创建axios的实例
    const instance = axios.create({
      baseURL: 'http://152.136.185.210:8000/api/n3',
      timeout: 5000
    })
    //发送真正的网络请求
    instance(config)
        .then(res => {
          resolve(res)
        })
        .catch(error =>{
          reject(error)
        })
  })


}*/
