---
title: "部署"
date: "2024-11-29"
category: "技术"
---

前提是保证服务器 80 和 443 端口是开放的 sudo netstat -tuln | grep ':80\|:443'
tcp 0 0 0.0.0.0:80 0.0.0.0:_ LISTEN tcp 0 0 0.0.0.0:443 0.0.0.0:_ LISTEN

保证防火墙没有屏蔽 80 和 443 端口使用 Firewalld（CentOS 7+/RedHat 系统常用） (1)
确认 Firewalld 是否正在运行 sudo systemctl status firewalld 如果未启动，启用
Firewalld： sudo systemctl start firewalld sudo systemctl enable firewalld (2)
开放 443 端口 sudo firewall-cmd --permanent --add-port=443/tcp sudo firewall-cmd
--reload (3) 检查规则是否生效 sudo firewall-cmd --list-all

5. 验证端口是否已开放 sudo netstat -tuln | grep 443
