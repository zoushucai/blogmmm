---
title: mac硬盘文件变灰色
author: zsc
date: "2019-11-21"
categories: ["mac系统设置"]
series: "mac使用笔记"
tags:
  - mac
keywords:
  - mac
---





# Mac下使用Mounty挂载NTFS出现了文件不能拷贝的解决办法

Mac下使用Mounty挂载NTFS出现了文件不能拷贝的解决办法，即文件出现灰色的现象。
或者使用付费的`Tuxera` 软件都会出现灰色文件,

解决办法(在终端的灰色文件目录下面的命令即可)

```bash
xattr -d com.apple.FinderInfo *

```

