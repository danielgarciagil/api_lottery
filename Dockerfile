#Imagen de Node
FROM node:20

RUN apt update && apt install tzdata -y
ENV TZ="America/New_York"

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
EXPOSE 5000