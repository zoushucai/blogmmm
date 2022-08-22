---
title: "matlab优化工具02非线性规划之fmincon"
author: zsc
date: "2021-05-16"
tags:
  - matlab
toc: true
markup: mmark
---

# matlab优化工具02非线性规划之fmincon  

由于经常用到一些matlab中基本的优化函数, 于是写一个笔记, 由于新版本的文档和以前版本的文档有点不一样, 搞得查起来有点费劲, 不过推荐新版本的文档



#### 非线性规划的标准型及参数解释

$$
\begin{aligned}
& \min \quad  f(x) \\
& \text {s.t.} \begin{cases}
\textbf{A} \cdot x \leq b \\
\textbf{Aeq} \cdot x=beq \\
c(x) \leq 0 \\
\operatorname{ceq}(x)=0 \\
l b \leq x \leq u b
\end{cases}\\ \\
& f(x)是目标函数, x, b, beq是向量, \\
& \textbf{A}, \textbf{Aeq}是矩阵,\\
& c(x) 和 ceq(x) 是向量函數 \\
&\textbf{A}线性不等式,\textbf{Aeq}线性等式,\\
&c(x) 非线性不等式, ceq(x)非线性等式  \\
\end{aligned}
$$

```MATLAB
% 2.基本语法
[x,fval] = fmincon(fun,x0,A,b,Aeq,beq,lb,ub,nonlcon,options)
[x,fval,exitflag,output,lambda,grad,hessian] = fmincon(___)
%% 等号左边参数解释
x 的返回值是决策向量x的取值，fval 的返回值是目标函数f(x)的取值
exitflag 参数，描述函数计算的退出条件
output, 输出模型的优化信息参数
lambda, 返回解x处包含拉格朗日乘子的lambda参数
grad, 返回解x处fun函数的梯度值
hessian, 返回解x处fun函数的hessian矩阵

%% 等号右边参数解释
fun是用M文件定义的函数f(x),代表了(非)线性目标函数, 对于复杂问题, 建议写出目标函数以及非线性约束的梯度
x0是x的初始值
A,b,Aeq,beq定义了线性约束 ,如果没有线性约束，则A=[],b=[],Aeq=[],beq=[]
lb和ub是变量x的下界和上界，如果下界和上界没有约束，则lb=[],ub=[],也可以写成lb的各分量都为 -inf, ub的各分量都为inf
nonlcon是用M文件定义的非线性向量函数约束,如果没有则写[]
options定义了优化参数，不填写表示使用Matlab默认的参数设置
eg:
options = optimoptions('fmincon','Display','iter','Algorithm','sqp');
options = optimoptions('fmincon','SpecifyObjectiveGradient',true);
options = optimoptions('fmincon','Display','iter','PlotFcn','optimplotfval');


```

| options 常见取值    | 说明                                                         |
| ------------------- | ------------------------------------------------------------ |
| Algorithm           | 优化算法:<br> `'interior-point'` (default)<br>`'trust-region-reflective'`<br>` 'sqp'`<br>`'sqp-legacy' (optimoptions only)'`<br>`active-set'` |
| Display             | 如果设置为 off 即不显示输出;设置为 iter 即显示每一次的迭代信息;设置为 final 只显示最终结果 |
| FinDiffType         | 变量有限差分梯度的类型。取 'forward'日才即为向前差分，其为默认值;取 'central' 时为中心差分，其精度更精确 |
| FunValCheck         | 检查目标函数与约束是否都有效。当设置为 on 时，遇到复数、 NaN、Inf 等，即显示 出错信息;当设置为 off时，不显示出错信息，其为默认值 |
| GradConstr          | 用户定义的非线性约束函数。当设置为 on 时，返回 4 个输出;设置为 off 时.即为非线性约束的梯度估计有限差 |
| GradObj             | 用户定义的目标函数梯度。对于大规模问题为必选项，对中小规模问题为可选项 |
| MaxFunEvals         | 函数评价所允许的最大次数                                     |
| Maxlter             | 函数所允许的最大迭代次数                                     |
| OutputFcn           | 在每次迭代中指定一个或多个用户定义的口标优化函数,The default is none ( [ ] ). |
| PlotFcn             | 算法执行时,绘制各种度量值,默认[];<br>'optimplotx'   画当前点<br>'optimplotfunccount'  画函数计数<br/>'optimplotfval'   绘制函数值<br/>'optimplotfvalconstr'  以直线的形式绘制最佳可行目标函数值。该图显示不可行点为红色，可行点为蓝色，可行性公差为1e-6。<br/>'optimplotconstruplication'  绘制最大约束冲突<br/>'optimplotstepsize'  画步长<br/>'optimplotfirstorderopt'   绘制一阶最优性度量 |
| FunctionTolerance   | 函数值的容忍度.默认值为 le-6                                 |
| ConstraintTolerance | 目标函数的约束性.默认值为 le-6                               |
| UseParallel         | 是否并行计算                                                 |



![image-20210515121746768](https://cdn.jsdelivr.net/gh/zscmmm/imgs2208save@master/uPic/202105151217image-20210515121746768.png)

![image-20210515121800630](https://cdn.jsdelivr.net/gh/zscmmm/imgs2208save@master/uPic/202105151218image-20210515121800630.png)

![image-20210515121820017](https://cdn.jsdelivr.net/gh/zscmmm/imgs2208save@master/uPic/202105161223image-20210515121820017.png)

#### 例1: 具体例子

$$
\begin{aligned}
& \min f(x) = x_{1}^{2}+x_{2}^{2}+x_{3}^{2}+8 \\
& \text { s. t. }\begin{cases}
x_{1}^{2}-x_{2}+x_{3}^{2} \geq 0 \\
x_{1}+x_{2}^{2}+x_{3}^{2} \leq 20 \\
-x_{1}-x_{2}^{2}+2=0 \\
x_{2}+2 x_{3}^{2}=3 \\
x_{1}, x_{2}, x_{3} \geq 0
\end{cases}
\end{aligned}
$$

```matlab
clc, clear all
x0 = rand(3, 1);  % 初始值
Aeq = [];               % 线性等式约束的系数（左边的系数）
beq = [];                % 线性等式约束的值 （右边的值）
%A = [];                % 线性不等式约束的系数
%b = [];                % 线性等式约束的值,(列向量)
ub = [];      % 变量的上限（取等号）
lb = repelem(0, 3);      % 变量的下限（取等号）
% 方法一: 用句柄函数调用
[x, y] = fmincon(@myobjfun, x0, [], [], Aeq, beq, lb, ub, @constrain)
% 方法二: 用如下形式调用
[x1, y1] = fmincon('myobjfun', x0, [], [], Aeq, beq, lb, ub, 'constrain')



%% 目标函数
function f = myobjfun(x)
f=x(1).^2+x(2).^2+x(3).^2+8;
end

%% 非线性约束条件
function [c,ceq]=constrain(x)
c=[-x(1).^2+x(2)-x(3).^2
    x(1)+x(2).^2+x(3).^3-20]; % 非线性不等式约束
ceq=[-x(1)-x(2).^2+2
    x(2)+2*x(3).^2-3]; % 非线性等式约束
end

%% 对于非线性约束条件,还可以这样写
function [c,ceq]=constrain(x)
% 非线性不等式约束
c(1)= -x(1).^2+x(2)-x(3).^2;
c(2)=x(1)+x(2).^2+x(3).^3-20; 
% 非线性等式约束
ceq(1) = -x(1)-x(2).^2+2;
ceq(2) = x(2)+2*x(3).^2-3; 
end
```



#### 例2: 目标函数梯度

matlab 官网上的例子, 当然如果不设置梯度,也能计算,不过复杂的问题,建议设置梯度

```matlab
options = optimoptions('fmincon','SpecifyObjectiveGradient',true);
fun = @rosenbrockwithgrad;
x0 = [-1,2];
A = [];
b = [];
Aeq = [];
beq = [];
lb = [-2,-2];
ub = [2,2];
nonlcon = [];
x = fmincon(fun,x0,A,b,Aeq,beq,lb,ub,nonlcon,options)

%% 目标函数
function [f,g] = rosenbrockwithgrad(x)
% Calculate objective f
f = 100*(x(2) - x(1)^2)^2 + (1-x(1))^2;

if nargout > 1 % gradient required
    g = [-400*(x(2)-x(1)^2)*x(1)-2*(1-x(1));
        200*(x(2)-x(1)^2)];
end
```

#### 例3: 约束含有梯度的情形

```matlab
%%必须是一下情形
function [c, ceq, Gc, Gceq] = mycon(x)
c = ...          %非线性不等式约束
ceq = ....       % 非线性等式约束
if nargout > 2
	Gc = ....    % 不等式约束的梯度
	Gceq = ....  % 等式约束的梯度
end
end
```

![image-20210515115110873](https://cdn.jsdelivr.net/gh/zscmmm/imgs2208save@master/uPic/202105151151image-20210515115110873.png)



### 例:

$$
\begin{aligned}
\min & \quad  x_{5} \\
& \begin{cases}
x_{3}+9.625 x_{1} x_{4}+16 x_{2} x_{4}+16 x_{4}^{2}+12-4 x_{1}-x_{2}-78 x_{4}=0 \\
16 x_{1} x_{4}+44-19 x_{1}-8 x_{2}-x_{3}-24 x_{4}=0 \\
-0.25 x_{5}-x_{1} \leq -2.25 \\
x_{1}-0.25 x_{5} \leq 2.25 \\
-0.5 x_{5}-x_{2} \leq-1.5 \\
x_{2}-0.5 x_{5} \leq 1.5 \\
-1.5 x_{5}-x_{3} \leq -1.5 \\
x_{3}-1.5 x_{5} \leq 1.5
\end{cases}
\end{aligned}
$$

上述问题的局部最优解: `[ 1.9638    0.9276   -0.2172    0.0695    1.1448]` ,目标函数值为 `1.1448`

全局最优解: `[2.4544    1.9088    2.7263    1.3510    0.8175]`, 目标函数值为 `0.8175`. 前4个变量不讨论

```matlab
clc,clear all;

A = [-1,  0,  0, 0, -0.25;
      1,  0,  0, 0, -0.25;
      0, -1,  0, 0, -0.5;
      0,  1,  0, 0, -0.5;
      0,  0, -1, 0, -1.5;
      0,  0,  1, 0, -1.5];
b = [-2.25; 2.25; -1.5; 1.5; -1.5; 1.5];
P.objective = @(x)x(5);
P.Aineq = A;
P.Bineq = b;
%P.lb = [];
P.nonlcon = @mynocon;
P.solver = 'fmincon';
P.options = optimset;
P.x0 = rand(5,1);
[x,f0,flag] = fmincon(P) %给出初值并求解

%% 非线性约束
function [c, ceq] = mynocon(x)
c = [];
ceq = [x(3) + 9.625*x(1)*x(4) + 16*x(2)*x(4) + 16*x(4)^2 + 12 - 4*x(1) - x(2) - 78*x(4);
    16*x(1)*x(4) + 44 - 19*x(1) - 8*x(2) - x(3) - 24*x(4)];
end



%% ---------------------------------------- 结果 ----------------------------------------
Local minimum found that satisfies the constraints.

Optimization completed because the objective function is non-decreasing in 
feasible directions, to within the value of the optimality tolerance,
and constraints are satisfied to within the value of the constraint tolerance.

<stopping criteria details>
x =
    1.9638
    0.9276
   -0.2172
    0.0695
    1.1448
f0 =
    1.1448
flag =
     1
```

##### fmincon 函数的全局优化

```
%% fmincon 函数的全局优化
% 由于 fmincon 函数求解，依靠初始值， 
% 该全局优化函数，主要采用循环结构， 产生多个随机数赋值给fmincon函数作为初始值，
% 依次调用fmincon函数求解原始问题， 并比较每次得出的目标函数值，并记录最小的目标函数值
% 这样，就可能得出原始问题的全局最优解。

function [x,f0,flag] = fmincon_global(f,a,b,n,N,varargin)
%% 参数解释：
% f 可以是结构体变量，也可以是目标函数的函数句柄
% a 与b为决策变量所在的区间， 即 自变量x的上下限，可以是向量
% n 为决策变量的个数， 即自变量的个数
% N 产生多少个初值， 一般5~10个就好了
% varargin 一些其他参数，应该包含描述约束的参数，与fmincon()函数完全一致
% 即，fmincon 函数调用中除了 f与x0之外所有的后续变元
%% 返回值： 
% x 很有可能是问题的全局最优解
% f0 为最优目标函数
%% 函数调用格式：
% x = fmincon(problem,a,b,n,N)
% x = fmincon(f,a,b,n,N,A,b,Aeq,beq)
% x = fmincon(f,a,b,n,N,A,b,Aeq,beq,lb,ub)
% x = fmincon(f,a,b,n,N,A,b,Aeq,beq,lb,ub,nonlcon)
% x = fmincon(f,a,b,n,N,A,b,Aeq,beq,lb,ub,nonlcon,options)
% x = fmincon(problem)
% [x,fval] = fmincon(___)
% [x,fval,exitflag,output] = fmincon(___)
% [x,fval,exitflag,output,lambda,grad,hessian] = fmincon(___)
%%
x0 = rand(n,1);
k0 = 0;
% 处理结构体
if strcmp(class(f),'struct')
    k0=1;
end
if k0==1
    f.x0 = x0;
    [x,f0,flag] = fmincon(f); %结构体描述的问题直接求解
else
    [x,f0,flag] = fmincon(f,x0,varargin{:}); %非结构体描述的问题直接求解
end

if flag == 0
    f0 = 1e10;
end
for i = 1:N
    x0 = a(:) + (b(:) - a(:)).* rand(n,1);% 用循环结构尝试不同的随机搜索初值
    if k0 ==1
        f.x0 = x0;
        [x1,f1,flag] = fmincon(f); %结构体描述的问题直接求解
    else
        [x1,f1,flag] = fmincon(f,x0,varargin{:}); %非结构体描述的问题直接求解
    end
    if flag > 0 & f1 < f0
        % 如果找到更改的解，则保存
        x = x1;
        f0 = f1;
    end
end


```



求解上述问题

```matlab
clc,clear all;
A = [-1,  0,  0, 0, -0.25;
      1,  0,  0, 0, -0.25;
      0, -1,  0, 0, -0.5;
      0,  1,  0, 0, -0.5;
      0,  0, -1, 0, -1.5;
      0,  0,  1, 0, -1.5];
b = [-2.25; 2.25; -1.5; 1.5; -1.5; 1.5];
P.objective = @(x)x(5);
P.Aineq = A;
P.Bineq = b;
%P.lb = [];
P.nonlcon = @mynocon;
P.solver = 'fmincon';
P.options = optimset;
P.x0 = rand(5,1);
tic % 计算耗时
[x,f0,flag] = fmincon_global(P,-10,10,5,10) %给出初值并求解
toc


%% ---------------------------------------- 结果 ----------------------------------------
x =
    2.4544
    1.9088
    2.7263
    1.3510
    0.8175
f0 =
    0.8175
flag =
     1
历时 1.545311 秒。

```



### 模型: 常用非线性规划模型(我)

$$
\begin{aligned}
Min \quad & \sum_{i=1}^{n} \sum_{j=1}^{n}\left(\omega_{i}-a_{i j} \omega_{j}\right)^{2}\\  
s.t \quad & \sum_{i=1}^{n} \omega_{i}=1,\\
& 1\geq \omega_{i} \geq 0, \quad i=1,2, \ldots, n
\end{aligned}
$$

**Matlab模板**

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



参考:  

- 官网函数解释https://www.mathworks.com/help/optim/ug/fmincon.html

- https://wenku.baidu.com/view/6bcb651d0b4e767f5acfce97.html?sxts=1561344526517

- https://blog.csdn.net/qq_38784454/article/details/80329021

- 《MATLAB数学建模》李昕——清华大学出版

- 《MATLAB R2015b最优化计算》--李娅

