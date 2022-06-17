/**
 * @name main
 * @description 应用的通用入口，在此文件中导出vue实例。在客户端，将vue实例挂载到 dom上；在服务端，将其渲染为html字符串
 * @author AEX 前端团队
 * @create_date 2022/06/07 15:39:15
 */
import Vue from 'vue';
import App from './App';
import VueMeta from 'vue-meta';
import createRouter from './router';
import createStore from './store';
import { sync } from 'vuex-router-sync';

Vue.config.productionTip = false;
Vue.use(VueMeta);
import { Toast, Text, Input, Button } from 'aex-ui';
Vue.use(Text);
Vue.use(Input);
Vue.use(Button);
Vue.prototype.$toast = Toast;
// 导出创建app的工具函数，防止服务端多实例之间相互影响。
export default (context) => {
	const router = createRouter();
	const store = createStore();
	sync(store, router);
	const app = new Vue({
		router,
		store,
		render: (h) => h(App),
	});
	return { app, store, router };
};
