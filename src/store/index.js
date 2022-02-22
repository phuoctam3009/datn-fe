import Vue from "vue";
import Vuex from "vuex";
import { auth } from './auth.module';
import { getField, updateField } from 'vuex-map-fields';



Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loading: true,
        lightNavbar: false,
        activeSection: 'home',
        controlValue: {
            showLayout: false,
            floatLayout: true,
            enableDownload: true,
            previewModal: true,
            paginateElementsByHeight: 1100,
            manualPagination: false,
            filename: 'Hee Hee',
            pdfQuality: 2,
            pdfFormat: 'a4',
            pdfOrientation: 'portrait',
            pdfContentWidth: '800px'
        }
    },
    mutations: {
        SET_LOADING(state, loading) {
            state.loading = !!loading;
        },
        SET_LIGHT_NAVBAR(state, light) {
            state.lightNavbar = !!light;
        },
        SET_ACTIVE_SECTION(state, section) {
            state.activeSection = section;
        },
        updateField
    },
    getters: {
        getField
    },
    actions: {},
    modules: {
        auth
    }
});
