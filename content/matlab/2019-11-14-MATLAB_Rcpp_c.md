---
title: Armadillo + Rcpp  VS  MATLAB/octave
author: zsc
date: "2019-11-14"
tags:
  - MATLAB
  - Rcpp
  - C
toc: ture
---

# ***Armadillo + Rcpp  VS  MATLAB/octave** 

- http://arma.sourceforge.net/docs.html



## 1. Armadillo VS  matlab

| **Matlab/Octave**               | **Armadillo**                                                | **Notes**                                                    |
| ------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| A,B,C代表矩阵<br>a,b,c 代表向量 | vec x(10);<br>vec y = zeros<vec>(10);<br>rowvec x(10); <br>rowvec y = zeros<rowvec>(10); <br>rowvec a = {1,2,3,4};<br/>vec b = {1,2,3,4};<br>mat    A = randu<mat>(10,10); | C++中要声明向量类型<br>(这里都是 double 类型)<br>vec 默认 colvec(等价),是列向量 |
| A(1,1)                          | A(0,0)                                                       | C++ 索引从 0 开始                                            |
| A(k,k)                          | A(k-1,k-1)                                                   |                                                              |
|                                 |                                                              |                                                              |
| size(A,1)                       | A.n_rows                                                     | C++ 中直接利用对象的属性                                     |
| size(A,2)                       | A.n_cols                                                     |                                                              |
| size(Q,3)                       | Q.n_slices                                                   | 这里 Q 是一个三维数组                                        |
| numel(A)<br>length(A(:))        | A.n_elem                                                     | 矩阵 A 中所有元素的个数,行数$\times$ 列数                    |
|                                 |                                                              |                                                              |
| A(:, k)                         | A.col(k)                                                     | 注意这里的索引问题,为了方便 这里不做转换                     |
| A(k, :)                         | A.row(k)                                                     |                                                              |
| A(:, p:q)                       | A.cols(p,q)                                                  |                                                              |
| A(p:q, :)                       | A.rows(p,q)                                                  |                                                              |
| A(p:q, r:s)                     | A( span(p,q), span(r,s) ) <br>A.submat(p, r, q, s)           |                                                              |
|                                 |                                                              |                                                              |
| Q(:, :, k)                      | Q.slice(k)                                                   | Q 是一个三维数组                                             |
| Q(:, :, t:u)                    | Q.slices(t, u)                                               |                                                              |
| Q(p:q, r:s, t:u)                | Q( span(p,q), span(r,s), span(t,u) )                         |                                                              |
|                                 |                                                              |                                                              |
| A'                              | A.t() <br>trans(A)                                           |                                                              |
| A^(-1)                          | inv(A)                                                       | 求 A 的逆<br>R 中是: solve(A)                                |
|                                 |                                                              |                                                              |
| A = zeros(size(A))              | A.zeros()                                                    | 把矩阵 A复制为 0 矩阵                                        |
| A = ones(size(A))               | A.ones()                                                     |                                                              |
| A = zeros(k)                    | A = zeros<mat>(k,k)                                          | 创建一个$k \times k$ 的 0 矩阵,并赋值给 A                    |
| A = ones(k)                     | A = ones<mat>(k,k)                                           |                                                              |
|                                 |                                                              |                                                              |
| A + B                           | A + B                                                        |                                                              |
| A - B                           | A - B                                                        |                                                              |
| A .* B                          | A % B                                                        |                                                              |
| A ./ B                          | A / B                                                        |                                                              |
| A*B                             | A*B                                                          |                                                              |
| A \ B                           | solve(A,B)<br>inv(A)*B                                       |                                                              |
| A / B                           | 无<br>A*inv(B)                                               |                                                              |
|                                 |                                                              |                                                              |
| A ./ a                          | A.each_row() / a                                             | a为行向量 ,C++中不能是列除以行<br>注意和 MATLAB 的区别       |
| A ./ b                          | A.each_col() /b                                              | b为列向量,                                                   |
| A .* a                          | A.each_row() % a                                             | a 为行向量                                                   |
| A .* b                          | A.each_col  % b                                              | b为列向量                                                    |
|                                 |                                                              |                                                              |
| sqrt(A)                         | sqrt(A)                                                      | 求数组元素的开方                                             |
| A .^ p                          | pow(A,p)                                                     | 求数组元素的次方                                             |
| exp(A)                          | exp(A)                                                       | 以自然常数为底数的指数                                       |
| log(A)                          | log(A)                                                       |                                                              |
| log2(A)                         | log2(A)                                                      | 这里都是以数组形式运算                                       |
| log10(A)                        | log10(A)                                                     |                                                              |
| sign(A)                         | sign(A)                                                      | 符号函数                                                     |
|                                 | 向量的^ 也可以用 pow计算                                     | 注意,Rcpp 并不提供^运算, <br>支持向量的 `+` `-` `*` `/` <br>以及 `==` `! =` `<` `>` `> =` `<=` |
|                                 |                                                              |                                                              |
| x = A(:)                        | vec  x = vectorise(A)                                        | 把矩阵转变为列向量(即按内存排序), <br>C++ 中不能是行向量     |
| X = [ A  B ]                    | X = join_horiz(A,B)                                          | 矩阵的拼接                                                   |
| X = [ A; B ]                    | X = join_vert(A,B)                                           |                                                              |
|                                 |                                                              |                                                              |
| A = randn(2,4);                 | mat A = randn(2,4);                                          | 产生维度为 2*4 的标准正太分布数据                            |
| A = randi(2,4)                  | mat A = randi(2,4)<br>mat A = randi(2,4,distr_param(3,8))    | 以$2\times 4 $的随机整数,0 到正无穷<br>产生 $2 \times 4$ 的随机矩阵,范围 [3,8]之间的整数 |
| A = randu(2,4)                  | mat A = randu(2,4)                                           | 产生维度为 2*4 的标准均匀分布数据                            |
|                                 |                                                              |                                                              |
| a *  b                          | a % b <br>A.row(i)%A.row(i)<br>A.col(i) %A.col(i)            | a ,b 为列向量 , 向量对应元素相乘                             |
|                                 |                                                              |                                                              |
| sum(A,1)<br>sum(A)              | rowvec a = sum(A, 0)<br>rowvec a = sum(A)                    | C++. 中 0 代表列 ,1 代表行                                   |
| sum(A,2)                        | colvec  a = sum(A,1)                                         | MATLAB 中 1 代表列, 2 代表行                                 |
| sum(A(:))                       | double y = aucc(A)                                           |                                                              |
| mean(A)                         | mean(A)                                                      | 与 sum 函数类似                                              |
| max(A)<br>max(A,1)<br>max(A,2)  | rowvec a = max(M);<br>rowvec b = max(M,0);<br>colvec c = max(M,1); | 与 sum 函数类似(还有 min 之类的)                             |
| min(A)                          |                                                              |                                                              |
|                                 |                                                              |                                                              |
|                                 |                                                              |                                                              |
|                                 |                                                              |                                                              |
|                                 |                                                              |                                                              |



## 2. R 数据类型对照表

| Value    | R vector    | Rcpp vector                           | Rcpp matrix                           | Rcpp scalar | C++ scalar |
| -------- | ----------- | ------------------------------------- | ------------------------------------- | ----------- | ---------- |
| Logical  | `logical`   | `LogicalVector`                       | `LogicalMatrix`                       | -           | `bool`     |
| Integer  | `integer`   | `IntegerVector`                       | `IntegerMatrix`                       | -           | `int`      |
| Real     | `numeric`   | `NumericVector`                       | `NumericMatrix`                       | -           | `double`   |
| Complex  | `complex`   | `ComplexVector`                       | `ComplexMatrix`                       | `Rcomplex`  | `complex`  |
| String   | `character` | `CharacterVector`<br>(`StringVector`) | `CharacterMatrix`<br>(`StringMatrix`) | `String`    | `string`   |
| Date     | `Date`      | `DateVector`                          | -                                     | `Date`      | -          |
| Datetime | `POSIXct`   | `DatetimeVector`                      | -                                     | `Datetime`  | `time_t`   |



| R            | Rcpp        |
| ------------ | ----------- |
| `data.frame` | `DataFrame` |
| `list`       | `List`      |
| S3 class     | `List`      |
| S4 class     | `S4`        |



## 3. Rcpp 语法糖

即 Rcpp 中提供了基础 R 中的的一些基本函数,几乎和 基础 R 一样,支持向量运算.

https://teuder.github.io/rcpp4everyone_en/

http://www.math.pku.edu.cn/teachers/lidf/docs/Rbook/html/_Rbook/rcpp-sugar.html



| Rcpp                        | C++           | Matlab        | Note                                                         |
| --------------------------- | ------------- | ------------- | ------------------------------------------------------------ |
| Rcout                       | std::cout     |               |                                                              |
| Rcerr                       | std::cerr     |               | 注意这里的四个函数都只能<br>打印一些信息并输出到屏幕,<br>并不能中止程序 |
| Rprintf( format, variables) | std::printf() |               |                                                              |
| REprintf()                  |               |               |                                                              |
|                             |               |               |                                                              |
| stop("范围提示信息")        |               | error('信息') | 这要遇到这种情况,后面的程序不再运行<br>直接打印错误信息      |
|                             |               |               |                                                              |
|                             |               |               |                                                              |
|                             |               |               |                                                              |
|                             |               |               |                                                              |
|                             |               |               |                                                              |
|                             |               |               |                                                              |
|                             |               |               |                                                              |
|                             |               |               |                                                              |
|                             |               |               |                                                              |
|                             |               |               |                                                              |
|                             |               |               |                                                              |
|                             |               |               |                                                              |
|                             |               |               |                                                              |





## 4. 迭代器

RCPP 提供的迭代器

```R
NumericVector::iterator
IntegerVector::iterator
LogicalVector::iterator
CharacterVector::iterator
DataFrame::iterator
List::iterator
```

```c++
// [[Rcpp::export]]
double rcpp_sum(NumericVector x) {
  double total = 0;
  for(NumericVector::iterator i = x.begin(); i != x.end(); ++i) {
    total += *i;
  }
  return total;
}
```

- `i = v.begin()` : 迭代器 `i`指向`v`的第一个元素
- `++i` : Updates `i` to the state pointing to the next element.
- `--i` : Updates `i` to the state pointing to the previous element.
- `i + 1` : Represents an iterator pointing to the element 1 elements behind of `i`.
- `i - 1` : Represents an iterator pointing to the element 1 elements ahead of `i`.
- `*i` : 表示指针`i` 指向的元素的值
- `v.end()` : 表示`v`的最后一个元素
- `*(v.begin()+k)` : Represents the value of the `k`-th element of `v` ( 即 `v[k]`).
- `v[k] = *(v.begin() + k)`
