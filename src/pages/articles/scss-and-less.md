---
title: Sass/Scss 和 Less 的区别
date: "2018-04-06 11:17:02"
layout: post
draft: false
path: "/posts/scss-and-less"
category: "CSS"
tags:
  - "SCSS"
  - "SASS"
  - "LESS"
description: "平常开发中经常遇到项目是SASS或者LESS的，他的语法究竟有什么区别呢？"
---

# 预处理器介绍

我们都知道写 CSS 代码是有些枯燥无味的，尤其是面对那些成千上万行 CSS 代码的项目。你始终在相同的地方使用相同的规则并且在你的编译器中搜索和替换每次颜色的变化。这需要很多的努力和规则来保持你的 CSS 可维护，但它本不应该这样的。
  
很幸运，网站开发社区已经解决了这个问题，现在我们拥有诸如 Less, Sass 和 Stylus 之类的预处理器，它们给我们提供了许多优于纯 CSS 的好处。

- 变量 - 它可以让你更轻松的在整个样式表中定义和更改值（这个功能 CSS 在未来某一天也有可能会实现）。
- 动态计算值 - CSS 中最近出了一个 cal()， 但它只适合用于长度的计算。
- Mixins - 可以让你重用或者组合样式，而且支持传递参数。
- 函数 - 它为你提供了一些方便的程序去操纵颜色，转换图像等。

使用预处理器的唯一缺点就是，你需要将代码转换为纯 CSS 代码，才能让它能够在浏览器中工作。

# Sass、Scss和less是什么关系?

Sass的缩排语法，对于写惯css前端的web开发者来说很不直观，也不能将css代码加入到Sass里面，因此sass语法进行了改良，Sass 3就变成了Scss(sassy css)。与原来的语法兼容，只是用{}取代了原来的缩进。

Less也是一种动态样式语言. 对CSS赋予了动态语言的特性，如变量，继承，运算， 函数.

# Sass/Scss与Less区别

## 编译环境不一样

* Sass：安装需要Ruby环境，是在服务端处理
* Less：需要引入less.js来处理Less代码输出css到浏览器，也可以在开发环节使用Less，然后编译成css文件，直接放到项目中。

## 变量符不一样

Less是@，而Scss是$

## 变量作用域不一样

Less-作用域
```less
@color: #00c; /* 蓝色 */

#header {
  @color: #c00; /* red */
  border: 1px solid @color; /* 红色边框 */
}
#footer {
  border: 1px solid @color; /* 蓝色边框 */
}
```

Less-作用域编译后
```css
#header{border:1px solid #cc0000;}
#footer{border:1px solid #0000cc;}
```

scss-作用域
```scss
$color: #00c; /* 蓝色 */

#header {
  $color: #c00; /* red */
  border: 1px solid $color; /* 红色边框 */
}
#footer {
  border: 1px solid $color; /* 蓝色边框 */
}
```

scss-作用域编译后

```css
#header{border:1px solid #c00}
#footer{border:1px solid #c00}
```

## 循环支持

scss支持条件语句，可以使用if{}else{},for{}循环等等。而Less不支持。
复制代码
```scss
/* Sample Sass “if” statement */

@if lightness($color) > 30% {

} @else {

}

/* Sample Sass “for” loop */

@for $i from 1 to 10 {
  .border-#{$i} {
    border: #{$i}px solid blue;
  }
}
```

## 引用外部CSS文件

scss引用的外部文件命名必须以_开头, 如下例所示:其中_test1.scss、_test2.scss、_test3.scss文件分别设置的h1 h2 h3。
文件名如果以下划线_开头的话，Sass会认为该文件是一个引用文件，不会将其编译为css文件.

```scss
@import "_test1.scss";
@import "_test2.scss";
@import "_test3.scss";

// 编译后：
h1 {
  font-size: 17px;
}
 
h2 {
  font-size: 17px;
}
 
h3 {
  font-size: 17px;
}
```
 
Less引用外部文件和css中的@import没什么差异。
