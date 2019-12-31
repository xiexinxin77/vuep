/**
 * axios请求配置文件
 * @author  xzx
 */

import Qs from 'qs'

let axiosConfig = {

    url: '/',
    method: 'POST', // default 
    baseURL: 'http://localhost:8086/', // + ':' + baseConfig.$basecfg.httpConfig.basePort,

    // `transformRequest`允许在请求数据发送到服务器之前对其进行更改
    // 这只适用于请求方法'PUT'，'POST'和'PATCH'
    // 数组中的最后一个函数必须返回一个字符串，一个 ArrayBuffer或一个 Stream
    transformRequest: [function (data) {
        if (typeof (data) == 'string') {
            return data;
        } else if (typeof (data) == 'object') {
            data = Qs.stringify(data);
            return data;
        }
    }],

    // `transformResponse`允许在 then / catch之前对响应数据进行更改
    transformResponse: [function (data) {
        if (typeof (data) == 'string') {
            data = JSON.parse(data);
            return data;
        } else if (typeof (data) == 'object') {
            return data;
        }
    }],

    // `headers` are custom headers to be sent 
    headers: {
        'Content-Type': 'text/plain; charset=utf-8'
    },

    // `params` are the URL parameters to be sent with the request 
    // Must be a plain object or a URLSearchParams object 
    params: {},

    // `paramsSerializer`是一个可选的函数，负责序列化`params`
    paramsSerializer: function (params) {
        return Qs.stringify(params)
    },

    data: {},

    timeout: 60000,
    retryDelay: 1000, // 超时请求重试延时时间，单位ms
    retry: 0, // 超时请求重试次数
    // `withCredentials`指示是否跨站点访问控制请求
    withCredentials: false, // default 

    // `auth'表示应该使用 HTTP 基本认证，并提供凭据。
    // 这将设置一个`Authorization'头，覆盖任何现有的`Authorization'自定义头，使用`headers`设置。
    // auth: {
    //   username: 'janedoe',
    //   password: 's00pers3cret'
    // },

    // “responseType”表示服务器将响应的数据类型
    // options are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream' 
    responseType: 'json', // default 

    // `xsrfCookieName`是要用作 xsrf 令牌的值的cookie的名称
    // xsrfCookieName: 'XSRF-TOKEN', // default 

    // `xsrfHeaderName`是携带xsrf令牌值的http头的名称
    // xsrfHeaderName: 'X-XSRF-TOKEN', // default 

    // `onUploadProgress`允许处理上传的进度事件
    // onUploadProgress: function (progressEvent) {
    //   // Do whatever you want with the native progress event 
    // },

    // `onDownloadProgress`允许处理下载的进度事件 
    // onDownloadProgress: function (progressEvent) {
    //   // Do whatever you want with the native progress event 
    // },

    // `maxContentLength`定义允许的http响应内容的最大大小 
    maxContentLength: 20000,

    // `validateStatus`定义是否解析或拒绝给定的promise
    // HTTP响应状态码。如果`validateStatus`返回`true`（或被设置为`null` promise将被解析;否则，promise将被
    // 拒绝。
    validateStatus: function (status) {
        return status >= 200 && status < 300; // default 
    },

    // `maxRedirects`定义在node.js中要遵循的重定向的最大数量。
    // 如果设置为0，则不会遵循重定向。 
    maxRedirects: 5 // default 

    // `httpAgent` and `httpsAgent` define a custom agent to be used when performing http 
    // and https requests, respectively, in node.js. This allows options to be added like 
    // `keepAlive` that are not enabled by default. 
    // httpAgent: new http.Agent({ keepAlive: true }),
    // httpsAgent: new https.Agent({ keepAlive: true }),

    // 'proxy'定义代理服务器的主机名和端口
    // `auth`表示HTTP Basic auth应该用于连接到代理，并提供credentials。
    // 这将设置一个`Proxy-Authorization` header，覆盖任何使用`headers`设置的现有的`Proxy-Authorization` 自定义 headers
    // proxy: {
    //   host: '127.0.0.1',
    //   port: 81,
    //   auth: {
    //     username: 'mikeymike',
    //     password: 'rapunz3l'
    //   }
    // },

    // “cancelToken”指定可用于取消请求的取消令牌
    // (see Cancellation section below for details) 
    // cancelToken: new CancelToken(function (cancel) {
    // })
}

const plugin = {
    install(Vue) {
        // 添加全局方法或属性
        Vue.axioscfg = axiosConfig
        // 添加实例方法
        Vue.prototype.$axioscfg = axiosConfig
    },
    $axioscfg: axiosConfig
}

export default plugin
export const install = plugin.install