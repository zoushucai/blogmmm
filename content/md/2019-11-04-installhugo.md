---
title: install old hugo version
author: zsc
date: "2019-11-04"
tags:
  - hugo
---


# 安装旧版本的 hugo

 最近发现自己更新了 hugo 软件导致了主题的某些功能失效了, 于是需要退回旧版本的 hugo(0.55.5),

## 方法一:


 https://gohugo.io/getting-started/installing/  文章中的[Install Hugo from Tarball](https://gohugo.io/getting-started/installing/#install-hugo-from-tarball) 这一部分(个人电脑是 mac)



## 方法二: 

直接从 Rstduio 进行更新

- 前提是: 必须保证 R 以及 R 包是最新的
- 使用如下命令

```R
blogdown::install_hugo(version = "0.55.5", use_brew = F, force = T, extended = TRUE)
```



