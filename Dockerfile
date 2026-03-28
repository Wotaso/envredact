FROM nginx:1.27-alpine

WORKDIR /usr/share/nginx/html

COPY index.html style.css app.js ./

EXPOSE 80
