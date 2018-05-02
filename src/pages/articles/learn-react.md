---
title: React 快速入门
date: "2018-04-30 15:45:00"
layout: post
draft: false
path: "/posts/learn-react"
category: "react"
tags:
  - "React"
  - "Quick Learn"
description: "React 是围绕可重用组件的概念设计的。你定义小组件并将它们组合在一起形成更大的组件。无论大小，所有组件都是可重用的，甚至在不同的项目中也是如此。"
---
# React 全部都是组件化的
React 是围绕可重用组件的概念设计的。你定义小组件并将它们组合在一起形成更大的组件。
无论大小，所有组件都是可重用的，甚至在不同的项目中也是如此。
React 组件最简单的形式，就是一个普通的 JavaScript 函数：

<jsrun id="rEZKp", type="js,result"></jsrun>

上面的代码可以直接在 jsrun 中执行

ReactDOM.render 是 React 的最基本方法，用于将模板转为 HTML 语言，并插入指定的 DOM 节点。

注意事项：

* 组件名称首字母大写，Button。必须要这样做是因为我们将处理 HTML 元素和 React 元素的混合。小写名称是为 HTML 元素保留的。事实上，将 React 组件命名为 “button” 然后你就会发现 ReactDOM 会忽略这个函数，仅仅是将其作为一个普通的空 HTML 按钮来渲染。
* 每个组件都接收一个属性列表，就像 HTML 元素一样。在 React 中，这个列表被称为属性。虽然你可以将一个函数随意命名。
* 在上面 Button 函数组件的返回输出中，我们奇怪地写了段看上去像 HTML 的代码。这实际上既不是 JavaScript 也不是 HTML，老实说，这甚至不是 React.js。然而它非常流行，以至于成为 React 应用程序中的默认值。这就是所谓的 [JSX](https://facebook.github.io/jsx/)，这是一个JavaScript 的扩展。JSX 也是一个折中方案！继续尝试并在上面的函数中返回其他 HTML 元素，看看它们是如何被支持的（例如，返回一个文本输入元素）。

上面例子可以用没有 JSX 的纯 React.js 编写，如下：

<jsrun id="mEZKp", type="js,result"></jsrun>

# 使用 JavaScript 类创建组件

<jsrun id="AEZKp", type="js,result"></jsrun>

# 组件的生命周期

组件的生命周期分成三个状态

* Mounting：已插入真实 DOM
* Updating：正在被重新渲染
* Unmounting：已移出真实 DOM

React 为每个状态都提供了两种处理函数，will 函数在进入状态之前调用，did 函数在进入状态之后调用，三种状态共计五种处理函数。

* componentWillMount()
* componentDidMount()
* componentWillUpdate(object nextProps, object nextState)
* componentDidUpdate(object prevProps, object prevState)
* componentWillUnmount()

此外，React 还提供两种特殊状态的处理函数。

* componentWillReceiveProps(object nextProps)：已加载组件收到新的参数时调用
* shouldComponentUpdate(object nextProps, object nextState)：组件判断是否重新渲染时调用

# react 技术栈相关资料

* [React-Router](http://www.ruanyifeng.com/blog/2016/05/react_router.html?utm_source=tool.lu)
* [Redux](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)
* Redux-saga：[入门](https://juejin.im/post/5ac1cb9d6fb9a028cf32a046) [api参考](https://redux-saga-in-chinese.js.org/docs/api/index.html#callcontext-fn-args) [视频](https://www.youtube.com/watch?v=o3A9EvMspig)  
* dva：[概念](https://github.com/dvajs/dva/blob/master/docs/Concepts_zh-CN.md) [知识地图](https://github.com/dvajs/dva-knowledgemap)
