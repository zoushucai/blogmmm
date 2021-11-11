---
title:  sublime text3 使用方法以及相关插件
author: zsc
date: "2020-10-07"
categories: ["mac系统设置"]
series: "mac重装系统设置"
tags:
  - mac
keywords:
  - mac
---

# sublime text3 使用方法以及相关插件

## 1. 软件的下载

1, 官网下载地址: http://www.sublimetext.com/

2, 如果不安装插件,那还不如不装 sublime, 参考: https://packagecontrol.io/installation

## 2. 插件的安装

### 2.1 安装Package Control

- 现在sublime 4 已出，自带这个功能啦 （2021年11月更新）

### 2.2 使用Package Control组件安装插件

**mac: Cmd+Shift+P**（Win：**Ctrl+Shift+P**），输入 **install** 选中 **Install Package** 并回车，输入或选择你需要的插件回车就安装了（注意左下角的小文字变化，会提示安装成功），安装其它插件也类似.

## 3. 插件推荐

### 3.1 软件风格

风格包网站: https://packagecontrol.io](https://packagecontrol.io/)

风格包: Spacegray：

```text
https://packagecontrol.io/packages/Theme%20-%20Spacegray
```

1. Preferences > color scheme >theme-spacegray
2. Preferences-> setting 中设置以下

```text
"theme": "Spacegray.sublime-theme",
"color_scheme": "Packages/Theme - Spacegray/base16-ocean.dark.tmTheme"
```

### 3.2 主题推荐

#### **3.2.1 Material** 主题

- 安装主题

快捷键 `⌘(Command) + ⇧(Shift) + P`回车后输入`Package Control:Install`再回车，输入`Material`搜索主题进行安装。

- 启用主题

快捷键`⌘(Command) + ⇧(Shift) + P`回车后输入`Material Theme: Activate theme`回车后选择自己喜欢的配色方案。

> 推荐`Material Theme`或者`Material Theme Darker`都相当赞。

#### **3.2.2 Materialize** 主题

- 安装主题

快捷键 `⌘(Command) + ⇧(Shift) + P`回车后输入`Package Control:Install`再回车，输入`Materialize`搜索主题进行安装。

- 启用主题

快捷键`⌘(Command) + ⇧(Shift) + P`回车后输入`Activate Materialize Theme`回车后选择自己喜欢的配色方案。

> 推荐 `Material Dracula`或者`Material Flatland`



### 3.2 常用插件推荐

- **Emmet**  写前端  html/css 用的

- **HTM5**  

- **ConvertToUTF8**  防止打开文件出现乱码

- **Codecs33**  同理打开文件防止出现乱码 ,建议和ConvertToUTF8一起安装

- **ChineseLocalizations**  汉化 sublime

- **SideBarEnhancements**： 增强左边面板 https://packagecontrol.io/packages/SideBarEnhancements,可惜只能在project中使用

- **AdvancedNewFile**： 快速创建文件. (alt+ command +N)

- **A File Icon** :  左边面板显示图标

- docblockr：代码注释提示插件 https://packagecontrol.io/packages/DocBlockr

- SideBarTools：扩展左侧面板（相对**SideBarEnhancements**少了一些功能）

- Local History：本地历史记录 https://packagecontrol.io/packages/Local%20History

- Color Highlight:  css中使得颜色直接在sublime中展示,(注意网上有很多人推荐Color Hightlighter插件,试了一下,此软件我的mac电脑不行),  Color Highlight 插件直接下载即可用 

	![image-20200520150836677](https://gitee.com/zscqsmy/blogimg/raw/master/uPic/2020100616image-20200520150836677.png)

- ColorPicker(调色板): CSS 中直接使用快捷键即可调出调色板,更改颜色.据说默认的快捷键有冲突,建议更改

	打开`Sublime Text --> Preferences --> Browse Packages`找到`ColorPicker`文件夹并进入（注意此处进入文件夹的方式），分别有`linux` `mac`和`windows`的快捷键设置文件，根据你的操作系统，打开相应文件即可设置, 如图

	![image-20200520151522130](https://gitee.com/zscqsmy/blogimg/raw/master/uPic/2020100616image-20200520151522130.png)


### 3.3 格式化代码

首先通过以下路径打开用户按键绑定文件：

Preferences → Key Bindings – User

然后在其中添加以下代码（如果你有需要的话，其中的快捷键组合是可以自己定义的）：

```text
[
	//格式化代码,single_line参数删除时，格式化只影响当前光标所在行
	{"keys": ["ctrl+alt+l"], "command": "reindent" , "args": {"single_line": false}}
]
```

### 3.4 内容检索

**快速查找**

默认情况下，Sublime Text支持函数快速查找，按Ctrl+Shift+R打开查找面板，就可以快速定位函数所在的文件，如果安装了emmet插件将会失效，我们需要做以下操作进行修复。

编辑 emmet插件配置项：

```text
{"disabled_keymap_actions": "reflect_css_value"}
```

**代码跟踪**

鼠标移动到函数上面，会自动显示方法的文件列表。或按 f12 键显示函数的文件列表

### 3.5 快捷键

使用快捷键可以显著提高开发效率，所以还是有必要掌握的。

1. 搜索文件：ctrl+p 输入文件名
2. 搜索函数/方法：ctrl+p 输入`“文件名@方法名”` 如 User@show
3. 跳转到指定行：ctrl+p 输入`文件名:行号`,只输入: 时在当前文件跳转
4. 查找当前文件方法：ctrl+r
5. 返回/前进编辑位置：Alt + -、Alt + Shift + -
6. 切换标签页：Ctrl + PgUp、Ctrl + PgDn
7. 选中单词：Ctrl + D 连续按会选中页面中所有单词，以实现批量编辑
8. 以单词为单位快速移动光标：Ctrl + ←、Ctrl + →
9. 选中当前行：Ctrl + L
10. 跳转到第几行：Ctrl+G
11. 跳转到对应括号：Ctrl+M
12. 开关侧栏：Ctrl+K+B
13. 选中当前括号内容，重复可选着括号本身：Ctrl+Shift+M
14. 注释当前html标签块：Ctrl+Shift+/
15. 专注编写模式：Shift+F11
16. 分屏显示：Alt+Shift+数字
17. Ctrl+Enter 在下一行插入新行。举个栗子：即使光标不在行尾，也能快速向下插入一行。
18. Ctrl+Shift+Enter 在上一行插入新行。举个栗子：即使光标不在行首，也能快速向上插入一行。
19. Ctrl+Shift+[ 选中代码，按下快捷键，折叠代码。
20. Ctrl+Shift+] 选中代码，按下快捷键，展开代码。







参考： https://curder.gitbooks.io/blog/