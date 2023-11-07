# Etapa 1: Construcción de la aplicación
###! VERSION MAS LIGERA
###! FROM node:20-bullseye as build
FROM node:21 as build

# Instala tzdata
RUN apt update && apt install tzdata -y
ENV TZ=America/Puerto_Rico

# Establece el directorio de trabajo
WORKDIR /app

# Copia el resto de los archivos de la aplicación
COPY . .

# Comandos básicos
RUN npm install
RUN npm run build

# Ejecuta el comando npm run pg:run-mg
#RUN npm run pg:run-mg


# Etapa 2: Creación de la imagen final
###! VERSION MAS LIGERA
###! FROM node:20-bullseye
FROM node:21

# Instala el navegador
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable

# Configurar las variables de entorno
ENV TZ=America/Puerto_Rico
ENV PORT=3000
ENV STATE=DEV
ENV DB_PASSWORD=1234
ENV DB_NAME=API
ENV DB_USER=carlos
ENV DB_PORT=5432
ENV DB_HOST=localhost
ENV PGADMIN_DEFAULT_EMAIL=carlos@mail.com
ENV PGADMIN_DEFAULT_PASSWORD=1234
ENV JWT_SECRET=secreto
ENV JWT_EXPIRE=5d
ENV USER_ROT_API_EMAIL=root@mail.com
ENV USER_ROT_API_PASSWORD=12345678
ENV USER_ADMIN_API_EMAIL=admin@mail.com
ENV USER_ADMIN_API_PASSWORD=12345678
ENV USER_USER_API_EMAIL=user@mail.com
ENV USER_USER_API_PASSWORD=12345678
ENV API_NOTIFICACIONES=EXAMPLE

# Copia solo los archivos necesarios desde la etapa de construcción
COPY --from=build /app /app

# Establece el directorio de trabajo
WORKDIR /app

# Comando para iniciar la aplicación en producción
CMD ["npm", "run", "start:prod"]

# Exponer el puerto
EXPOSE $PORT

#!PRUEBA
# Imagen de Node.js
#FROM node:20-bullseye
##FROM node:20
#
## Instala tzdata
#RUN apt update && apt install tzdata -y
#ENV TZ="America/New_York"
## Configurar las variables de entorno
#ENV PORT="3000"
#ENV STATE="DEV"
#ENV DB_PASSWORD="1234"
#ENV DB_NAME="API"
#ENV DB_USER="carlos"
#ENV DB_PORT="5432"
#ENV DB_HOST="localhost"
#ENV PGADMIN_DEFAULT_EMAIL="carlos@mail.com"
#ENV PGADMIN_DEFAULT_PASSWORD="1234"
#ENV JWT_SECRET="secreto"
#ENV JWT_EXPIRE="5d"
#ENV USER_ROT_API_EMAIL="root@mail.com"
#ENV USER_ROT_API_PASSWORD="12345678"
#ENV USER_ADMIN_API_EMAIL="admin@mail.com"
#ENV USER_ADMIN_API_PASSWORD="12345678"
#ENV USER_USER_API_EMAIL="user@mail.com"
#ENV USER_USER_API_PASSWORD="12345678"
#ENV API_NOTIFICACIONES="EXAMPLE"
#
#
##Instalar el navegador
#RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
#    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list' \
#    && apt-get update \
#    && apt-get install -y google-chrome-stable
#
##Crear la carperta
#WORKDIR /app
#
##Anandir todo
#ADD . .
#
##Comando Basicos
#RUN npm install
#RUN npm run build
#
#CMD ["npm", "run", "start:prod"]
#EXPOSE $PORT