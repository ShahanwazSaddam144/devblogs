server {
    server_name devblogs.buttnetworks.com;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/devblogs.buttnetworks.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/devblogs.buttnetworks.com/privkey.pem;
}

server {
    if ($host = devblogs.buttnetworks.com) {
        return 301 https://$host$request_uri;
    }
    listen 80;
    server_name devblogs.buttnetworks.com;
}

