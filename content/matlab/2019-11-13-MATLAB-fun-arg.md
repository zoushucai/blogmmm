---
title: MATLAB函数中参数的问题
author: zsc
date: "2019-11-13"
tags:
  - MATLAB
toc: ture
---



## 1. **nargin, nargout**— 捕获输入输出参数个数

　　**函数功能: 返回函数参数数量(一般在函数内部使用)**

　　在函数内部使用时,nargin 和 nargout分别表明有输入和输出参数数量。若在函数外部使用, nargin 和nargout对给定的函数，表明输入和输出参数数量。如果一个函数有可变数量的参数，参数数量为负值。 

- nargin：返回函数输入参数的数量。 
- nargin(fun)：返回函数 fun输入参数数量。如果函数参数数量可变，nargin 返回一个负值。fun 可以是函数名或映射函数的函数句柄。 
- nargout：返回函数输出参数的数量。 
- nargout(fun)：返回函数fun的输出参数数量。fun可以使函数名或映射函数的函数句柄。

## 2. inputname — 获取函数参数名称,返回一个字符串

　　**函数功能: 返回函数指定输入参数的名称字符串(只能在函数内部使用).**

​		`inputname(argnum)` :   **注意: 这里的 argnum是一个数字,表示第几个参数,返回的是第argnum个参数的名称字符串**。如果输入参数没有名称（例如它是一个表达式，而不是一个变量），这时会返回空字符串('')。 这个常常和`varargin`参数一起使用.

## 3. varargin / varargout — —可变长输入/输出参数

**函数功能: 在一个函数中，用于表示输入参数不确定的情况(只能在函数内部使用)**

本质上 是一个 cell 数组(大小 1* size(varargin,2)), 它包含了用户输入的参数. 

**用 varargin{i} 调用第 i 个参数, 用varargin{:}调用所有的参量;**

```matlab
function varargout = combin_index(varargin)
%输入可变长参数,以及输出可变长参数,都是放在一个细胞中存储, 
%而inputname 存变量名的方式,用的是cell字符数组矩阵的形式
% 由于 nargin 参数已经计算了输入参数的总个数. size(varargin,2) 等价(某些情况下)
variable_name = cell(1,nargin); % 创建一个 1* nargin 大小的 cell,
for i = 1:nargin
    T = foo(varargin{i});  % 获取的新参数 传递给另一个函数
    variable_name{i} = inputname(i);  % 由于变量名是字符,所以用细胞来存储
end
% variable_name 这个 cell 存储了变量名
```



这个`varargout`一般用的较少…….基本 和 `varargin` 类似



