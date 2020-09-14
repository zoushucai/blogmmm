---
title: 数据框删除列的方法汇总
author: zsc
date: "2019-05-01"
tags:
  - R
---

# 数据框删除列



```R
iris[1:10,-5] # 1. 通过索引删除列
iris[1:10,-c(4,5)] # 删除多列

iris[1:10,-which(names(iris)%in%c("Petal.Width","Species"))]# 2.根据列名进行删除

subset(iris, select = -c(Petal.Width, Species))# 3 根据列名进行删除

iris[1:10,1:4]# 筛选出需要的列
```
