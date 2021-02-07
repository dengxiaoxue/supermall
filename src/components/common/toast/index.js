import Toast from './Toast'

const obj = {}
obj.install = function(Vue) {
    //创建组件构造器
    const constructor = Vue.extend(Toast)

    //new的方式，根据组件构造器，创建组件对象
    const toast = new constructor()

    //将组件对象，手动挂载到某个元素上
    toast.$mount(document.createElement('div'))

    //toast.$el对应的就是div
    document.body.appendChild(toast.$el)

    //挂到Vue的原型上
    Vue.prototype.$toast = toast
}

export default obj;