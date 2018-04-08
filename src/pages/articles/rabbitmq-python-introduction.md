---
title: RabbitMQ python 入门教程
date: "2018-04-06 10:50:05"
layout: post
draft: false
path: "/posts/rabbitmq-python-introduction"
category: "Python"
tags:
  - "RabbitMQ"
  - "Python"
description: "RabbitMQ是实现AMQP（高级消息队列协议）的消息中间件的一种，最初起源于金融系统，用于在分布式系统中存储转发消息，在易用性、扩展性、高可用性等方面表现不俗。
RabbitMQ是用Erlang写的。在Erlang当中，充斥着大量轻量进程，它们之间用消息传递来通信。听起来思路和我们用消息队列的思路是一样的。"
---

# RabbitMQ 介绍
RabbitMQ是实现AMQP（高级消息队列协议）的消息中间件的一种，最初起源于金融系统，用于在分布式系统中存储转发消息，在易用性、扩展性、高可用性等方面表现不俗。
RabbitMQ是用Erlang写的。在Erlang当中，充斥着大量轻量进程，它们之间用消息传递来通信。听起来思路和我们用消息队列的思路是一样的。

# AMQP
AMQP当中有四个概念非常重要：虚拟主机（virtual host），交换机（exchange），队列（queue）和绑定（binding）。

## 虚拟主机（virtual host）
一个虚拟主机持有一组交换机、队列和绑定。为什么需要多个虚拟主机呢？很简单，RabbitMQ当中，用户只能在虚拟主机的粒度进行权限控制。因此，如果需要禁止A组访问B组的交换机/队列/绑定，必须为A和B分别创建一个虚拟主机。每一个RabbitMQ服务器都有一个默认的虚拟主机“/”。

## 队列（queue）：

队列（Queues）是你的消息（messages）的终点，可以理解成装消息的容器。消息就一直在里面，直到有客户端（也就是消费者，Consumer）连接到这个队列并且将其取走为止。
需要记住的是，队列是由消费者（Consumer）通过程序建立的，不是通过配置文件或者命令行工具。

## 交换机（exchange）
交换机可以理解成具有路由表的路由程序。每个消息都有一个称为路由键（routing key）的属性，就是一个简单的字符串。交换机当中有一系列的绑定（binding），即路由规则（routes），例如，指明具有路由键 “X” 的消息要到名为"list"的队列当中去。
由于每个交换机一个进程，你可以创建多个交换机，可以充分利用服务器上的CPU核以便达到更高的效率。

交换机有多种类型：

* Fanout Exchange – 不处理路由键。一个发送到交换机的消息都会被转发到与该交换机绑定的所有队列上。
* Direct Exchange – 处理路由键。一个消息会与一个特定的路由键完全匹配，到达目标队列。
* Topic Exchange – 模糊匹配路由键。此时队列需要绑定要一个模式上。符号“#”匹配一个或多个词，符号“*”匹配不多不少一个词。例如“*.topic”

## 绑定（binding）
由于声明了交换机和队列之后，MQ并不知道把消息投递到哪个队列。所以需要路由规则，即绑定（binding）。
一个绑定就是一个类似这样的规则：将交换机“main”当中具有路由键“X”的消息送到队列“list”里面去。当然你也可以建立两个甚至多个，就可以把一个消息同时投递到多个队列里了。

# 持久化
队列和交换机有一个创建时候指定的标志durable，直译叫做坚固的。durable的唯一含义就是具有这个标志的队列和交换机会在重启之后重新建立，它不表示说在队列当中的消息会在重启后恢复。
需要持久化消息，则需要在发布消息到交换机的时候，指定一个标志“Delivery Mode”（投递模式）。
也就是说，持久化消息的步骤：

* 将交换机设成 durable。
* 将队列设成 durable。
* 将消息的 Delivery Mode 设置成2 。

而对于绑定（Bindings），如果你绑定了一个durable的队列和一个durable的交换机，RabbitMQ会自动保留这个绑定。类似的，如果删除了某个队列或交换机（无论是不是durable），依赖它的绑定都会自动删除。

注意：

* RabbitMQ 不允许你绑定一个非坚固（non-durable）的交换机和一个durable的队列。反之亦然。要想成功必须队列和交换机都是durable的。
* 一旦创建了队列和交换机，就不能修改其标志了。例如，如果创建了一个non-durable的队列，然后想把它改变成durable的，唯一的办法就是删除这个队列然后重现创建。

# Python
我们这里使用[pika](https://github.com/pika/pika)
## 消费者
```python
import urllib
import pika
from conf import config

username = ""
passwd = ""
host = "localhost"
port = 5672  # 默认端口
vhost = '/'  # 默认virtual host


URL = "amqp://{user_info}{host}:{port}/{vhost}".format(
    user_info="%s:%s@" % (username, passwd) if username else "",
    host=config.MQ_HOST,
    port=port,
    vhost=urllib.quote_plus(vhost),
)
parameters = pika.URLParameters(URL)

connection = pika.BlockingConnection(
    parameters=parameters
)

channel = connection.channel()
# 声明交换机
channel.exchange_declare(
    exchange="test_exchange",  # 交换机名称
    exchange_type="topic",  # 交换机类型，topic为模糊匹配
    auto_delete=False,  # 没有队列的时候删除
    durable=True,  # 交换机定义为持久的（坚固的）
)
# 声明队列
channel.queue_declare(
    queue='test_queue',  # 队列名称
    durable=True,  # 队列定义为持久的（坚固的）
    exclusive=False,  # 只能有当前连接访问
    auto_delete=True,  # 断开连接的时候删除
)
# 绑定队列到交换机中
channel.queue_bind(
    queue='test_queue',  # 队列名称
    exchange='monitor2',  # 交换机名称
    routing_key='*.heartbeat',  # 路由规则（名称）
)

# 开始读取队列消息
for method_frame, properties, body in channel.consume(
    queue='test_queue',  # 队列名称
    no_ack=True,  # 无需回复ACK
    inactivity_timeout=None
):
    # 打印数据
    print(method_frame, properties, body)
    # channel.basic_ack(method_frame.delivery_tag)  # 如果设置了no_ack=False 则需要回复

    # 消息计数器
    if method_frame.delivery_tag == 10:
        break

channel.cancel()
connection.close()
```

## 生产者
```
import pika

parameters = pika.URLParameters('amqp://guest:guest@localhost:5672/%2F')
connection = pika.BlockingConnection(
    parameters=parameters
)
channel = connection.channel()
channel.basic_publish(
    exchange='test_exchange',  # 交换机
    routing_key='test_routing_key',  # 路由键
    body='message body value',  # 消息体
    properties=pika.BasicProperties(  # 消息属性
        content_type='text/plain',
        delivery_mode=2,  # 消息持久化
    )
)
connection.close()
```
