---
title: 利用RSelenium包模拟浏览器爬取网页信息
author: zsc
date: "2018-04-06"
tags:
  - R
  - Selenium
Toc: true
---

## **1.背景介绍：**

**现在很多网页都采用AJAX这种异步加载的网页结构，简单的页面爬取不了这些数据**

例如：



2、这是需要R包---RSelenium包



使用RSelenium包的准备

0、JAVA 环境的准备 ，安装是否成功可以进行[xlsx包进行测试](https://zsc.netlify.com/md/2018-01-07-r%E9%81%87%E5%88%B0%E7%9A%84%E9%97%AE%E9%A2%98/)

1、[Chrome驱动](http://npm.taobao.org/mirrors/chromedriver) 下载,注意chrome驱动一定要和chrome浏览器对应 ,比如我的浏览器 65.0.3325.181  ，对应表放在文章最后,或者[点击这里](https://blog.csdn.net/huilan_same/article/details/51896672),,怎么查看浏览器版本，点击谷歌浏览器右上【...】---【帮助】--【关于Google Chrome】就可以看到浏览器版本了。

2、[Selenium Standalone Server](https://docs.seleniumhq.org/download/)下载   我用的是 selenium-server-standalone-3.11.0.jar

3、[PhantomJS下载](http://phantomjs.org/download.html) ,无头浏览器。(这个个人需要的话就下载，我用Google浏览器就够了)





## **2、安装流程：**

### 使用前的基本配置

1. 首先，安装JAVA JDK 1.8。

2. 然后，安装Chrome（最新版本）。

3. 之后，把解压后的ChromeDriver.exe（最新版本）放在Chrome的安装路径下。一定要和chrome.exe放在同一个目录下面。例如

4. 把chromedriver.exe所在目录的路径(建议放在和chrome.exe)放入环境变量中即可,

5. 基本配置基本完成

   




## 3、RSelenium使用与实例

### 3.1、使用前的基础步骤

1、首先 ，打开cmd ，切换到 selenium-server-standalone-3.0.1.jar文件所在的位置，我的都在C:\RSelenium这个目录下 ，切换以后  ，运行 

`java -jar selenium-server-standalone-3.11.0.jar`

显示 ：

![peizhi1](peizhi1-0406621.png)

或者直接在Rstudio中运行`system('java -jar "C:/RSelenium/selenium-server-standalone-3.11.0.jar"',wait = FALSE)`代码即可。

2、运行后，最小化，不要关闭，在打开Rstudio,

3、通过R调用Selenium Server并打开网页，对页面进行点击，选取相应条件。通过RSelenium与rvest共同爬取数据。通过 一步一步解读Rcode来解释这一过程。

### 3.2、案例1

**浏览器的基本操作**

```R
library(RSelenium)
library(stringr)
setwd("C:\\RSelenium")


######## 初始化浏览器####
remDr <- remoteDriver(
  browserName = "chrome",  # 浏览器可以自己设置firefox、chrome、phantomjs（要配置）
  remoteServerAddr = "localhost",
  port = 4444L)

remDr$open() # 打开浏览器 

remDr$getStatus()# 使用该status方法查询远程服务器的状态。
# 关闭浏览器  
# remDr$quit()  # 直接退出  
# remDr$close()  # close用于关闭当前会话，也可以用作关闭浏览器  

```

**访问DOM中的元素  **

```R
url="https://www.baidu.com/"
remDr$navigate(url)   # 打开网页
# remDr$closeWindow() # 关闭网页 
# remDr$goBack() # 页面返回操作, 页面返回，前进操作，一定要有浏览记录才有这个操作
# remDr$goForward() # 页面前进操作
# remDr$refresh() # 页面刷新

######################################################################################
################################# 定位元素
# # 可以看出百度首页上有一个查询框,对应源代码为<input id=...class=... name= ...</input>
# # 对应<input id="kw" name="wd" class="s_ipt" value="" maxlength="255" autocomplete="off">

########## 按属性--属性值搜索
webElem <- remDr$findElement(using = 'name', value = "wd") # 添上对应属性与属性值
########## 按id--id值搜索
webElem <- remDr$findElement(using = 'id', value = "kw")
########## 按class--class值搜索
webElem <- remDr$findElement(using = 'class', value = "s_ipt")
########## 按css选择器进行搜索
webElem <- remDr$findElement(using = 'css', "#kw") #css选择器id用#  ，class用.
webElem <- remDr$findElement(using = 'css', ".s_ipt") 
########## 按xpath进行搜索
webElem <- remDr$findElement(using = 'xpath', "//*[@id='kw']") 
webElem <- remDr$findElement(using = 'xpath', "//*[@class='s_ipt']") 


#####################################################################################
###################上面找了这么多元素，拿来干嘛呢-----可以发送事件给元素
#####################################################################################
url <- 'http://www.baidu.com'  
remDr$navigate(url)  
############################### 单击操作
#### 单击操作---方法一
webElem <- remDr$findElement(using = 'xpath', value = '//*[@id="su"]')  
remDr$mouseMoveToLocation(webElement = webElem)  # 移动鼠标至该元素 
remDr$click() # 单击  
#### 单击操作---方法二
webElem <- remDr$findElement(using = 'xpath', value = '//*[@id="su"]')  
webElem$clickElement() # 单击  


################################## 进行搜索关键词
webElem <- remDr$findElement(using = 'css', "#kw") # 找到这个元素--进行搜索关键词
webElem$sendKeysToElement(list("京东",key="enter"))
#### 提取搜索后页面的所有标题，每个链接的标题都包含在<h3 class = "t">标签中.
webElems <- remDr$findElements(using = 'css', "h3.t")##注意 findElement(s)方法的区别
resHeaders <- unlist(lapply(webElems, function(x){x$getElementText()})) #
resHeaders# 获取网页搜索后的标题
p=which(resHeaders ==resHeaders[1])# 可以看出有名字重复的标签
webElem=webElems[[min(p)]]# 找到对应的标题
webElem$clickElement() ######  并对标题进行鼠标点击


###############################################
remDr$getCurrentUrl() ##获取当前url
remDr$getTitle() #当前页面的title
webpage=remDr$getPageSource()[[1]][1] #获取当前页面 渲染以后的源代码

# ########################
# ### 保存为本地文件
# con=file("test.html",encoding = "utf-8")
# writeLines(webpage,con)
# close(con)
# ##########################


```

**窗口页面切换**

许多时候我们点链接的时候，会打开新的标签页 selenium 则会保持在原来的页面上，这是我们便需要切换页面

```R
remDr$getCurrentUrl()# 获取当前窗口页面的url
remDr$getCurrentWindowHandle()# 查看当前属于哪个窗口页面
remDr$getTitle()# 当前窗口页面的标题
remDr$getWindowHandles() # 获取当前浏览器所有的窗口页面
## 现在进行页面跳转
remDr$getWindowHandles()[[2]] %>% remDr$switchToWindow()
```

上面展示了从第一个标签页切换到第二个标签页的

**frame 切换**

现在流行组件式开发。反正就是 HTML 嵌套 HTML，明明选对元素，但是结果就是不对。这是便需要切换到对应的 frame 中。

```R
# 如果 Frame 有 id
remDr$switchToFrame("id")
# 没有 id ，需要自己定位，css xpath... 都行
remDr$switchToFrame(remDr$findElement(using = "css",value = ""))
# 多层的话，就层层切
# 返回到原来的位置
remDr$switchToFrame(NULL)
```





**注入JavaScript  **

```R
##########输入URL 并打开这个网页##############
url="http://www.cpppc.org:8082/efmisweb/ppp/projectLibrary/toPPPList.do"
remDr$navigate(url)  # 打开网页
webpage=remDr$getPageSource()[[1]][1] #获取当前页面 渲染以后的源代码

################# 页面拉到最下面 --JavaScript脚本
scripts <- "window.scrollTo(0,document.body.scrollHeight)"  
remDr$executeScript(script = scripts,args = list("dummy"))
Sys.sleep(3)


#######################################
# ###  模拟点击下一页按钮--css选择器 或者 xpath---JavaScript
####################################
# ### 方法一---css
# nextBtn <- remDr$findElement(using = 'css selector',
#                              value = ".pag > a:nth-child(7)")
# nextBtn$clickElement()# 点击元素

# ### 方法二 ---xpath
# nextBtn <- remDr$findElement(using = 'xpath',
#                              value = "/html/body/div[3]/div/div[3]/div[2]/div/a[3]")
# nextBtn$clickElement()# 点击元素

# ### 方法三 --JavaScript
nextpage="getNextPage();"  ####  可用str_c()字符串拼接而成
remDr$executeScript(nextpage,args = list("dummy"))
####################################
webpage=remDr$getPageSource()[[1]][1] #获取当前页面 渲染以后的源代码

###########################
##### 结合rvest包解析元素####
##########################
library(rvest)
web_page=read_html(remDr$getPageSource()[[1]][1])

```



### 3.3、案例2

  备注 ：有些网页 点击下一页会报错 ，这时候需要最大化窗口：

```R
#####  航班信息网站
url="http://www.umetrip.com/mskyweb/fs/fa.do?dep=CTU&arr=PEK&date=2018-04-04&channel="
remDr$navigate(url)  # 打开网页

################# 页面拉到最下面 --JavaScript脚本
scripts <- "window.scrollTo(0,document.body.scrollHeight)"
remDr$executeScript(script = scripts,args = list("dummy"))
Sys.sleep(3)

#################################################
##### 找到下一页按钮点击它,有时点击下一页会报错，这时候需要最大化窗口后单击下一页：
######  最大化窗口页面-
remDr$maxWindowSize()## 最大化窗口页面-
nextBtn <- remDr$findElement(using="id",value = "p_next")
nextBtn$clickElement()

#################
```



### 3.4、案例3

截屏 按钮 ：

截图使用screenshot(display = FALSE, useViewer = TRUE, file = NULL)函数,

- display：是否在控制台显示
- file：截图后存放的路径，截的图像是PNG格式。

```R
remDr$screenshot(display = F,file="aa.png")
```

### 3.5、案例4

微博登录 ---自己输入-这个可以人为干预，Selenium可以记录后台的所有操作

```R
url="https://weibo.com/"
remDr$navigate(url)  # 打开网页

## 这里，返回浏览器，输入用户名和密码以及验证码
remDr$getCurrentUrl() #返回当前页面的url

## 搜索关键词
input <- remDr$findElement(using = "class",value = "W_input")
input$sendKeysToElement(list("中国R语言会议",key="enter"))
```



上述代码参考雪晴数据网的课程[用RSelenium打造灵活强大的网络爬虫](http://www.xueqing.tv/lesson/329)

参考：http://ropensci.github.io/RSelenium/articles/RSelenium-basics.html



#### chromedriver与chrome的对应关系表:

| chromedriver版本 | 支持的Chrome版本 |
| ---------------- | ---------------- |
| v2.37            | v64-66           |
| v2.36            | v63-65           |
| v2.35            | v62-64           |
| v2.34            | v61-63           |
| v2.33            | v60-62           |
| v2.32            | v59-61           |
| v2.31            | v58-60           |
| v2.30            | v58-60           |
| v2.29            | v56-58           |
| v2.28            | v55-57           |
| v2.27            | v54-56           |
| v2.26            | v53-55           |
| v2.25            | v53-55           |
| v2.24            | v52-54           |
| v2.23            | v51-53           |
| v2.22            | v49-52           |
| v2.21            | v46-50           |
| v2.20            | v43-48           |
| v2.19            | v43-47           |
| v2.18            | v43-46           |
| v2.17            | v42-43           |
| v2.13            | v42-45           |
| v2.15            | v40-43           |
| v2.14            | v39-42           |
| v2.13            | v38-41           |
| v2.12            | v36-40           |
| v2.11            | v36-40           |
| v2.10            | v33-36           |
| v2.9             | v31-34           |
| v2.8             | v30-33           |
| v2.7             | v30-33           |
| v2.6             | v29-32           |
| v2.5             | v29-32           |
| v2.4             | v29-32           |



