---
title: Less 入门
date: "2018-04-06 16:31:12"
layout: post
draft: false
path: "/posts/learn-less"
category: "CSS"
tags:
  - "Less"
  - "Quick Learn"
description: "less 的哲学是在可能的情况下重用CSS语法。它很合适初学者。"
---

> less 的哲学是在可能的情况下重用CSS语法。它很合适初学者。

## 变量

**Less** 的一个主要功能就是可以让你像在其它高级语言中一样声明变量，这样你就可以存储你经常使用的任何类型的值 ： 颜色，尺寸，选择器，字体名称和 URL 等。

这里，我们声明了两个变量，一个是背景颜色，一个是文本颜色，它们都是十六进制的值。

Less 代码：
```less
@background-color: #ffffff;
@text-color: #1A237E;

p{
  background-color: @background-color;
  color: @text-color;
  padding: 15px;
}

ul{
  background-color: @background-color;
}

li{
  color: @text-color;
}
```

将其编译成 CSS 代码如下：
```css
p{
    background-color: #ffffff;
    color: #1A237E;
    padding: 15px;
}

ul{
    background-color: #ffffff;
}

li{
    color: #1A237E;
}
```

在上面的例子当中，背景颜色是白色，文本颜色是黑色。比方说，现在我们要切换二者的值，也就是黑色的背景和白色的文本，我们只需要修改两个变量的值就可以了，而不是手动的去修改每个值。

阅读更多有关 Less 变量的内容，[请看这里](http://lesscss.org/features/#variables-feature)。

## Mixins

Less 允许我们将已有的 class 和 id 的样式应用到另一个不同的选择器上。 下面这个例子可以清楚地说明这一点。

```less
#circle{
  background-color: #4CAF50;
  border-radius: 100%;
}

#small-circle{
  width: 50px;
  height: 50px;
  #circle
}

#big-circle{
  width: 100px;
  height: 100px;
  #circle
}
```

将其转换成 CSS 代码如下
```css
#circle {
    background-color: #4CAF50;
    border-radius: 100%;
}
#small-circle {
    width: 50px;
    height: 50px;
    background-color: #4CAF50;
    border-radius: 100%;
}
#big-circle {
    width: 100px;
    height: 100px;
    background-color: #4CAF50;
    border-radius: 100%;
}
```

如果你不想 mixin 也以一种规则的形式出现在 CSS 代码中，那么你可以在它的后面加上括号：

```less
#circle(){
    background-color: #4CAF50;
    border-radius: 100%;
}

#small-circle{
    width: 50px;
    height: 50px;
    #circle
}

#big-circle{
    width: 100px;
    height: 100px;
    #circle
}
```

此时编译成 CSS :

```css
#small-circle {
    width: 50px;
    height: 50px;
    background-color: #4CAF50;
    border-radius: 100%;
}
#big-circle {
    width: 100px;
    height: 100px;
    background-color: #4CAF50;
    border-radius: 100%;
}
```

Mixin 另一个比较酷的功能就是它支持传入参数，下面这个例子就为 circle 传入一个指定宽高的参数，默认是 25px。 这将创建一个 25×25的小圆和一个 100×100 的大圆。

```less
#circle(@size: 25px){
    background-color: #4CAF50;
    border-radius: 100%;

    width: @size;
    height: @size;
}

#small-circle{
    #circle
}

#big-circle{
    #circle(100px)
}
```

转换成 CSS :

```css
#small-circle {
    background-color: #4CAF50;
    border-radius: 100%;
    width: 25px;
    height: 25px;
}
#big-circle {
    background-color: #4CAF50;
    border-radius: 100%;
    width: 100px;
    height: 100px;
}
```

在 [官方文档](http://lesscss.org/features/#mixins-feature) 了解更多关于 mixin 的知识。

## 嵌套

嵌套可用于以与页面的HTML结构相匹配的方式构造样式表，同时减少了冲突的机会。下面是一个无序列表的例子。

```less
ul{
    background-color: #03A9F4;
    padding: 10px;
    list-style: none;

    li{
        background-color: #fff;
        border-radius: 3px;
        margin: 10px 0;
    }
}
```

编译成 CSS 代码：

```css
ul {
    background-color: #03A9F4;
    padding: 10px;
    list-style: none;
}
ul li {
    background-color: #fff;
    border-radius: 3px;
    margin: 10px 0;
}
```

就像在其它高级语言中一样， Less 的变量作用域接受它们的值。如果在指定作用域内没有关于变量值的声明， less 会一直往上查找，直至找到离它最近的声明。

回到 CSS 中来，我们的 li 标签将有白色的文本，如果我们在 ul 标签中声明 @text-color 规则。

```less
@text-color: #000000;

ul{
    @text-color: #fff;
    background-color: #03A9F4;
    padding: 10px;
    list-style: none;

    li{
        color: @text-color;
        border-radius: 3px;
        margin: 10px 0;
    }
}
```

编译生成的 CSS 代码如下：

```css
ul {
    background-color: #03A9F4;
    padding: 10px;
    list-style: none;
}
ul li {
    color: #ffffff;
    border-radius: 3px;
    margin: 10px 0;
}
```
在 [这里](http://lesscss.org/features/#features-overview-feature-scope) 了解更多关于作用域的知识。

## 运算

你可以对数值和颜色进行基本的数学运算。比如说我们想要两个紧邻的 div 标签，第二个标签是第一个标签的两倍宽并且拥有不同的背景色。

```less
@div-width: 100px;
@color: #03A9F4;

div{
    height: 50px;
    display: inline-block;
}

#left{
    width: @div-width;
    background-color: @color - 100;
}

#right{
    width: @div-width * 2;
    background-color: @color;
}
```

编译成 CSS 如下：

```css
div {
    height: 50px;
    display: inline-block;
}
#left {
    width: 100px;
    background-color: #004590;
}
#right {
    width: 200px;
    background-color: #03a9f4;
}
```

## 函数

Less 中也有函数，这让它看起来像一门编程语言了，不是吗？

让我们来看一下  fadeout， 一个降低颜色透明度的函数。

```less
@var: #004590;

div{
  height: 50px;
  width: 50px;
  background-color: @var;

  &:hover{
    background-color: fadeout(@var, 50%)
  }
}
```
编译成 CSS 如下所示：

```css
div {
    height: 50px;
    width: 50px;
    background-color: #004590;
}
div:hover {
    background-color: rgba(0, 69, 144, 0.5);
}
```

通过上述代码，当我们将鼠标悬浮在 div 上时，就可以获取半透明度的动画效果，这比之前自己手动设置要简单的多了。还有很多有用的函数去操纵颜色，检测图像的大小，甚至将资源作为data-uri嵌入样式表，在 [这里](http://lesscss.org/functions/) 查看这些函数的列表。
