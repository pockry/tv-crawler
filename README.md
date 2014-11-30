TV Crawler
=======================

一个英美剧的爬虫。使用trakt.tv提供的API。

> 注： 本项目不以速度见长，仅为爬取和存储信息。

##Demo

在线demo： https://tvcrawler.herokuapp.com/

**Screenshot截图**：

![Screenshot](http://photo.u.qiniudn.com/tvcrawler20141130213255.png) 

**技术栈**：

* Node.js
* Mongoose
* superagent
* Vue.js

##依赖

你需要先安装MongoDB和Node.js。

##用法

```bash
git clone https://XXXXX/pockry/tv-crawler.git tvcrawler

cd tvcrawler

npm install

mongod -dbpath XXX

npm start
```

你还需要去[trakt.tv](http://www.trakt.tv/)注册，就会有一个`api key`，然后填到 `config/secrets.js` 中的对应位置：

```
...

trakt: 'api key'

```

License

MIT.