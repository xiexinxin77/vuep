const storageUtil = {
    /**
     * 存储sessionStorage
     */
    setSession: (name, content) => {
        if (!name) return;
        if (typeof content !== 'string') {
            content = JSON.stringify(content);
        }
        window.sessionStorage.setItem(name, content);
    },

    /**
     * 获取sessionStorage
     */
    getSession: name => {
        if (!name) return;
        return window.sessionStorage.getItem(name);
    },

    /**
     * 获取sessionStorage的JSON值
     */
    getJsonSession: name => {
        if (!name) return;
        let result = null;
        try {
            result = JSON.parse(window.sessionStorage.getItem(name))
        } catch (error) {
            result = null;
        }
        return result;
    },

    /**
     * 删除sessionStorage
     */
    removeSession: name => {
        if (!name) return;
        window.sessionStorage.removeItem(name);
    },

    /**
     * 从sessionStorage删除所有保存的数据
     */
    removeAllSession: name => {
        window.sessionStorage.clear();
    }
}

const plugin = {
    install(Vue) {
        // 添加全局方法或属性
        Vue.storage = storageUtil
        // 添加实例方法
        Vue.prototype.$storage = storageUtil
    },
    $storage: storageUtil
}

export default plugin
export const install = plugin.install