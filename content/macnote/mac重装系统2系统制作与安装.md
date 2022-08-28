---
title: mac重装系统2系统制作与安装
author: zsc
date: "2020-10-04"
categories: ["mac系统设置"]
series: "mac重装系统设置"
tags:
  - mac
keywords:
  - mac
---


参考https://www.iplaysoft.com/macos-usb-install-drive.html 这篇文章制作U盘系统盘

我个人推荐使用`DiskMaker X `启动盘制作.官网: https://diskmakerx.com/



## 如何进入系统盘

关机重启, 长按<kbd>Option</kbd> 即可选择进入U盘, 先利用磁盘工具,格式化主磁盘,然后,退出,在安装.

注意: 也可以在线安装...

- <kbd>Command（⌘）</kbd> + <kbd>R </kbd>：安装Mac之前安装的最新macOS，而不升级到更高的版本。
- <kbd>Option </kbd> + <kbd> Command</kbd> + <kbd>R</kbd>：升级到与Mac兼容的最新macOS。
- <kbd>Shift </kbd>+ <kbd>Option </kbd>+ <kbd>Command </kbd>+ <kbd>R</kbd>：安装Mac原本出厂搭载的macOS，或是最接近且依然可用的版本。

https://blog.csdn.net/qq285744011/article/details/106987147



##  MacOS U盘安装提示副本损坏听语音

解决办法:

- `断网`以后 打开`左上角实用工具-->终端`, 输入

```bash
date 032208102015.20
```

按回车键确认

03是月，22是日，08是时，10是分，2015是年，20是秒
注意:先修改为现在的时间 , 还是不行再改往前修改为其他年份

当提示时间修改完成后，推出终端，重新安装MacOS即可



 https://blog.csdn.net/li1339023842/article/details/102913864

https://xitongtiankong.com/archives/58221

https://jingyan.baidu.com/article/4d58d54155bd079dd5e9c043.html

然后一直等着就好了. 感觉比win的U盘安装慢,(mac基本上安装了1个小时左右)
