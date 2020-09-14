---
title:  MATLAB 与 R 在排序上的区别
author: zsc
date: "2019-11-15"
tags:
  - MATLAB
  - R
toc: ture
---

## MATLAB 与 R 在排序上的区别

### R 中的 rank , 返回一个向量的秩

```R
R语言排序有几个基本函数： sort()；rank()；order()
sort（）是对向量进行从小到大的排序
rank（）返回的是对向量中每个数值对应的秩
order（）返回的值表示位置，依次对应的是向量的最小值、次小值、第三小值......最大值
> data=c(5,6,8,2,4,9)
> sort(data)
[1] 2 4 5 6 8 9
> rank(data) % 秩,即排序后的位置,比如 data 中的第一个元素 5,在升序排序中是占第 3 个位置,所以返回 3. 
[1] 3 4 5 1 2 6
> order(data)
[1] 4 5 1 2 3 6
```

### MATLAB  

```matlab
[y , index]  = sort(x);
y 把 x 排列升序后的结果 % 类似 R 中的 sort
index 为 x 的秩   % 类似 R 中的 order
 tiedrank(data)  % 类似 R 中的 rank, 返回平均秩,
ans =
     3     4     5     1     2     6
```

```matlab
>> data=[5,6,8,2,4,9];
[y, index] =sort(data)
y =
     2     4     5     6     8     9
index =
     4     5     1     2     3     6
 有 y ==  data(index)
 >> tiedrank(data)
ans =
     3     4     5     1     2     6
 tiedrank([10 20 30 40 20]) % 返回平均秩
 ans =
    1   2.5    4    5    2
```

```matlab
sortrow(A,2)
把矩阵 A 按照第 2 列进行升序排序, 默认为第一列,类似 excel 中的表排序
```

