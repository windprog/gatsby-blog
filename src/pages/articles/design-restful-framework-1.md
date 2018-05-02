---
title: Rest-Utils设计分享（一）
date: "2018-04-12 14:43:00"
layout: post
draft: false
path: "/posts/design-restful-framework.md"
category: "restful"
tags:
  - "design"
  - "restful"
  - "framework"
description: "Rest-Utils 为使用 SQLAlchemy (or Flask-SQLAlchemy) 定义的数据库模型提供简单的Restful APIs生成。"
---

# 介绍
[Rest-Utils](https://windprog.github.io/rest-utils/) 为使用 SQLAlchemy (or Flask-SQLAlchemy) 定义的数据库模型提供简单的Restful APIs生成。 
生成的API以JSON格式转换数据。内部使用 marshmallow 使得复用数据转换非常简单。

# Rest-Utils需要解决的问题

* Restful API

    在内部系统中，大部分需求是数据库的增删改查。会很自然的使用restful方式描述。

* 统一调用格式

    使用了统一的开发框架、参数风格、返回格式和错误码，会让前后端的沟通成本大幅降低。

* 数据校验和转换

    对于有自定义需求的api，例如：

    * 调用第三方的接口和本地数据库合并返回
    * 自定义数据库数据处理过程
    * 自定义返回数据的格式

    我们需要足够的自定义能力同时，也能解放生产力。在这里我们使用的是：[marshmallow](https://github.com/marshmallow-code/marshmallow)


# Restful 设计思路

## 路径

路径又称"终点"（endpoint），表示API的具体网址。

在RESTful架构中，每个网址代表一种资源（resource），所以网址中不能有动词，只能有名词，而且所用的名词往往与数据库的表格名对应。一般来说，数据库中的表都是同种记录的"集合"（collection），所以API中的名词也应该使用复数。

举例来说，有一个API用户（users）的信息，还包括各种用户组、帖子的信息。则它的路径应该设计成下面这样。

    https://api.example.com/v1/users
    https://api.example.com/v1/groups
    https://api.example.com/v1/posts

## HTTP动词

对于资源的具体操作类型，由HTTP动词表示。也就是常用的CURD(增删改查)。

GET（SELECT）：从服务器取出资源（一项或多项）。
POST（CREATE）：在服务器新建一个资源。
PUT（UPDATE）：在服务器更新资源（客户端提供改变后的完整资源）。
DELETE（DELETE）：从服务器删除资源。

    GET /users：列出所有用户
    POST /users：新建一个用户
    GET /users/ID：获取某个用户的信息
    PUT /users/ID：更新某个用户的信息
    DELETE /users/ID：删除某个用户
    GET /users/ID/groups：列出某个用户的所有组

## 过滤信息

一般情况下，一张表的数据可能会很多、每条记录内的字段也可能很多。从节省资源的角度，我们应该提供参数过滤返回结果。

下面是本框架的一些常用参数。

* ?_num=10&_page=2：指定每页10条，返回第二页的内容
* ?_orders=id:asc：指定id字段升序排序
* ?name=windpro：指定筛选条件

## 状态码

以下为一些常用的返回码


* 200：请求正确
* 201：创建成功
* 204：删除成功

## 错误处理

对于一般的设计，常常使用错误代码来代表错误的类型，其实对于使用不太友好。

常常要根据code和msg来共同定位。直接使用错误类型"ResourceNotFound"来表达更容易前后端通用。

以下为一些常用的错误类型

* PermissionDenied：权限错误
* AccessDenied：非法访问。一般出现在路径不存在等
* ResourceNotFound：资源不存在

```json
{
    "type": "PermissionDenied",
    "msg": "权限错误",
    "detail": {}
}
```

# 数据转换设计思路

在日常的开发中，我们常常会使用 sqlachemy 这样的 orm 库，去描述和管理我们的关系数据库。orm的作用在于映射数据库的 table,row 到 编程语言的 class,instance。

我们是否可以建立一个schema，去映射 orm instance 和 json呢？这就是我建立这个库的原因。

利用我们现有或sqlachemy automap，我们可以分析和提取字段和表的约束条件。
最终实现映射前端json 和 orm instance。

实现细节：
```python
class Users(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.Unicode(32), unique=True)  # 用户名唯一

class UsersSchema(ModelSchema):
    __model__ = Users
```

这样简单的建立schema，就可以将users表的字段和规则自动导入到marshmallow schema中。

了解 [marshmallow](https://github.com/marshmallow-code/marshmallow) 的童鞋应该知道，需要利用它来序列化和反序列化对象，需要预先定义字段，才能转换数据。

我们为何能不定义字段转换呢？

感兴趣的同学可以看看ModelSchema的实现。具体是使用python metaclass在建立“类对象”的时候\_\_new__添加类属性。
