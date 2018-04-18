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

<script async src="//jsrun.net/mUZKp/embed/html,css,result/light/"></script>

### 注意

    设置元素的display属性只是改变元素的显示方式，但不会改变它自身的元素属性。如：
    内联元素只能包含数据和其他内联元素，而块级元素可以包含内联元素和其他块级元素。一个display:block的内联元素并不能包含块级元素。

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

## visibility属性

* hidden：元素不可见。与display:none不同，hidden仍占用空间，只是不可见，而display:none不占用空间。
* visible：元素可见
