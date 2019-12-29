const defines = {
    'TOKEN': 'token' // 登录令牌
}

const plugin = {
    install(Vue) {
        Vue.prototype.$defineCfg = defines
    },
    $defineCfg: defines
}

export default plugin
export const install = plugin.install