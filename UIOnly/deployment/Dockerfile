FROM nginx:1.19.9-alpine

EXPOSE 80
COPY ./conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY ./build/ /usr/share/nginx/html
ENTRYPOINT ["/docker-entrypoint.sh"]

STOPSIGNAL SIGQUIT

CMD ["nginx", "-g", "daemon off;"]
