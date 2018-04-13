---
title: scss 入门
date: "2018-04-06 17:38:00"
layout: post
draft: false
path: "/posts/learn-scss"
category: "CSS"
tags:
  - "Scss"
  - "Sass"
  - "Quick Learn"
description: "如果你需要编写大量的 CSS ，预处理器可以大大降低你的重复工作，并节省大量宝贵的时间。使用诸如 Sass，Less，Stylus 或 PostCSS 之类的工具，使得大而复杂的样式表更加清晰易懂，易于维护。因为具有变量，函数和混合等功能，代码变得更加有条理，使开发人员能够更快地开发，并减少错误。"
---

> 如果你需要编写大量的 CSS ，预处理器可以大大降低你的重复工作，并节省大量宝贵的时间。使用诸如 Sass，Less，Stylus 或 PostCSS 之类的工具，使得大而复杂的样式表更加清晰易懂，易于维护。因为具有变量，函数和混合等功能，代码变得更加有条理，使开发人员能够更快地开发，并减少错误。

## 入门

Sass 文件不能被浏览器直接解析，所以在生产环境下，需要编译成标准的 CSS 。这就是为什么你需要一个工具来帮助你将 .scss 文件转换成 .css 。 这里有几个选择：

如果你决定使用命令行，你可以以原始形式（使用 ruby）安装 Sass，也可以尝试使用 Node.js 。当然还有很多其他的选择，这取决于你自己。

以下是使用 CLI 编译 .scss 文件的方法：

```bash
node-sass input.scss output.css
```

此外, Sass 提供两种不同的语法 – SASS 和 SCSS 。它们做同样的事情，只是用不同的方式编写。 SCSS 是较新的，通常被认为更好，所以我们这里使用 SCSS 。

## 变量

Sass 中的变量和其他编程语言类似，包括数据类型和作用域等。当定义一个变量时，我们在其中存储一个特定的值，这通常是 CSS 中经常重现的东西，就像一个颜色，一个字体样式或者一个整体规格的盒子阴影。

下面你可以看到一个简单的例子。

SCSS 

```scss
$title-font: normal 24px/1.5 'Open Sans', sans-serif;
$cool-red: #F44336;
$box-shadow-bottom-only: 0 2px 1px 0 rgba(0, 0, 0, 0.2);

h1.title {
  font: $title-font;
  color: $cool-red;
}

div.container {
  color: $cool-red;
  background: #fff;
  width: 100%;
  box-shadow: $box-shadow-bottom-only;
}
```

编译后的 CSS

```css
h1.title {
  font: normal 24px/1.5 "Open Sans", sans-serif;
  color: #F44336; 
}

div.container {
  color: #F44336;
  background: #fff;
  width: 100%;
  box-shadow: 0 2px 1px 0 rgba(0, 0, 0, 0.2);
}
```

如果我们希望以后可以更快地重用相同的值，或者如果需要更改，那么就可以在一个地方（变量的定义）提供新的值，而不是在很多地方手动更改该属性。

## Mixins

你可以将混合视为编程语言中构造函数类的简化版本 – 你可以获取一组 CSS 声明，并重新使用它，无论你想要输出什么，并且可以组合一组特定的样式。

混合甚至可以接受带有设置默认值的选项的参数。在下面的例子中，我们定义一个正方形 mixin ，然后使用它来创建不同大小和颜色的正方形。

SCSS

```scss
@mixin square($size, $color) {
  width: $size;
  height: $size;
  background-color: $color;
}

.small-blue-square {
  @include square(20px, rgb(0,0,255));
}

.big-red-square {
  @include square(300px, rgb(255,0,0));
}
```

编译后的 CSS

```css
.small-blue-square {
  width: 20px;
  height: 20px;
  background-color: blue; 
}

.big-red-square {
  width: 300px;
  height: 300px;
  background-color: red;
}
```

使用 mixin 的另一种有效方法是当一个属性需要前缀在所有浏览器中运行时。

SCSS

```scss
@mixin transform-tilt() {
  $tilt: rotate(15deg);

  -webkit-transform: $tilt; /* Ch <36, Saf 5.1+, iOS, An =<4.4.4 */
      -ms-transform: $tilt; /* IE 9 */
          transform: $tilt; /* IE 10, Fx 16+, Op 12.1+ */
}

.frame:hover { 
  @include transform-tilt; 
}
```

编译后的 CSS

```css
.frame:hover {
  -webkit-transform: rotate(15deg);  /* Ch <36, Saf 5.1+, iOS, An =<4.4.4 */
  -ms-transform: rotate(15deg);  /* IE 9 */
  transform: rotate(15deg);  /* IE 10, Fx 16+, Op 12.1+ */ 
}
```

## 继承

它允许你将一个选择器的 CSS 属性继承到另一个。这与混合系统类似，但是当我们要在页面上的元素之间创建一个逻辑连接时，它们是首选的。

SCSS

```scss
.dialog-button {
  box-sizing: border-box;
  color: #ffffff;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.12);
  padding: 12px 40px;
  cursor: pointer;
}

.confirm {
  @extend .dialog-button;
  background-color: #87bae1;
  float: left;
}

.cancel {
  @extend .dialog-button;
  background-color: #e4749e;
  float: right;
}
```

编译后的 CSS

```css
.dialog-button, .confirm, .cancel {
  box-sizing: border-box;
  color: #ffffff;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.12);
  padding: 12px 40px;
  cursor: pointer; 
}

.confirm {
  background-color: #87bae1;
  float: left; 
}

.cancel {
  background-color: #e4749e;
  float: right; 
}
```

从上面的 CSS 可以看出，Sass 组合了选择器，而不是一遍又一遍地重复相同的声明，从而节省了宝贵的内存。

## 嵌套
HTML 遵循严格的嵌套结构，而在 CSS 中通常是完全混乱的。使用 Sass 嵌套，你可以更加紧密地组织样式表，从而减少 CSS 冲突的机会。

为了加快开发速度，我们可以设计一个包含多个链接的列表：

SCSS

```scss
ul {
  list-style: none;

  li {
    padding: 15px;
    display: inline-block;

    a {
      text-decoration: none;
      font-size: 16px;
      color: #444;
    }

  }

}
```

编译后的 CSS

```css
ul {
  list-style: none; 
}

ul li {
  padding: 15px;
  display: inline-block; 
}

ul li a {
  text-decoration: none;
  font-size: 16px;
  color: #444; 
}
```

非常整齐并且能够有效避免冲突。

运算符
使用 Sass，你可以在样式表中进行基本的数学运算，它与应用程序中的算术符号一样简单。

SCSS

```scss
$width: 800px;

.container { 
  width: $width;
}

.column-half {
  width: $width / 2;
}

.column-fifth {
  width: $width / 5;
}
```

编译后的 CSS

```css
.container {
  width: 800px; 
}

.column-half {
  width: 400px; 
}

.column-fifth {
  width: 160px; 
}
```

虽然 vanilla CSS 现在也以 calc() 的形式提供了这个特性，但 Sass 替代方法可以更快书写，具有 % 运算符，并且可以应用于更广泛的数据类型（例如颜色和字符串）。

## 函数

Sass 提供了一系列内置函数。它们提供各种用途，包括字符串操作，颜色相关操作，以及一些方便的数学方法，如 random() 和 round() 。

SCSS

```scss
$awesome-blue: #2196F3;

a {
  padding: 10px 15px;
  background-color: $awesome-blue;
}

a:hover {
  background-color: darken($awesome-blue,10%);
}
```
编译后的 CSS

```css
a {
  padding: 10px 15px;
  background-color: #2196F3; 
}

a:hover {
  background-color: #0c7cd5; 
}
```

除了庞大的可用函数列表外，还可以自定义选项。 Sass 也支持流量控制，所以如果你想，你可以创建相当复杂的行为。
