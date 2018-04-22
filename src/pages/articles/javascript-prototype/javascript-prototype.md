---
title: 理解JS对象和原型链
date: "2018-04-22 17:15:00"
layout: post
draft: false
path: "/posts/javascript-prototype"
category: "javascript-prototype"
tags:
  - "JavaScript"
description: "每个JS对象一定对应一个原型对象，并从原型对象继承属性和方法。"
---


# __proto__和prototype
## \_\_proto__

引用《JavaScript权威指南》的一段描述：

> Every JavaScript object has a second JavaScript object (or null , but this is rare) associated with it. This second object is known as a prototype, and the first object inherits properties from the prototype.

    翻译出来就是每个JS对象一定对应一个原型对象，并从原型对象继承属性和方法。

既然有这么一个原型对象，那么对象怎么和它对应的？

对象__proto__属性的值就是它所对应的原型对象：

```javascript
var one = {x: 1};
var two = new Object();
one.__proto__ === Object.prototype // true
two.__proto__ === Object.prototype // true
one.toString === one.__proto__.toString // true
```

## prototype

不像每个对象都有__proto__属性来标识自己所继承的原型，只有函数才有prototype属性。

JS不像其它面向对象的语言，它没有类（class，ES6引进了这个关键字，但更多是语法糖）的概念。JS通过函数来模拟类。

    当创建函数时，JS会为这个函数自动添加prototype属性，值是一个有 constructor 属性的对象。
    当你把这个函数当作构造函数（constructor）调用（即通过new关键字调用），那么JS就会帮你创建该构造函数的实例。
    实例继承构造函数prototype的所有属性和方法（实例通过设置自己的__proto__指向承构造函数的prototype来实现这种继承）。

# 小结

JS正是通过__proto__和prototype的实现了原型链，以及对象的继承。

构造函数，通过prototype来存储要共享的属性和方法，也可以设置prototype指向现存的对象来继承该对象。

```javascript
function Func(){}
Func.prototype.name = "Sean";
Func.prototype.getInfo = function() {
  return this.name;
}
var person = new Func();//现在可以参考var person = Object.create(oldObject);
console.log(person.getInfo());//它拥有了Func的属性和方法
//"Sean"
console.log(Func.prototype);
// Func { name="Sean", getInfo=function()}
```

    对象的__proto__指向自己构造函数的prototype。obj.__proto__.__proto__...的原型链由此产生。
    包括我们的操作符instanceof正是通过探测obj.__proto__.__proto__... === Constructor.prototype来验证obj是否是Constructor的实例。

回到开头的代码，two = new Object()中Object是构造函数，所以two.__proto__就是Object.prototype。

至于one，ES规范定义**对象字面量**（使用键值队的方式创建对象的语法）的原型就是Object.prototype。

一张图和总结
![原型链](jsobj_full.jpg)
