#!/bin/bash

# Leer la versión actual del archivo version.txt
current_version=$(cat version.txt)

# Incrementar la versión
new_version=$(echo $current_version | awk -F. -v OFS=. '{$NF++;print}')

# Actualizar la versión en el archivo version.txt
echo $new_version > version.txt

# Construir la imagen de Docker con la nueva versión
docker build -t api_lottery:$new_version .

# Etiquetar la imagen con la nueva versión
docker tag api_lottery:$new_version carlosdiazz08/api_lottery:$new_version
docker tag api_lottery:$new_version carlosdiazz08/api_lottery:latest

# Subir la imagen etiquetada al repositorio de Docker
if docker push carlosdiazz08/api_lottery:latest && docker push carlosdiazz08/api_lottery:$new_version; then
  echo "La imagen se ha subido correctamente"
  echo "$new_version" >> version_history.txt
  echo $current_version > last_version.txt
else
  echo "Error al subir la imagen. Restaurando la versión anterior."
  echo $current_version > version.txt
fi