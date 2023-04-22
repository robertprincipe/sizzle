ssh root@161.132.38.204

mkdir nueva-carpeta
rv nueva-carpeta carpeta
rv app/carpeta .
rm -r carpeta

nano text.txt
nano nuevoarchivo.py

rm text.txt

source local.env
`export VARIABLE_ENTORNO=ajsklefnkl`

sudo apt intall python3, postgresql, virtualenv, nginx

http://compradia.com:8000

compradia.com/

CREATE USER make WITH PASSWORD 'robert196@+';

CREATE DATABASE minisaas OWNER make;

sudo ufw allow 8000

sudo systemctl enable gunicorn

sudo journalctl -u gunicorn

sudo nano /etc/systemd/system/blog.socket
sudo nano /etc/systemd/system/blog.service

sudo systemctl start blog.socket
sudo systemctl daemon-reload
sudo systemctl enable blog.socket
sudo systemctl status blog.socket

sudo journalctl -u blog.socket

file /run/blog.sock

sudo systemctl status blog

curl --unix-socket /run/blog.sock localhost

gunicorn --bind 0.0.0.0:8000 core.wsgi

```python
1FR5C817!!AV7n
```

PruebaVPS2023|@blog

1FR5C817!!AV7n

17!!AV7n

https://github.com/robertprincipe/blog.git

maick

17!!AV7n|mk

command=/root/blog/env/bin/gunicorn --workerks=3 --bind unix:/run/gunicorn.sock core.wsgi:application
autostart=true
autorestart=true
strerr_logfile=/var/log/gunicorn/gunicorn.err.log
strout_logfile=/var/log/gunicorn/gunicorn.out.log

[group:guni]
programs:gunicorn

server {
listen 80;
server_name 161.132.38.204;
location = /favicon.ico { access_log off; log_not_found off; }
location /static/ {
root /root/blog;
}
location / {
include proxy_params;
proxy_pass http://unix:/run/gunicorn.sock;
}
}

sudo service nginx restart

sudo apt install certbot python3-certbot-nginx
