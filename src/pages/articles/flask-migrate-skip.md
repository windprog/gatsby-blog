---
title: Flask-Migrate变更数据库忽略指定表
date: "2018-04-06 10:10:02"
layout: post
draft: false
path: "/posts/flask-migrate-skip"
category: "Python"
tags:
  - "Flask-Migrate"
description: "在合并表的时候有一些表并不想托管，我们需要把它跳过升级检查。"
---


处理思路是使用alembic库中的comparators
增加一个context的二次处理方法达到过滤目的。
Flask-Migrate==2.1.1测试通过

```
from flask_script import Manager
from flask.ext.migrate import Migrate, MigrateCommand
from models import db

def migrate_skip(migrate, skip_list):
    @migrate.configure
    def configure_alembic(config):
        from alembic.autogenerate.compare import comparators

        @comparators.dispatch_for("schema")
        def _autogen_for_tables(autogen_context, upgrade_ops, schemas):
            # 处理跳过的表
            upgrade_ops.ops = [op for op in upgrade_ops.ops if op.table_name not in skip_list]

        return config

app = create_app()
manager = Manager(app)
migrate = Migrate(app, db)

# 数据库比对升级跳过指定的表
skip_list = [
    "some_table",
]
migrate_skip(migrate, skip_list)

if __name__ == '__main__':
    manager.add_command('db', MigrateCommand)
    manager.run()
```
