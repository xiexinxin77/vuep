import axios from 'axios'
import axiosConfig from './axiosConfig'
const sysConfig = {
    K_Request(serviceCode, params) {
        let that = this;
        return new Promise((resolve, reject) => {
            let data = that.buildRequestData(serviceCode, params)
            axios.post('/', data, axiosConfig.$axioscfg).then(ansData => {

            })
        })
    },
    buildRequestData(serviceCode, params) {
        params['service'] = serviceCode;
        let request = {
            'REQUESTS': [{
                'REQ_MSG_HDR': params
            }]
        };
        return JSON.stringify(request);
    }
}

const plugin = {
    install(Vue) {
        Vue.sysConfig = sysConfig
        Vue.prototype.$sysConfig = sysConfig
    },
    $sysConfig: sysConfig
}

export default plugin
export const install = plugin.install