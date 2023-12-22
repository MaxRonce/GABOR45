#Dockerfile
# Utiliser une image de base Node.js (spécifiez la version si nécessaire)
FROM node:20.10.0-bookworm-slim

# Install git
RUN apt-get update && apt-get install -y git

# Installer Ionic CLI et Cordova globalement
RUN npm install -g @ionic/cli

# Install vite
RUN npm i -g vite
