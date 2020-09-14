---
title: hugo--blogdown生成的目录
author: zsc
date: '2017-12-30'
tags:
  - hugo
keywords:
  - mysite
  - mysite keyword
  - 关键词
description: Where you should come to find my homepage updates and stuff圣诞节三个五万个
---



#### 1、先介绍一下有hugo生成的目录

```
站点下面的目录和必须的文件由hugo自己生成。一般它是这样的：

archetypes/                 : 全局原型，也就是内容模板。
|____default.md             : 默认的内容模板，你可以设置好文件头部分，或者为不同的类型设置模板
content/                    ：内容，存放“XXX.md”/"XXX>Rmd"文件，文件名可以用中文
data/                       ：存放数据文件
layouts/                    ：和archetypes一起将被我们的主题覆盖掉
public/                     ：生成目录，所有的静态页面都在这里，上传服务器仅传这个就行。
static/                     ：静态目录，完全复制到public。比如图片、js、php脚本
themes/                     ：主题目录，一个站可有多个主题，就像换衣服
|____aaa                    ：主题aaa，可以有很多个
|____bbb                    ：主题bbb
     |____archetypes        : 主题的内容模板
     |____layouts           ：布局，就是html模板
     |____static            ：静态的，放主题的js，css文件
     |____LICENSE.md        ：这个，呵呵，不说大家也知道
     |____theme.toml        ：主题的信息配置
config.toml                 ：站点配置文件，可以配置站点名字等等很多信息
```

主题部分并未全部介绍，这个将在主题部分详细讲解。

#### 2、静态文件

不需要hugo处理的文件叫做静态文件。存放在 **站点的static** 目录是个好主意。

> static目录下的文件将会原封不动的复制到public下面，比如您建立了个img的目录存图片，在md文件中将直接使用”img/aaa.jpg”来引用图片，
>
> 特别的，如果您的站点有php等脚本运用，和一些其他的文件，比如各搜索引擎的验证文件等，也可以放在这里。不建议直接将文件存放于public目录，因为我习惯不高兴就删了全来！相信你也会有不高兴的时候的。（后面比如要上传的google网站分析的html文件）

#### 3、站点配置文件

站点根目录下有一个”config.toml“就是配置文件  `E:\test_blog`下的config.toml 

##### 信息存在的地，hugo有三个地方可以放信息，

+ 一个是站点的配置文件“config.toml”，
+ 一个是我们文章文件md文件的头部（默认的用三个“---”号开始和结束，也可以用三个“+++”号
+ 最后一个是“data”数据目录。

congfig.toml该文件默认支持的[全部参数](http://www.zimustudio.com/hugo/hugopeizhi.html)：可以用键值对，也可以用赋值语句

以 hugo-lithium-theme主题为例

介绍几个后面可能会用的参数

```
baseurl = "http://qaz.netlify.com"    # 基础路径,当自己有网站的时候就写自己的
relativeurls = true                    #使用想对路径方便本地浏览
languageCode = "zh-cn"                #编码
title = "A Hugo website"			#网站的title
theme = "hugo-lithium-theme"
googleAnalytics = ""                 #谷歌网站分析添加自己的id，形如：UA-XXXXXX-X
disqusShortname = "http-qaz-netlify-com"  # disqusShortname 的名字，一定要找准
ignoreFiles = ["\\.Rmd$", "\\.Rmarkdown$", "_files$", "_cache$"] 
hasCJKLanguage = true         #若要统计中文字数设置为ture,默认统计英文
```

#### 4、自定义信息

站点配置文件并不是只能存放默认的配置项目的，它一样可以存放自定义的数据，并且在模版中被调用。

下面是本站的目录的自定义信息：

```
[permalinks]
    post = "/:year/:month/:day/:slug/"

[[menu.main]]
    name = "About"
    url = "/about/"
[[menu.main]]
    name = "GitHub"
    url = "https://github.com/rstudio/blogdown"
[[menu.main]]
    name = "Twitter"
    url = "https://twitter.com/rstudio"

[params]
    description = "A website built through Hugo and blogdown."

    # options for highlight.js (version, additional languages, and theme)
    highlightjsVersion = "9.11.0"
    highlightjsCDN = "//cdn.bootcss.com"
    highlightjsLang = ["r", "yaml"]
    highlightjsTheme = "github"

    MathJaxCDN = "//cdn.bootcss.com"
    MathJaxVersion = "2.7.1"

    [params.logo]
    url = "logo.png"
    width = 50
    height = 50
    alt = "Logo"

```







找到`E:\test_blog\themes\hugo-lithium-theme\layouts\` 下面有两个文件夹

一个`_default/` ` partials/`