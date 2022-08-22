---
title: RSelenium应用--京东商品
author: zsc
date: "2018-04-07"
tags:
  - R
  - Selenium
---



```R
library(RSelenium)
library(stringr)
setwd("E:\\rwork\\Rselenium")

######## 初始化浏览器####
remDr <- remoteDriver(
  browserName = "chrome",  # 浏览器可以自己设置firefox、chrome、phantomjs（要配置）
  remoteServerAddr = "localhost",
  port = 4444L) # 默认情况下，Selenium Server侦听端口为4444

remDr$open() # 打开浏览器 

# remDr$getStatus() ## 使用该status方法查询远程服务器的状态。
```


```R
url="https://www.baidu.com/"
remDr$navigate(url)  # navigate方法打开网页，url一定要完整
## remDr$getCurrentUrl() # 获取当前页面的url

###########################进行搜索关键词
#####  按属性--属性值搜索 ,可以是css,xpath ,id ,属性等 对应值
webElem <- remDr$findElement(using = 'css', "#kw") # 找到这个元素--进行搜索关键词
webElem$sendKeysToElement(list("京东",key="enter"))
#### 获取当前页面的所有标题，每个链接的标题都包含在<h3 class = "t">标签中。我们将h3首先访问标题
#### 注意 findElements和 findElement方法是获取一个或者多个的区别
webElems <- remDr$findElements(using = 'css', "h3.t")
resHeaders <- unlist(lapply(webElems, function(x){x$getElementText()})) #
resHeaders

######################## 鼠标点击事件
webElem<-remDr$findElement(using = "css","#w-f80518 > div > h2 > a.rujtl6l-header-title")# 找到相应元素，直接点击
webElem$clickElement()
##### 方法二： 
### webElem=webElems[[min(which(resHeaders ==resHeaders[1]))]]# 根据返回的标题标签去重以后，找到相应位置点击
### webElem$clickElement() 


######################### 在京东首页进行关键词搜索
###########窗口页面跳转
remDr$getCurrentUrl()# 可以看出当前页面还是百度的页面，并没有跳转到京东页面
remDr$getCurrentWindowHandle()# 查看当前属于哪个窗口页面
remDr$getTitle()# 当前窗口页面的标题
remDr$getWindowHandles() # 获取当前浏览器所有的窗口页面
## 现在进行页面跳转
currWin <- remDr$getCurrentWindowHandle() # 当前窗口
allWins <- unlist(remDr$getWindowHandles()) # 所有窗口，这里只有两个
otherWindow <- allWins[!allWins %in% currWin[[1]]] # 排除当前窗口，获取其他窗口
remDr$switchToWindow(otherWindow)# 窗口跳转函数，若其他窗口有多个，需要指定一个
remDr$getCurrentUrl()
remDr$getTitle()# 跳转成功
###########跳转成功后，进行京东关键词搜索
webElem <- remDr$findElement(using = 'id', "key")
webElem$sendKeysToElement(list("笔记本电脑",key="enter"))

################### 选电脑有很多条件--现对条件进行限制
# #### 电脑贵重，选择京东自营
## 方法一：---选择元素
webElem <- remDr$findElement(using = 'css', "#J_feature > ul > li:nth-child(1) > a")#找到这个京东自营元素--点击即可
webElem$clickElement()# 点击这元素
## 方法二： 效果同上，---JavaScript脚本
# 可以看见 "京东自营"这个html元素标签里面有onclick="searchlog(1,0,0,43)"属性,<a data-field="wtype" data-val="1" class="selected" href="javascript:;" onclick="searchlog(1,0,0,43)"><i></i>京东物流</a>，对JavaScript不熟悉，操作不成功。
# remDr$executeScript(script = "searchlog(1,0,0,43)",args = list("dummy"))

# #### 选择其他条件---同上


######################## 页面拉到最下面 --JavaScript脚本, 因为在爬取数据的时候，当页面拉到最下面的时候，才有新数据产生
scripts <- "window.scrollTo(0,document.body.scrollHeight)" # 页面拉到最下面,
# document.body.scrollHeight是表示body标签最大可以滚动到的坐标,window.scrollTo(x,y),里面为坐标
remDr$executeScript(script = scripts,args = list("dummy"))
Sys.sleep(3)

# ####################### # 页面拉到最上面---JavaScript
# scripts <- "window.scrollTo(0,0)" # 页面拉到最上面
# remDr$executeScript(script = scripts,args = list("dummy"))
# Sys.sleep(3)
######################## 页面拉到指定元素位置---javascript----这里可以循环两次
## 参考:http://www.w3school.com.cn/jsref/dom_obj_document.asp
# scripts <- 'window.scrollTo(0,document.getElementById("J_goodsList").scrollHeight)'
# remDr$executeScript(script = scripts,args = list("dummy"))
# Sys.sleep(3)


#####################  模拟点击下一页---css
# nextBtn <- remDr$findElement(using="css",value = "#J_bottomPage > span.p-num > a:nth-child(7)")
# nextBtn$clickElement()
#################### 模拟点击下一页  --JavaScript
nextpage=str_c("SEARCH.page(",i, ",true)") ##  可用str_c()字符串拼接而成
remDr$executeScript(nextpage,args = list("dummy"))



############################ 此时可以获取当前页面的源代码，并提取相应的标题
remDr$maxWindowSize()# 窗口最大化--有时要
# webpage=remDr$getPageSource()[[1]][1] #获取当前页面的源代码
### 保存为本地文件
# con=file("test1.html",encoding = "utf-8")
# writeLines(webpage1,con)
# close(con)

###


######################### 结合rvest包操作提取 商品信息
library(rvest)
library(stringr)
xinxi_page=function(){
# 提取当前页面的源代码
webpage=read_html(remDr$getPageSource()[[1]][1])
# 提取商品价格
price <-  webpage %>% html_nodes("#J_goodsList .p-price") %>% html_text() %>% str_trim()
# 提取商品的简介信息 ，若class属性有多个值时，只用一个即可
xinxi <- webpage %>% html_nodes("#J_goodsList .p-name") %>% html_text() %>% str_trim() 
# 提取商品的商店信息
shop <-  webpage %>% html_nodes("#J_goodsList .p-shop") %>% html_text() %>% str_trim()
if(identical(length(price),length(xinxi),length(shop))){
  df=data.frame(xinxi,price,shop)
}else {
  print("这一页提取有问题：")
  print(remDr$getCurrentUrl()[[1]])
}
}
remDr$close()# 关闭浏览
## 只需循环页面 提取信息，保存数据即可
```


完整代码
```{r include=FALSE}
rm(list = ls())
gc()
```

```R
library(RSelenium)
library(stringr)
setwd("E:\\rwork\\Rselenium")

######## 初始化浏览器####
remDr <- remoteDriver(
  browserName = "chrome",  # 浏览器可以自己设置firefox、chrome、phantomjs（要配置）
  remoteServerAddr = "localhost",
  port = 4444L) # 默认情况下，Selenium Server侦听端口为4444

remDr$open() # 打开浏览器 

url="https://www.jd.com/?cu=true&utm_source=haosou-pinzhuan&utm_medium=cpc&utm_campaign=t_288551095_haosoupinzhuan&utm_term=0a875d61c5fe47d8bc48679132932d23_0_8f7391a4de7c48dc92723934bc4fd73d"
remDr$navigate(url) #直接打开京东
Sys.sleep(3)
remDr$maxWindowSize()
Sys.sleep(3)
```


关键词搜索以及选择筛选条件
```R
###########跳转成功后，进行京东关键词搜索
webElem <- remDr$findElement(using = 'id', "key")
webElem$sendKeysToElement(list("笔记本电脑",key="enter"))
Sys.sleep(3)
################### 选电脑有很多条件--现对条件进行限制
# #### 电脑贵重，选择京东自营
## 方法一：---选择元素
webElem <- remDr$findElement(using = 'css', "#J_feature > ul > li:nth-child(1) > a")#找到这个京东自营元素--点击即可
webElem$clickElement()# 点击这元素
Sys.sleep(3)

```


提取信息
```R
library(rvest)
library(stringr)
library(data.table)
library(readr)

xinxi_page=function(){
# 提取当前页面的源代码
webpage=read_html(remDr$getPageSource()[[1]][1])
# 提取商品价格
price <-  webpage %>% html_nodes("#J_goodsList .p-price") %>% html_text() %>% str_trim()
# 提取商品的简介信息 ，若class属性有多个值时，只用一个即可
xinxi <- webpage %>% html_nodes("#J_goodsList .p-name") %>% html_text() %>% str_trim() 
# 提取商品的商店信息
shop <-  webpage %>% html_nodes("#J_goodsList .p-shop") %>% html_text() %>% str_trim()

link <-  webpage %>% html_nodes("#J_goodsList .p-name a") %>% html_attr("href")
link_finally=str_c("https:",link)

if(identical(length(price),length(xinxi),length(shop),length(link))){
  df=data.frame(xinxi,price,shop,link,link_finally)
  return(df)
}else {
  print("这一页提取有问题：")
  print(remDr$getCurrentUrl()[[1]])
  return(NULL)
}
}



page_operation=function(n,file="tiannao.csv"){# n代表页数
for(i in 1:n) {
########页面拉到最下面 --JavaScript脚本
scripts <- "window.scrollTo(0,document.body.scrollHeight)" # 页面拉到最下面,
# document.body.scrollHeight是表示body标签最大可以滚动到的坐标,window.scrollTo(x,y),里面为坐标
remDr$executeScript(script = scripts,args = list("dummy"))
Sys.sleep(3)

############  提取商品信息
dff=data.frame()
dff=xinxi_page()
write_excel_csv(dff,file,append = TRUE)# 使用过fwrite(),和系统自带的write.csv()以及readr包的write_csv()都乱码
Sys.sleep(3)
#################### 模拟点击下一页  --JavaScript
ii=2*i+1
nextpage=str_c("SEARCH.page(",ii, ",true)") ##  
remDr$executeScript(nextpage,args = list("dummy"))
Sys.sleep(3)
Sys.sleep(3)

}
}


```

提取多少页
```R
page_operation(20,"diannao2.csv")
```


```R
remDr$close()# 关闭浏览
```

![20180407diannao](https://cdn.jsdelivr.net/gh/zscmmm/imgs2208save@master/img/20180407diannao.png)
