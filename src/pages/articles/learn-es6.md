---
title: learn-es6
date: "2018-05-02 19:29:00"
layout: post
draft: false
path: "/posts/learn-es6"
category: "JavaScript"
tags:
  - "ES6"
  - "ECMAScript 2015"
description: "本文带你快速浏览 ES6 语法."
---

# 作用域,let,const

* let实际上为 JavaScript 新增了块级作用域。
```ecmascript 6
{
  let a = 10;
  var b = 1;
}
a // ReferenceError: a is not defined.
b // 1
```

* const声明一个只读的常量。一旦声明，常量的值就不能改变。
```ecmascript 6
const PI = 3.1415;
PI // 3.1415

PI = 3;
// TypeError: Assignment to constant variable.
```

# 解构赋值

ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）

```ecmascript 6
// 数组
let [a, b, c] = [1, 2, 3];
// 指定默认值
let [x, y = 'b'] = ['a']; // x='a', y='b'
x // 'a'
y // 'b'

// 对象
let { foo, bar } = { foo: "aaa", bar: "bbb" };
foo // "aaa"
bar // "bbb"
// 属性别名
let { foo: baz } = { foo: 'aaa' };
baz // "aaa"

// 函数参数
function add([x, y]){
  return x + y;
}
function add2({ x, y }){
  return x + y;
}

add([1, 2]); // 3
add2({ x: 1, y: 2}); // 3
```

# 扩展运算符

扩展运算符（spread）是三个点（...）。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。

```ecmascript 6
console.log(...[1, 2, 3])
// 1 2 3

console.log(1, ...[2, 3, 4], 5)
// 1 2 3 4 5

// 函数
function add(x, y) {
  return x + y;
}
const numbers = [4, 38];
add(...numbers) // 42
```

# 模板字符串

模板字符串（template string）是增强版的字符串，用反引号（`）标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。

```ecmascript 6
let name = "Bob", time = "today";
let s = `Hello ${name}, how are you ${time}?`
s // 'Hello Bob, how are you today?'
```

# 函数

## 定义

```ecmascript 6
// 默认值
function log(x, y = 'World') {
  console.log(x, y);
}

log('Hello') // Hello World
log('Hello', 'China') // Hello China

// 解构赋值
function foo({x, y = 5}) {
  console.log(x, y);
}

foo({x: 1}) // 1 5
```

## rest 参数

```ecmascript 6
function add(...values) {
  let sum = 0;

  for (var val of values) {
    sum += val;
  }

  return sum;
}

add(2, 5, 3) // 10
```

## 箭头函数

```ecmascript 6
var sum = (num1, num2) => { return num1 + num2; }

// 等同于
var sum = function(sum1, sum2) {
  return sum1 + sum2;
}
```

注意点:

* 函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。
* 不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
* 不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
* 不可以使用yield命令，因此箭头函数不能用作 Generator 函数。

doing