import {
    ADD_COUNTER,
    ADD_TO_CART
} from './mutation-types'

export default {
    [ADD_COUNTER](state, payload) {
        payload.count++;
    },
    [ADD_TO_CART](state, payload) {
        payload.checked = true
        state.cartList.push(payload)
    },
    allCheckedTrue(state, payload) {
        state.cartList.forEach(element => {
            element.checked = true
        });
    },
    allCheckFalse(state, payload) {
        state.cartList.forEach(e => {
            e.checked = false
        })
    }
}