---
title: 非线性规划2
author: zsc
date: "2019-06-25"
tags:
  - R
  - Matlab
toc: true
markup: mmark
---


## Rsolnp

非线性规划问题

$$
\begin{array}{c}{\min f(x)} \\ {\text { s.t. }} \\{g(x)=0} \\{l_{h} \leq h(x) \leq u_{h}} \\ {l_{x} \leq x \leq u_{x}}
\end{array}
$$

其中, $f(x),g(x),h(x)$ 都是光滑函数,

> solnp(pars, fun, eqfun = NULL, eqB = NULL, ineqfun = NULL, ineqLB = NULL,
>  ineqUB = NULL, LB = NULL, UB = NULL, control = list(), ...)
>
>  pars  :  初始值(向量), 
>
>  fun   :  最小化的目标函数值，输入为pars参数，输出为一个单一值,等价上述问题的f(x)
>
>  eqfun :  (可选) 等式约束(左边) ，等价与上述问题的 g(x)
>
>  egB : (可选) 等式约束右边值，等价上述问题g(x) = 0 的0 
>
> ineqfun : (可选) 不等式约束，等价上述问题的 h(x)
>
> ineqLB :(可选) 不等式约束的下限 ，等价于上述问题的 lh
>
>  ineqUB :(可选) 不等式约束的上限 ，等价于上述问题的 uh
>  	
>
>  LB :(可选) 参变量的下限 ，等价于上述问题的lx
>
> UB: (可选) 参变量的上限 ，等价于上述问题的ux 
>
> control :(可选) 优化参数控制表。

例子： 
$$
min  \quad exp({\prod_{i=1}^{5}x_i}) \\
s.t. \quad  x_1^2 +x_2^2 +x_3^2+x_4^2+x_5^2 = 10 \\
\quad x_2x_3-5x_4x_5 = 0 \\
\quad x_1^3 +x_2^3 = -1
$$
```{r}
# POWELL Problem
library(Rsolnp)
fn1=function(x){
    exp(x[1]*x[2]*x[3]*x[4]*x[5])
}
eqn1=function(x){
    z1=x[1]*x[1]+x[2]*x[2]+x[3]*x[3]+x[4]*x[4]+x[5]*x[5]
    z2=x[2]*x[3]-5*x[4]*x[5]
    z3=x[1]*x[1]*x[1]+x[2]*x[2]*x[2]
    return(c(z1,z2,z3))
}

x0 = c(-2, 2, 2, -1, -1)
powell=solnp(x0, fun = fn1, eqfun = eqn1, eqB = c(10, 0, -1))

```

具体参考:https://cran.r-project.org/web/packages/Rsolnp/index.html





## Rdonlp2

这个包有一定的问题，我在运行的时候第一次几乎都正常，能得到正确结果，第二次直接系统崩溃。

```
if(!require('Rdonlp2')) install.packages("Rdonlp2", repos="http://R-Forge.R-project.org")
```

模型格式如下：
$$
\begin{array}{l}{\min z=f(\mathbf{x})} \\ {\qquad \begin{array}{l}{\mathrm{x}_{1} \leqslant \mathrm{x} \leqslant \mathrm{x}_{\mathrm{u}}} \\ {\mathrm{b}_{1} \leqslant \mathrm{Ax} \leqslant \mathrm{b}_{\mathrm{u}}} \\ {\mathrm{c}_{1} \leqslant \mathrm{c}(\mathrm{x}) \leqslant \mathrm{c}_{\mathrm{u}}}\end{array}}\end{array}
$$
具体可参考: (R软件在最优化中的应用)[]



## Matlab:: fmincon

可参考 官网函数解释https://www.mathworks.com/help/optim/ug/fmincon.html

https://wenku.baidu.com/view/6bcb651d0b4e767f5acfce97.html?sxts=1561344526517

https://blog.csdn.net/qq_38784454/article/details/80329021

《MATLAB数学建模》李昕——清华大学出版



## 常用非线性规划模型(我)
$$
Minimize  \sum_{i=1}^{n} \sum_{j=1}^{n}\left(\omega_{i}-a_{i j} \omega_{j}\right)^{2}\\  
subject to  \sum_{i=1}^{n} \omega_{i}=1, \quad 1\geq \omega_{i} \geq 0, \quad i=1,2, \ldots, n
$$

于是自己写了几个函数模板:

### R

```{r}
library(Rsolnp)
## 最小化的目标函数
obj=function(x){
  A1 = matrix(c(1,4,3,1,3,4,
                1/4,1,7,3,1/5,1,
                1/3,1/7,1,1/5,1/5,1/6,
                1,1/3,5,1,1,1/3,
                1/3,5,5,1,1,3,
                1/4,1,6,3,1/3,1),ncol = 6,nrow = 6,byrow = T)
  s = 0
  n = nrow(A1)
  for(i in 1:n){
    for(j in 1:n){
      s= s+ (x[i]- A1[i,j]*x[j])^2;
    }
  }
  return(s)
}
## 编写解上述非线性规划的函数
fmin = function(f,n){# n代表参数的个数
  eqn1=function(x){
    sum(x)
  } # 等式约束的左边  ，eqB 为等式约束的右边，如果有多个则用向量
  powell=solnp(pars= rep(1/n,n), fun = f, eqfun = eqn1, eqB = 1,LB= rep(0,n) ,UB = rep(1,n))
  fx = powell$values
  x = powell$pars
  return(  list('x' = x, 'fx' = fx[length(fx)]) )
}
fmin(obj,n = 6) #调用即可，n代表参数的个数



########################################
library(Rdonlp2)
objFun = function(x){
  A1 = matrix(c(1,4,3,1,3,4,
                1/4,1,7,3,1/5,1,
                1/3,1/7,1,1/5,1/5,1/6,
                1,1/3,5,1,1,1/3,
                1/3,5,5,1,1,3,
                1/4,1,6,3,1/3,1),ncol = 6,nrow = 6,byrow = T)
  s = 0
  n = nrow(A1)
  for(i in 1:n){
    for(j in 1:n){
      s= s+ (x[i]- A1[i,j]*x[j])^2;
    }
  }
  return(s)
}
fmin = function(objFun,n){ # 这里n为未知参数的个数.
  x0 = rep(1/n,n)
  lb = rep(0,n) # 自变量的下限
  ub = rep(1,n) # 自变量的上限
  Aeq = matrix(rep(1,n),1,n) 
  lbeq = 1
  ubeq = 1
  ret = donlp2(x0,objFun,par.lower = lb , par.upper = ub,A = Aeq,lin.lower = lbeq,lin.upper = ubeq)
  list('x' = ret$par,'objvalue' = ret$fx)
}

fmin(objFun,n = 6)# 只需要改写objFun 就可以了

```

### Matlab 

把上述文件存储为`fmin.m`，以后只需要更改目标函数`myobjfun(x,AA)`即可,其中x代表未知数, AA 代表目标函数的系数，

```matlab
function x = fmin(AA) % 调用函数接口
n = size(AA,1) ; % 未知数x的长度 
x0 = repelem(1/n,n);    % 初始迭代位置
Aeq = repelem(1,n);     % 线性等式约束的系数（左边的系数）
beq = 1;                % 线性等式约束的值 （右边的值）
%A = [];                % 线性不等式约束的系数
%b = [];                % 线性等式约束的值
ub = repelem(1,n);      % 变量的上限（取等号）
lb = repelem(0,n);      % 变量的下限（取等号）
[x,fval] = fmincon(@(x)myobjfun(x,AA),x0,[],[],Aeq,beq,lb,ub);
%[x,fval] = fmincon(@myobjfun,x0,[],[],Aeq,beq,lb,ub,[],[],options,A);
end


% 目标函数
function s = myobjfun(x,AA)
n = size(AA,1);
s =0;
for i = 1:n
    for j = 1:n
        s= s+ (x(i)- AA(i,j)*x(j))^2;
    end
end
end

```

