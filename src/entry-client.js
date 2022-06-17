/**
 * @name entry-client.js
 * @description 客户端入口
 * @author AEX 前端团队
 * @create_date 2022/03/31 17:37:26
 */
import Vue from 'vue';
import createApp from './main';
import { ssrClient } from './utils/ssr';
Vue.use(ssrClient);
const { app, router, store } = createApp();

// TODO: 联邦模块全局引入
// import { loadRemoteComponent } from './utils/mf';
// Vue.mixin({
// 	components: {
// 		AexLayout: async () => {
// 			const module = await loadRemoteComponent({
// 				url: 'http://localhost:8080/page/remoteEntry.js',
// 				scope: '__REMOTE_COMMON',
// 				module: './components/layout',
// 			});
// 			return module;
// 		},
// 		Test: async () => {
// 			const module = await loadRemoteComponent({
// 				url: 'http://localhost:8080/page/remoteEntry.js',
// 				scope: '__REMOTE_COMMON',
// 				module: './components/test',
// 			});
// 			return module;
// 		},
// 	},
// });

router.onReady(async () => {
	// 从 window.__INITIAL_STATE__ 中解构出 $$selfData
	if (window.__INITIAL_STATE__) {
		const { $$stroe = {}, $$selfData = {} } = window.__INITIAL_STATE__;
		store.replaceState($$stroe); // 从服务端接手vuex
		app.$$selfData = $$selfData; // 从服务端接手当前组件 data
	}
	// 将Vue实例挂载到dom中，完成浏览器端应用启动
	app.$mount('#app');

	ssrClient.$$resolved = true;
});
