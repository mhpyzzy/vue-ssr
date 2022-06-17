/**
 * @name entry-server.js
 * @description 服务端入口
 * @author AEX 前端团队
 * @create_date 2022/03/31 17:37:26
 */
import Vue from 'vue';
import createApp from './main';
import { ssrServer } from './utils/ssr';
Vue.use(ssrServer);

// TODO: 后续调试
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
export default async (context) => {
	const { url } = context;
	const { app, router, store } = createApp(context);
	const meta = app.$meta();
	router.push(url);
	context.meta = meta; // 将meta信息添加到渲染上下文中
	//  router回调函数
	await new Promise(router.onReady.bind(router));
	context.rendered = ssrServer.done;
	// Renderer 会把 context.state 数据对象内联到页面模板中
	// 最终发送给客户端的页面中会包含一段脚本：window.__INITIAL_STATE__ = context.state
	// 客户端就要把页面中的 window.__INITIAL_STATE__ 拿出来填充到客户端 store 容器中
	context.state = {
		$$stroe: store ? store.state : undefined,
		$$selfData: app.$$selfData,
	};

	return app;
};
