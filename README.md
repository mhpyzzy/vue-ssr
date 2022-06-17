# ssr

## 安装依赖

```
yarn install
```

### 开发

```
yarn dev
```

### 发布

```
yarn build
yarn start

```

### 数据获取 

> 在 created 生命周期获取数据，可以运行在客户端和服务端

> ssr 插件在 vue挂在了 $createFetcher 方法，此方法参数需要传入一个返回promise 的函数

> 此方发可以在任意组件内使用, 示例如下:

```
	async created() {
		const fetcher = this.$createFetcher(this.fetchName);
		const res = await fetcher();
		this.home_id = res;
	},
```

#### 远程组件

目前只能在客户端引入远程组件，可以查看 entry-client.js 中的示例
