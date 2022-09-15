import AuthService from '../services/auth.services'
const userAuth = JSON.parse(localStorage.getItem('tokenTec'));

//AQUI TENEMOS LOS OBJETOS QUE CONTENDRAN LA INFORMACIÓN
const state = {
    dataUser: userAuth ? userAuth : undefined,
}

//AQUI TENEMOS LOS OBJETOS QUE AL INVOCARLOS NOS RETORNAN LOS VALORES CORRESPONDIENTES
const getters = {
    getDataUser: (state) => state.dataUser ? state.dataUser : null,
}

//AQUI TENEMOS LOS OBJETOS QUE AL INVICARLOS EJECUTAN EL COMMIT A LAS MUTACIONES QUE LE HAYAMOS ESPECIFICADO 
//Y PROVEEN LA INFORMACION QUE SE REQUIERA
const actions = {
    logout({ commit }) {
        commit('LOGOUT');
    },

    login({ commit }, data) {
        return AuthService.login(data).then(
            response => {
                commit('SET_LOGIN', response.data);
                return Promise.resolve(response.status);
            },
            error => {
                commit('FAIL_SET_LOGIN', error);
                return Promise.reject(false);
            }
        );
    },
}

//LAS MUTACIONES EJECUTAN Y HACEN LOS CAMBIOS A LOS VALORES DEL STATE O EJECUTAN ACCIONES COMO
//GUARDAR EN STORAGE ENTRE OTRAS MAS
const mutations = {
    LOGOUT(state) {
        state.dataUser = undefined;
        localStorage.removeItem('tokenTec');
    },
    SET_LOGIN(state, data) {
        state.dataUser = data
        localStorage.setItem('tokenTec', JSON.stringify(state.dataUser));
    },
}

export const auth = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}



