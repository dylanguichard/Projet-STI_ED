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
- Lancer la commande `npx nodemon ./server.js`

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

## Fonctionnement

### Home

- Quand on ouvre la page index.html sur un navigateur (front) on appelle la fonction getUser()
- Cette fonction fait une requete vers notre server (back) pour récupérer l'utilisateur connecté
- Notre server recoit cette requete, et vérifie si un utilisateur est connecté via le jeton d'authentification envoyé (token)
- Si il est connecté le server renvoi le nom de l'utilisateur sinon il renvoit une erreur
- Le front recoit ce nom et l'écrit sur la page pour qu'il soit visible pour l'utilisateur
- Il en profite pour faire une nouvelle requete au server pour récupérer les objets de la table Test de notre BDD
- Le server renvoi ces données au front qui les affiche à leur tour

### Login

- L'utilisateur rempli le formulaire de connexion et clique sur envoyer
- Cela déclanche une fonction javascript (front) qui va faire une requete vers le server contenant les identifiants que l'utilisateur à saisie
- Le server recoit ces données et vérifie si elles correspondent à un utilisateur dans la base de données
- Si c'est le cas le server renvoit un jeton d'authentification au front qui lui permettra de prouver qu'il est connecté
- Ce jeton est stocké par le front sous forme de cookie dans le navigateur

### Signup

- L'utilisateur rempli le formulaire de connexion et clique sur envoyer
- Cela déclanche une fonction javascript (front) qui va faire une requete vers le server contenant les identifiants que l'utilisateur à saisie
- Le server va crypter le mot de passe par mesure de sécurité pour que personne ne puisse le lire
