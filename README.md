# Exemple de code d'authentification avec node.js

## Prérequis
- Avoir Node.js installé sur son poste
  - Via un terminal, se placer dans le dossier `/backend`
  - Lancer la commande `npm install` (cela devrait créer un dossier `/node_modules` et télécharger tous les packages nécéssaire)
- Avoir installé Wampserver sur son poste
  - Importer la base de donnée
    - Aller dans l'interface d'administration de mysql (voir capture d'écran ci dessous)
    - Identifiez vous (id: 'root', mdp: '')
    - Cliquer sur importer
    - Importer le fichier `/sti_ed.sql` présent à la racine du projet

### Ouverture de l'interface d'administration de la BDD
![img wamp](/assets/img/wamp.png)

## Lancer server back
- Via un terminal, se placer dans le dossier `/backend`
- Lancer la commande `npm nodemon ./server.js`

## Ouvrir l'interface web
- Dans un explorateur de fichier double cliquez simplement sur index.html
- Lien vers la page de login --> petit icone en haut de la page
- Un user existe déjà (username: MuMuMan, mdp: cou) vous pouvez en créer d'autre pour tester
- Ouvrez les dev tools ! (il y a plein de choses à voir notament dans l'onglet Networks ou Réseau)

## Arborescence du projet
- `/assets` contient tous les fichiers statiques nécéssaire au projet **front** (css, js, image)
- `/backend` contient tous le backend du projet donc tout ce qui tourner coté serveur, c'est lui qui fait le lien vers la BDD
  - `/server.js` Permet de lancer le server et de l'initialiser avec un fonctionnement (app)
  - `/app.js` Gere le fonctionnement du server
  - `/db.js` Gere la connexion à la BDD du server
  - `/package.js & /package-lock.json` Contient les librairies nécéssaires au projet (ne pas modifier)
  - `/routes` Contient les routes (URL) accessibles du server
  - `/controller` Contient les fonctions à exécuter quand une requête est recue par une route
  - `/middleware` Surcouche à executer dans certains cas (`auth.js` vérifie si l'utilisateur est connecté)