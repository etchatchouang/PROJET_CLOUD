## Exo Cloud Emmanuel TCHATCHOUANG

### Thème : Machine Virtuelle

####  Présentation du projet

Ce projet vise à développer une interface permettant la création de machines virtuelles dans le cloud, accessible uniquement après authentification. Les technologies employées comprennent : Tailwind, NextAuth.js, Next.js et Azure API

####  Installation

Commencez par télécharger le projet en format Zip via PEPAL, puis installez le gestionnaire de paquets npm, Consultez les instructions ici :

https://npm.io/installation

Ouvrez ensuite un terminal et accédez au dossier du projet en exécutant :

```bash
cd PROJET_CLOUD
```

Procédez à l'installation des dépendances avec :

```bash
npm install
```

Poursuivez en créant un fichier d'environnement .env à la racine du projet.

Dans .env, insérez les variables suivantes :

```bash
NEXTAUTH_SECRET
NEXTAUTH_URL
AZURE_CLIENT_ID
AZURE_TENANT_ID
AZURE_CLIENT_SECRET
AZURE_SUBSCRIPTION_ID
```

Remplissez ces variables avec vos informations d'Azure, générez une série de caractère aléatoire NEXTAUTH_SECRET.

Copiez la clé générée dans NEXTAUTH_SECRET et complétez NEXTAUTH_URL avec l'URL de l' application :

```bash
NEXTAUTH_URL=http://localhost:3000
```

####  Démarrage de l'application

Pour démarrer l'application, utilisez la commande :

```bash
npm dev
```

Ceci lancera le serveur sur le port 3000. Vous pouvez y acceder via :

```bash
http://localhost:3000
```

####  Utilisation de l'application

 Le champ de possibilité de chaque utilisateur :

- basic : Aucun accès à la création de machines virtuelles.
- prenium : Autorisé à créer une machine virtuelle (Windows).
- senior : Peut créer jusqu'à trois machines virtuelles (Ubuntu, Windows, Debian).
 
 Cliquez sur le bouton de connexion en haut à droite et authentifiez-vous soit avec basic, prenium ou senior :

bash
:

```bash
basic: {
    email: "basic@example.com",
    password: "basicPass",
    role: "basic"
},
prenium: {
    email: "prenium@example.com",
    password: "premiumPass",
    role: "prenium"
},
senior: {
    email: "senior@example.com",
    password: "seniorPass",
    role: "senior"
},
```

Sélectionnez une distribution pour initier la création d'une machine virtuelle. Un écran de chargement s'affichera et, une fois la machine configurée, les identifiants de connexion apparaîtront, mais ATTENTION ! Si la connexion à la machine virtuelle n'est pas effectuée dans les 10 minutes suivant sa création, elle sera automatiquement supprimée et les identifiants de connexion ne seront plus validés.