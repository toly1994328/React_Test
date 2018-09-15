#### 零、前言
>关于React不做自我介绍了。  
create-react-app 快速搭建React环境，自带热加载，服务器。  
电脑与手机在同一wifi下可以通过ip访问项目，实现手机电脑同时预览

```
npx create-react-app my-app
cd my-app
npm start
```

#### 一、第一个React项目：

![第一个默认启动项目.png](https://upload-images.jianshu.io/upload_images/9414344-1aa7d244c4749c4d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##### 精简之后js只留下两个文件：
入口文件：src/index.js

```
import React from 'react';//引入React库
import ReactDOM from 'react-dom';//组件挂载在dom上

//大写字母为组件
import App from './App';
//将App.js渲染入dom
ReactDOM.render(<App />, document.getElementById('root'));

```

渲染文件：src/App.js

```
import React, {Component} from 'react';
//定义React组件
class App extends Component {
    render() {
        return (
            <div >
               hello9
            </div>
        );
    }
}

export default App;
```



---
#### 二、项目配置：

##### 1.内置：react-scripts

>可以看到用 create-react-app创建的项目很简洁,但却能开启服务器，还能热部署。原因在于react-scripts
 
![create-react-app.png](https://upload-images.jianshu.io/upload_images/9414344-9080d77e4767ff04.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##### 2.内置的一些常用库：

```
已内置：webpack,webpack-dev-server,
babel系列、react系列、eslint系列、html-webpack-plugin、
url-loader(limit: 10000)、style-loader、css-loader、file-loader等
```

#### 三、添加sass-loader
>webpack.config.dev.js和webpack.config.prod.js分别代表开发与生产环境，都要改  
autoprefixer：自动加css3浏览器前缀  
打包时与js分开，成css文件(不然js会很大)  

```
npm i node-sass sass-loader -D
```

##### 将App.css改为App.scss 样式就没有作用了，需要配置加载：
>node_modules/react-scripts/config/webpack.config.dev.js  
具体的配置跟源码一起放在github上：详见：

![scss.png](https://upload-images.jianshu.io/upload_images/9414344-f97cf8afda63e112.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![修改样式.png](https://upload-images.jianshu.io/upload_images/9414344-57897b88306bcad1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
