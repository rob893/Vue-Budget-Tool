import Vue from "vue";
import Vuex, { StoreOptions, Store } from "vuex";
import { RootState } from './types';

Vue.use(Vuex);

const storeOptions: StoreOptions<RootState> = {
    state: {
        counter: 0
    }
};

export const store: Store<RootState> = new Store<RootState>(storeOptions);