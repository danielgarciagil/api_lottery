#!/bin/bash

# Verifica si el directorio /tmp existe
if [ -d "/tmp" ]; then
    echo "Borrando el contenido de /tmp..."
    rm -rf /tmp/.org.chromium.Chromi*
    echo "Contenido de /tmp borrado exitosamente."
else
    echo "El directorio /tmp no existe."
fi