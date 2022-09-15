//AQUI TENEMOS LOS OBJETOS QUE CONTENDRAN LA INFORMACIÓN
const state = {
    mycart: [],
    total: 0.00
}
//AQUI TENEMOS LOS OBJETOS QUE AL INVOCARLOS NOS RETORNAN LOS VALORES CORRESPONDIENTES
const getters = {
    getMyCart: (state) => state.mycart,
    getTotal: (state) => state.total,
}
//AQUI TENEMOS LOS OBJETOS QUE AL INVICARLOS EJECUTAN EL COMMIT A LAS MUTACIONES QUE LE HAYAMOS ESPECIFICADO 
//Y PROVEEN LA INFORMACION QUE SE REQUIERA
const actions = {
    add({ commit }, product) {
        commit('ADD_TO_CART', product);
    },
    clear({ commit }){
        commit('CLEAR_CART');
    }
}
//LAS MUTACIONES EJECUTAN Y HACEN LOS CAMBIOS A LOS VALORES DEL STATE O EJECUTAN ACCIONES COMO
//GUARDAR EN STORAGE ENTRE OTRAS MAS
const mutations = {
    ADD_TO_CART(state, product) {
        state.mycart.push(product);
        state.total = state.total + product.price
    },
    CLEAR_CART(state) {
        state.mycart = [];
        state.total = 0.00
    },
}

export const cart = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}



