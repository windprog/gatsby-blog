---
title: 学习CSS布局（一）流布局（Normal Flow）
date: "2018-04-16 15:48:00"
layout: post
draft: false
path: "/posts/learn-css-layout-float"
category: "CSS"
tags:
  - "CSS"
description: ""
---

# CSS相关属性

## Display属性

* block：使元素显示为块元素，即占用了全部宽度，在前后都是换行符。

* inline：使元素显示为内联元素，内联元素只需要必要的宽度，不强制换行。

* none：隐藏元素，元素不占用空间，就像这个元素不存在一样。

### 例子

span是内联元素，效果如下：

<script async src="//jsrun.net/rUZKp/embed/result,html/light/"></script>

加上：display:block

<script async src="//jsrun.net/mUZKp/embed/result,html,css/light/"></script>

    注意: 设置元素的display属性只是改变元素的显示方式，但不会改变它自身的元素属性。
    如：内联元素只能包含数据和其他内联元素，而块级元素可以包含内联元素和其他块级元素。
    一个display:block的内联元素并不能包含块级元素。

## position属性

* static：元素框正常生成，没有定位。display属性缺省为static. 

    块级元素生成一个矩形框，作为文档流的一部分，内联元素则会创建一个或多个行框，置于其父元素中。
    用static定位的元素不会受top、bottom、left、right、z-index的影响。

* fixed：生成固定定位的元素，相对于浏览器窗口进行定位。不会随着滚动条移动。

    例如我们经常在一些网页看到的最上方的导航条，其固定在屏幕最上端，不会随着我们向下浏览内容而消失。
    元素的位置通过 "left, "top", "right" 以及 "bottom" 属性进行规定。 
    固定位置的元素可以覆盖其他的元素。 
    元素原先在正常文档流中所占的空间会关闭，就好像元素原来不存在一样。
    元素定位后生成一个块级框，而不论原来它在正常流中生成何种类型的框。

* relative：生成相对定位的元素，相对于其正常位置进行定位。 

    属性top,right,bottom,left可用于指定元素如何移位。
    相对定位的元素的内容可以被移动并覆盖其他元素，但在正常流中它原本所占的空间仍保留。

例子：

<script async src="//jsrun.net/RUZKp/embed/result,html,css/light/"></script>

    当设置了top属性之后

<script async src="//jsrun.net/MUZKp/embed/result,html,css/light/"></script>

    结果叠在第三行中，但是第二行的空间并没有消失。

* absolute：元素框从文档流完全删除，并相对于其包含块定位。

    这里的包含块是指它的第一个不是以static定位的父元素，若没有，那么包含块就是<html>。
    元素原先在正常文档流中所占的空间会关闭，就好像元素原来不存在一样。
    元素定位后生成一个块级框，而不论原来它在正常流中生成何种类型的框。

## float属性

该属性用于CSS 浮动定位。

    浮动的框可以向左或向右移动，直到它的外边缘碰到包含框或另一个浮动框的边框为止。
    由于浮动框不在文档的普通流中，所以文档的普通流中的块框表现得就像浮动框不存在一样。

### 例子：向右浮动
<script async src="//jsrun.net/k9ZKp/embed/result,html,css/light/"></script>

### 例子：向左浮动
<script async src="//jsrun.net/Y9ZKp/embed/result,html,css/light/"></script>

    当框 1 向左浮动时，它脱离文档流并且向左移动，直到它的左边缘碰到包含框的左边缘。
    因为它不再处于文档流中，所以它不占据空间，实际上覆盖住了框 2，使框 2 从视图中消失。

### 例子：多个框向左浮动
<script async src="//jsrun.net/i9ZKp/embed/result,html,css/light/"></script>

    把所有三个框都向左移动，那么框 1 向左浮动直到碰到包含框，另外两个框向左浮动直到碰到前一个浮动框。

### 例子：多个框向左浮动，高度不一
<script async src="//jsrun.net/q9ZKp/embed/result,html,css/light/"></script>

    例子中由于: (100 + 5+5) * 3 == 330 > 300(.father)
    包含框太窄，无法容纳水平排列的三个浮动元素，那么其它浮动块向下移动，直到有足够的空间。
    
    接下来由于浮动元素的高度不同，那么当它们向下移动时可能被其它浮动元素"卡住"：

但是你可能会注意到，最外层的框并没有把他们都包裹起来。如何解决呢？

## clear 属性

    由于浮动元素脱离了文档流，所以其里面的三个元素是不占据空间的。
    让包围元素在视觉上包围浮动元素呢？需要在这个元素中的某个地方应用 clear：

<script async src="//jsrun.net/89ZKp/embed/result,html,css/light/"></script>

    这样可以实现我们希望的效果，但是需要添加多余的代码。
    常常有元素可以应用 clear，但是有时候不得不为了进行布局而添加无意义的标记。

## overflow属性

overflow 属性规定当内容溢出元素框时发生的事情。

* visible：默认值。内容不会被修剪，会呈现在元素框之外。
* scroll：内容会被修剪，但是浏览器会显示滚动条以便查看其余的内容。且水平和竖直滚动条都会有。
* auto：如果内容被修剪，则浏览器会显示滚动条以便查看其余的内容。即其和scroll不同的是只有在内容需要修剪时，滚动条才会出现。
* hidden：内容会被修剪，且其余内容是不可见的。

## z-index属性

z-index 属性设置元素的堆叠顺序。拥有更高堆叠顺序的元素总是会处于堆叠顺序较低的元素的前面。 
z-index 仅能在定位元素上奏效(position:absolute,position:relative,position:fixed) 

例子：
正常情况下，由于红色块是后放置在html中的,所以红色会覆盖在蓝色上面。

<script async src="//jsrun.net/GeZKp/embed/result,css,html/light/"></script>

但如果我们给.red加上z-index:-1，显示效果如下：

<script async src="//jsrun.net/HeZKp/embed/result,css,html/light/"></script>


# 资料

## 内敛元素与块级元素列表

内联元素： 
```
b, big, i, small, tt 
abbr, acronym, cite, code, dfn, em, kbd, strong, samp, var 
a, bdo, br, img, map, object, q, script, span, sub, sup 
button, input, label, select, textarea 
```

块级元素：
```
address 联系方式信息。 
article(HTML5) 文章内容。 
aside(HTML5) 伴随内容。 
audio(HTML5) 音频播放。 
blockquote 块引用。 
canvas (HTML5) 绘制图形。 
dd 定义列表中定义条目描述。 
div 文档分区。 
dl 定义列表。 
fieldset 表单元素分组。 
figcaption(HTML5) 图文信息组标题 
figure(HTML5) 图文信息组 (参照 figcaption)。 
footer( HTML5) 区段尾或页尾。 
form 表单。 
<h1>, <h2>, <h3>, <h4>, <h5>, <h6> 标题级别 1-6. 
header(HTML5) 区段头或页头。 
hgroup(HTML5) 标题组。 
hr 水平分割线。 
noscript 不支持脚本或禁用脚本时显示的内容。 
ol 有序列表。 
output(HTML5) 表单输出。 
p 行。 
pre 预格式化文本。 
section(HTML5) 一个页面区段。 
table 表格。 
tfoot 表脚注。 
ul 无序列表。 
video(HTML5) 视频
```