使用 Let's Encrypt 免费证书 需要先停止nginx服务
sudo yum install certbot python3-certbot-nginx
sudo certbot --nginx -d mp.sifon.top（自动配置，测试没完成）
手动获取证书（备用方法）
sudo certbot certonly --standalone -d mp.sifon.top
添加 HTTPS 支持的配置：
```
server {
    listen 80;
    server_name mp.sifon.top;
    return 301 https://$host$request_uri;
}
  

server {
    listen 443 ssl;
    server_name mp.sifon.top;
    listen 80;
    server_name mp.sifon.top;

    ssl_certificate /etc/letsencrypt/live/mp.sifon.top/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/mp.sifon.top/privkey.pem;


    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}


```
重启nginx
sudo nginx -t
sudo systemctl start nginx


管理证书续期
使用 Certbot 自动续期 Let's Encrypt 推荐使用 certbot 自动续期工具。
自动续期命令：
sudo certbot renew --dry-run
手动续期
sudo certbot renew
验证续期状态 确认证书更新是否成功：
sudo certbot certificates