---
title: GitHubDesktop权限问题解决办法
author: zsc
date: "2018-11-06"
tags:
  - other
toc: true
---


很久没上传文章到github了，

```

Error

Authentication failed. You may not have permission to access the repository or the repository may have been archived. Open options and verify that you're signed in with an account that has permission to access this repository.

```

网上百度了一下，发现有两种解决办法：

1.退出后重新登录

2.设置项目repository settings改为https的远程url地址

经过测试，发现这两种方式都没有起到作用

于是我猜可能和win收购github有关，

**解决办法：**

设置了项目的repository settings

将remote repository设置成：https://注册名:密码@github.com/xmilt/xmilt.github.io.git

才能正常pull和push等操作。
