---
title: mac重装系统4软件安装
date: "2020-10-06"
categories: ["mac系统设置"]
series: "mac重装系统设置"
tags:
  - mac
keywords:
  - mac
---



## 1, xcode命令工具(一下 以都是在 终端下运行 ,`%`为注释)

```bash
xcode-select --install
```

此文章于`2022-08-28` 修改, 因为不适合最新的m1/m2了
## 2.` homebrew` 安装

### 2.1 安装
官网主页:  https://brew.sh/

国内加速安装: https://gitee.com/cunkai/HomebrewCN


### 2.2 卸载(未试过)

方法一: 网上找的,

可参考: https://blog.csdn.net/qq_41234116/article/details/79366454

方法 2: 官方版本

```bash
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/uninstall)"
```

https://github.com/Homebrew/brew/blob/master/docs/FAQ.md 

https://stackoverflow.com/questions/23251665/how-to-uninstall-homebrew



### 2.3 通过 brew 安装软件和卸载软件

```bash
brew install <packageName>      # 这个安装的是只有命令行的工具

brew install --cask google-chrome   #  安装的是有图像界面的 app

brew uninstall <packageName>

brew uninstall --cask <packageName> 

brew list    % 已安装列表

brew update   % 注意每次使用这个是 都很慢, 可进行源的更新

brew cask search <packageName>  %查询<packageName>

brew cask info <packageName>   % 查看版本信息

brew config             %查看brew配置

brew outdated   % 查看那些包（软件）可以更新

brew upgrade             # 更新所有的包，Homebrew 会安装新版本的包，但旧版本仍然会保留
brew upgrade $FORMULA    # 更新指定的包

brew cleanup             # 清理所有包的旧版本，将旧有的软件安装包进行清理
brew cleanup $FORMULA    # 清理指定包的旧版本
brew cleanup -n          # 查看可清理的旧版本包，不执行实际操作

```

### 2.4 软件清理

```bash
brew cleanup --prune 0

cleanup [options] [formula|cask]
       Remove stale lock files and outdated downloads for all formulae and casks,  and  remove  old
       versions  of installed formulae. If arguments are specified, only do this for the given for-
       mulae and casks. Removes all downloads more than 120 days old. This  can  be  adjusted  with
       HOMEBREW_CLEANUP_MAX_AGE_DAYS.

       --prune
              Remove all cache files older than specified days.

       -n, --dry-run
              Show what would be removed, but do not actually remove anything.

       -s     Scrub the cache, including downloads for even the latest versions. Note downloads for
              any installed formulae or casks will still not be deleted.  If  you  want  to  delete
              those too: rm -rf "$(brew --cache)"

       --prune-prefix
              Only prune the symlinks and directories from the prefix and remove no other files.
```



### 2.5 mac Linux命令解释

- `export A = B` 把 B 写入 A中,不过重启后无效, 还可以设置环境变量,不过 mac 一般会自动配置,不怎么用这个,用的较多的是`~/.bash_profile`文件来管理环境变量.
- `echo 'xxx' >>  file `  把`'xxx'`内容追加到 `file` 文件末尾, 用一个`>`表示覆盖 `file`文件.

- `source ~/.bash_profile` 刷新配置文件 
- `cat file` 查看 file 文件
- `vim file`  利用 vim 打开 file文件,vim 可以编辑修改 file 文件

## 3. 常用软件

- 谷歌浏览器 , 

- `Typora` 写作软件, 	

- sublime-text3, 

- github桌面版, 

- mathpix-snipping-tool公式识别器,

- tencent-lemon :  腾讯柠檬垃圾清理软件

- contexts: 快速切换 mac 窗口

- firefox(火狐浏览器,虽然 Google 浏览器很强了,不过国内有些软件需要这个)

- the-unarchiver  (只能)解压软件

- keka 解压压缩都行,

- qq : mac上只有 qq,暂时没有 TIM

- iina % 视频播放器

- mounty %挂着 NTFS

- baidunetdisk %百度网盘

- loopback: 收费软件,需要找到破解版,不建议用这个安装,结合 mac 自带的录屏软件,可以录制有声音的视频,不管是系统声音还是软件声音都行.

-  java 的安装,个人建议还是从官网下载安装对应的版本,我记得第一次试的时候,好像没有配置成功

	```bash
	% 先安装 r 以及 rstudio 在安装java, 看能否配置成功
	brew install –cask  r
	brew install –cask  rstudio		
	brew install –cask  java   %将会安装jdk的最新版本，jdk内嵌jre
	brew install –cask  java8  %安装jdk8的最新版本
	```

-  grammarly : 语法安装软件, 个人不推荐,因为有浏览器插件就够了

- cajviewer: caj 云阅读

- zotero: 论文参考文献管理, 可以快速进行期刊缩写与展开

- mendeley : 论文参考文献管理，可以快速进行期刊缩写与展开

- jabref : 论文管理软件, 只适合 bibtex 文件的管理, 这个可以缩写期刊, 以及查找文献的 doi, 并且不修改原有的bibtex 文件信息(除非手动修改), 注意一定要找到对应期刊的 bst 文件,才能显示出适合的参考文献格式, 可以集合 zotero 以及 mendeley 的软件查找相应的参考文献样式或者直接从网站https://www.zotero.org/styles查找下载相关参考文献的样式, 最终结合 bibtex 生成最终的 pdf(bibtex文件生成的临时文件 *.bbl 就是对应的的thebibliography环境以及bibitem条目 ),  备注: 个人推荐 jabref, 然后全部的参考文献都去 Google 学术上下载 bibtex 文件,不能一会从百度学术一会从谷歌学术下载,或者从相应的参考软件下载,这样会很乱,  注意:谷歌浏览器插件MyBibCitation Generator 也能产生相应的参考文献样式     
- jabref  % 建议安装开发版本,这个默认是稳定版本

```bash
# 个人基础
brew install –cask  sogouinput  # 搜狗输入法
brew install –cask  google-chrome # Google浏览器
brew install –cask  sublime-text	 
brew install –cask  github
brew install –cask  mathpix-snipping-tool
brew install –cask  tencent-lemon   #  腾讯柠檬清理软件
brew install –cask  qq
brew install –cask  iina 
brew install –cask  typora     # 收费
brew install –cask  contexts
#brew install –cask  firefox    # 火狐浏览器, 
brew install –cask  baidunetdisk # 百度云
brew install –cask  mailmaster       # 网易邮箱大师
brew install –cask  grammarly	     
#brew install –cask  cajviewer	
brew install –cask  zotero          # 文献管理工具
#brew install –cask  jabref      # 建议安装开发版本,这个默认是稳定版本s


# 免费
brew install –cask  the-unarchiver     # 解压工具
brew install –cask  keka               # 解压缩工具
# 可以购买myzip专业版,这个软件具有上述两个软件的常用功能,解压缩

# 免费   
brew install –cask  mounty            # U盘挂在软件
## mounty开源的. 但是不推荐,一旦和win混用,易出问题
## 推荐付费软件: tuxera ntfs for mac

brew install –cask  loopback  #(收费,可以免费试用)结合 mac 自带的录屏软件,可以录制有声音的视频,不管是系统声音还是软件声音都行.


### 文本预览,在最新的mac 12中不可以了, 好像不支持m1
brew install –cask  qlstephen    # 下面三个是增加mac自带的文件预览功能
brew install –cask  qlcolorcode
brew install –cask  qlmarkdown  # markdown预览
### 推荐付费 peek 
```





参考:

https://mirrors.tuna.tsinghua.edu.cn/help/homebrew/

https://blog.cnrainbird.com/index.php/2020/05/19/osx_geng_huan_brew_yuan_jie_jue_xia_zai_man_wen_ti/



**补充： 利用homebrew这个方法虽然好，但是对于旧电脑可能不适合，下载对应软件的二进制文件来的更可靠些**
