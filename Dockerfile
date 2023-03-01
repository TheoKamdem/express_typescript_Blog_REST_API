# Utilisation de l'image officielle Node.js
FROM node:14-alpine

# Répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copie des fichiers package.json et package-lock.json dans le conteneur
COPY package*.json ./

# Installation des dépendances
RUN npm install && npm install -g nodemon

# Copie des fichiers source de l'application dans le conteneur
COPY . .

# Build de l'application TypeScript
RUN npm run build

# Exposition du port de l'application
EXPOSE 4000

 # Commande de démarrage de l'application   
CMD ["nodemon", "./src/app.ts"]