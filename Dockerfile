# Imagen de Node.js
FROM node:20-bullseye
#FROM node:20

# Instala tzdata
RUN apt update && apt install tzdata -y
ENV TZ="America/New_York"
# Configurar las variables de entorno
ENV PORT="3000"
ENV STATE="DEV"
ENV DB_PASSWORD="1234"
ENV DB_NAME="API"
ENV DB_USER="carlos"
ENV DB_PORT="5432"
ENV DB_HOST="localhost"
ENV PGADMIN_DEFAULT_EMAIL="carlos@mail.com"
ENV PGADMIN_DEFAULT_PASSWORD="1234"
ENV JWT_SECRET="secreto"
ENV JWT_EXPIRE="5d"
ENV USER_ROT_API_EMAIL="root@mail.com"
ENV USER_ROT_API_PASSWORD="12345678"
ENV USER_ADMIN_API_EMAIL="admin@mail.com"
ENV USER_ADMIN_API_PASSWORD="12345678"
ENV USER_USER_API_EMAIL="user@mail.com"
ENV USER_USER_API_PASSWORD="12345678"
ENV API_NOTIFICACIONES="EXAMPLE"


#Instalar el navegador
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable

#Crear la carperta
WORKDIR /app

#Anandir todo
ADD . .

#Comando Basicos
RUN npm install
RUN npm run build

CMD ["npm", "run", "start:prod"]
EXPOSE $PORT