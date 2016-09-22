/**
 * 加入数组处理
 */
export default class Stack {

    constructor() {
        this._cache = []
    }

    /**
     * 加入尾部
     * @param  {Function} fn [description]
     * @return {[type]}      [description]
     */
    push(fn) {
        this._cache.push(fn)
    }

    /**
     * 从头部取出全部执行
     * @return {[type]} [description]
     */
    shiftAll() {
        if (this._cache.length) {
            let fn
            while (fn = this._cache.shift()) {
                fn.apply(null, arguments)
            }
        }
        return this
    }

    destroy() {
        this._cache = null
    }

}
