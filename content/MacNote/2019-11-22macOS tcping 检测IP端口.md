---
title: macOS tcping 检测IP端口
author: zsc
date: "2019-11-22"
categories: ["mac系统设置"]
series: "mac使用笔记"
tags:
  - mac
keywords:
  - mac
---

# macOS tcping 检测IP端口

##  安装tcping

```
$ brew install tcping
$ which tcping
```

## 2，检测IP端口是否被屏蔽

```
$ tcping 14.215.177.39 80
```

