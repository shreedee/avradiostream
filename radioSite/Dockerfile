FROM node:11.4.0-stretch as build

WORKDIR /build

COPY . .

RUN npm install && npm run build

FROM wordpress:5.5.1-php7.4 AS base

COPY --from=build /build/wpTheme /var/www/html/wp-content/themes/rev

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["apache2-foreground"]

#CMD tail -f /dev/null

