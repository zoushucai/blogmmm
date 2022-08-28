---
title: corr详解(MATLAB)
author: zsc
date: 2019-12-11
tags:
  - MATLAB
toc: true
---

# corr详解（MATLAB）

- **corrcoef是对两个列向量，或者一个矩阵的每列进行的，用的是pearson相关**
- **corr可以对两个矩阵的每列进行，也可以对一个矩阵的每列进行，相关的类型可以是pearson或者Kendall或者Spearman**
- **总之，corr强大很多**

## 1、corrcoef

### R = corrcoef([`A`](https://ww2.mathworks.cn/help/matlab/ref/corrcoef.html?lang=en#f80-999628-A))

输入：一个矩阵A，

方法：计算矩阵A的每一列与每一列之间的皮尔逊相关系数，得到一个对称的相关系数矩阵。

返回： 一个相关系数矩阵R，

```matlab
A = randn(n,m); % A是一个n*m的矩阵
corrcoef(A) % 返回一个m*m的对称矩阵
```



### R = corrcoef(A,B)

输入： 两个向量，A，B均为列向量

返回：一个2*2 对称的相关系数矩阵

如果A, B 均为矩阵，则先把A，B转变为列向量，然后再计算皮尔逊相关系数，即等价于如下形式

```matlab
A = randn(n,m); % A是一个n*m的矩阵
B = randn(n,m); % B是一个n*m的矩阵,
%% 注意A，B矩阵的个数一定要一样
corrcoef(A,B）       % 返回一个2*2的对称矩阵
corrcoef(A(:),B(:)) % 等价 corrcoef(A,B）
```

## 2、corr

### rho = corr(X)

输入：一个矩阵X

方法: 计算矩阵X的每一列与每一列之间的皮尔逊相关系数，得到一个对称的相关系数矩阵。

返回： 返回一个对称的相关系数矩阵rho

### rho = corr(X,Y)

输入： X为$n*m1$的矩阵，Y为$n*m2$的矩阵

方法：返回输入矩阵X和Y中每对列之间的成对相关系数矩阵。

返回一个$m1*m2$的矩阵，其中第i行第j列元素代表X的第i列与Y第j列的相关系数

### [rho,pval] = corr(___,Name,Value)

```matlab
R = corr(X,'Type','Pearson')
R = corr(X,Y,'Type','Pearson')
R = corr(X,Y,'Type','Kendall')
R = corr(X,Y,'Type','Spearman')
```

