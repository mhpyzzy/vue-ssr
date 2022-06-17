import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default () => {
	return new Vuex.Store({
		state: {
			test: 'ssr demo',
			txt: 'crsssdfsdfs',
		},
		mutations: {},
		actions: {
			test() {
				this.state.test = 'home page';
			},
			txt({}, txts) {
				console.log('------', txts);
				this.state.txt = txts;
			},
		},
	});
};
