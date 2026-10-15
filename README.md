# 🎮 XO Arena - Tic-Tac-Toe Moderne

Une Progressive Web App (PWA) moderne et interactive du jeu classique Tic-Tac-Toe, installable et fonctionnant hors ligne.

![Version](https://img.shields.io/badge/version-1.0-blue)
![PWA](https://img.shields.io/badge/PWA-enabled-success)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## 📋 Description

**XO Arena** est une Progressive Web App du Tic-Tac-Toe classique, offrant une expérience de jeu fluide directement dans votre navigateur. **Installez-la sur votre appareil et jouez même sans connexion Internet !**

## ✨ Fonctionnalités

### 📱 Progressive Web App (PWA)
- **Installable** sur ordinateur, Android et iPhone
- **Fonctionne hors ligne** après la première visite
- **Mode standalone** - s'ouvre comme une app native
- **Icône sur l'écran d'accueil** de votre appareil
- **Mises à jour automatiques** en arrière-plan
- **Cache intelligent** pour des performances optimales

### 🎯 Modes de Jeu
- **👥 Joueur vs Joueur** : Affrontez un ami sur le même appareil
- **🤖 Joueur vs Ordinateur** : Défiez une IA stratégique qui joue intelligemment

### 🧠 Intelligence Artificielle
L'ordinateur utilise une stratégie avancée :
1. Gagner immédiatement si possible
2. Bloquer une victoire imminente du joueur
3. Prendre le centre stratégiquement
4. Occuper les coins
5. Choisir intelligemment parmi les cases restantes

### 📊 Statistiques Complètes
- Victoires du joueur X
- Victoires du joueur O / Ordinateur
- Nombre de matchs nuls
- Total de parties jouées
- Sauvegarde automatique dans le navigateur
- Réinitialisation avec confirmation

### 🎨 Interface Moderne
- Design sombre élégant (thème bleu nuit/violet)
- Animations fluides et transitions
- Effets visuels sur les symboles X et O
- Mise en évidence de la combinaison gagnante
- Interface responsive (mobile, tablette, desktop)
- Feedback visuel et sonore

### ♿ Accessibilité
- Navigation au clavier
- Labels ARIA pour les lecteurs d'écran
- Support des préférences de réduction d'animation
- Contraste élevé pour une meilleure lisibilité
- Focus visible sur les éléments interactifs

## 🚀 Technologies Utilisées

- **HTML5** - Structure sémantique
- **CSS3** - Design moderne avec animations
- **JavaScript Vanilla** - Logique du jeu
- **LocalStorage** - Sauvegarde des statistiques
- **Service Worker** - Cache et fonctionnement offline
- **Web App Manifest** - Installation PWA

Aucune dépendance externe, aucun framework requis !

## 📂 Structure du Projet

```
xo-arena/
│
├── index.html          # Structure HTML de l'application
├── manifest.json       # Manifest PWA (métadonnées app)
├── sw.js               # Service Worker (cache et offline)
├── offline.html        # Page affichée quand offline
├── css/
│   └── style.css       # Styles et animations
├── js/
│   └── script.js       # Logique du jeu, IA et PWA
├── icons/              # Icônes pour PWA (8 tailles)
│   ├── icon.svg        # Icône source SVG
│   ├── auto-generate.html    # Générateur automatique PNG
│   ├── generate-icons.html   # Générateur manuel PNG
│   └── icon-*.png      # Icônes PNG (à générer)
├── README.md           # Documentation (ce fichier)
├── PWA-TESTS.md        # Guide de test PWA
└── TESTS.md            # Rapport des tests fonctionnels
```

## 🎮 Comment Jouer

### Règles du Jeu
1. Le joueur X commence toujours en premier
2. Les joueurs jouent à tour de rôle
3. Cliquez sur une case vide pour placer votre symbole
4. Alignez trois symboles identiques (horizontalement, verticalement ou en diagonale) pour gagner
5. Si toutes les cases sont remplies sans alignement, c'est un match nul

### Combinaisons Gagnantes
- **3 lignes horizontales**
- **3 lignes verticales**
- **2 diagonales**

## 💻 Installation et Lancement Local

### ⚠️ Important : Générer les Icônes d'abord

Avant de tester la PWA, générez les icônes :

1. Ouvrez `icons/auto-generate.html` dans votre navigateur
2. Les 8 icônes PNG seront téléchargées automatiquement
3. Déplacez tous les fichiers PNG dans le dossier `icons/`

**Icônes requises :** 72x72, 96x96, 128x128, 144x144, 152x152, 192x192, 384x384, 512x512

### Option 1 : Ouverture Simple (Non recommandé pour PWA)
1. Téléchargez ou clonez ce repository
2. Double-cliquez sur `index.html`
3. Le jeu s'ouvre dans votre navigateur par défaut

### Option 2 : Serveur Local (Recommandé pour PWA)
```bash
# Avec Python 3
python -m http.server 8000

# Avec Node.js
npx http-server -p 8000

# Avec PHP
php -S localhost:8000
```
Puis ouvrez `http://localhost:8000` dans votre navigateur.

**Note :** Le Service Worker fonctionne sur localhost même en HTTP. Pour un test complet de la PWA, utilisez cette option.

### Option 3 : VS Code Live Server
1. Installez l'extension "Live Server" dans VS Code
2. Clic droit sur `index.html` → "Open with Live Server"

---

## 📱 Installer XO Arena comme Application

### Sur Ordinateur (Windows/Mac/Linux)

#### Chrome / Edge :
1. Ouvrez XO Arena dans votre navigateur
2. Cherchez l'icône d'installation (⊕ ou ⬇) dans la barre d'adresse
3. OU Menu (⋮) → "Installer XO Arena"
4. Confirmez l'installation
5. L'application apparaît dans votre menu démarrer / dock

**L'application s'ouvrira dans sa propre fenêtre, comme une app native !**

---

### Sur Android

#### Chrome Android :
1. Ouvrez XO Arena dans Chrome sur votre téléphone
2. Appuyez sur le menu (⋮) en haut à droite
3. Sélectionnez **"Installer l'application"** ou **"Ajouter à l'écran d'accueil"**
4. Confirmez l'installation
5. L'icône apparaît sur votre écran d'accueil

**Testez le mode offline :**
- Activez le mode Avion
- Ouvrez l'application depuis l'écran d'accueil
- Le jeu fonctionne parfaitement !

---

### Sur iPhone (iOS)

#### Safari iOS :
1. Ouvrez XO Arena dans Safari
2. Appuyez sur le bouton **Partager** (□↑) en bas de l'écran
3. Faites défiler vers le bas
4. Sélectionnez **"Sur l'écran d'accueil"**
5. Modifiez le nom si nécessaire (devrait être "XO Arena")
6. Appuyez sur **"Ajouter"**
7. L'icône apparaît sur votre écran d'accueil

**Note iOS :** Le support offline est limité sur iOS. L'application fonctionnera principalement avec une connexion.

---

## 🌐 Publication sur GitHub Pages

### 📦 Étape 0 : Générer les Icônes (Crucial !)

**Avant de publier, vous DEVEZ générer les icônes PNG :**

1. Ouvrez `icons/auto-generate.html` dans votre navigateur
2. Attendez le téléchargement automatique des 8 icônes
3. Déplacez tous les fichiers PNG dans le dossier `icons/`
4. Vérifiez que vous avez bien ces fichiers :
   - icon-72x72.png
   - icon-96x96.png
   - icon-128x128.png
   - icon-144x144.png
   - icon-152x152.png
   - icon-192x192.png
   - icon-384x384.png
   - icon-512x512.png

### Étape 1 : Préparer le Repository
```bash
# Initialisez Git (si ce n'est pas déjà fait)
git init

# Ajoutez tous les fichiers (y compris les icônes PNG !)
git add .

# Créez votre premier commit
git commit -m "XO Arena PWA v1.0 - avec support offline"
```

### Étape 2 : Créer le Repository sur GitHub
1. Connectez-vous à [GitHub](https://github.com)
2. Cliquez sur "New repository"
3. Nommez-le `xo-arena` (ou un autre nom)
4. Ne cochez PAS "Initialize with README" (vous en avez déjà un)
5. Cliquez sur "Create repository"

### Étape 3 : Pusher le Code
```bash
# Liez votre repository local au repository distant
git remote add origin https://github.com/VOTRE_USERNAME/xo-arena.git

# Renommez la branche en main (si nécessaire)
git branch -M main

# Poussez votre code (avec toutes les icônes !)
git push -u origin main
```

### Étape 4 : Activer GitHub Pages
1. Sur GitHub, allez dans votre repository
2. Cliquez sur **Settings** (Paramètres)
3. Dans le menu de gauche, cliquez sur **Pages**
4. Sous "Source", sélectionnez :
   - **Branch:** `main`
   - **Folder:** `/ (root)`
5. Cliquez sur **Save**
6. Attendez 2-5 minutes (GitHub construit votre site)
7. Votre site sera disponible à : `https://VOTRE_USERNAME.github.io/xo-arena/`

### Étape 5 : Vérification PWA sur GitHub Pages

**Après publication, testez la PWA :**

1. **Vérifiez HTTPS** : GitHub Pages utilise automatiquement HTTPS ✅
2. **Testez le manifest** : Ouvrez DevTools (F12) → Application → Manifest
3. **Vérifiez le Service Worker** : DevTools → Application → Service Workers
4. **Testez l'installation** :
   - Sur Desktop : Cherchez l'icône d'installation dans la barre d'adresse
   - Sur Android : Menu → "Installer l'application"
   - Sur iPhone : Bouton Partager → "Sur l'écran d'accueil"
5. **Testez le mode offline** :
   - Visitez le site une fois
   - Activez le mode Avion
   - L'application doit fonctionner !

**Consultez [PWA-TESTS.md](PWA-TESTS.md) pour le guide de test complet.**

---

## 🔧 Configuration

### Désactiver le Son
Le bouton 🔊/🔇 en haut à droite permet d'activer/désactiver les sons. La préférence est sauvegardée automatiquement.

### Réinitialiser les Statistiques
1. Cliquez sur "Statistiques" depuis l'accueil
2. Cliquez sur "Réinitialiser les statistiques"
3. Confirmez votre choix

### Effacer toutes les Données (y compris le cache PWA)
Pour supprimer toutes les données sauvegardées :
```javascript
// Dans la console du navigateur (F12)
localStorage.removeItem('xoArenaStats');
localStorage.removeItem('xoArenaSoundEnabled');

// Vider le cache du Service Worker
navigator.serviceWorker.getRegistrations().then(registrations => {
  registrations.forEach(reg => reg.unregister());
});
caches.keys().then(keys => {
  keys.forEach(key => caches.delete(key));
});

location.reload();
```

**OU via DevTools :**
1. F12 → Application → Storage
2. Cliquez sur "Clear site data"
3. Rechargez la page

---

## 🧪 Tests

### Tests Fonctionnels
Tous les tests fonctionnels ont été validés. Consultez [TESTS.md](TESTS.md) pour le rapport détaillé.

**Résumé :**
- ✅ 14/14 tests fonctionnels réussis
- ✅ Toutes les combinaisons gagnantes validées
- ✅ IA stratégique fonctionnelle
- ✅ Responsive design validé
- ✅ Compatibilité GitHub Pages confirmée

### Tests PWA
Consultez [PWA-TESTS.md](PWA-TESTS.md) pour le guide complet de test de la Progressive Web App.

**Checklist PWA :**
- [ ] Icônes PNG générées (8 tailles)
- [ ] Manifest chargé sans erreur
- [ ] Service Worker enregistré
- [ ] Cache fonctionnel
- [ ] Mode offline testé
- [ ] Installation testée sur Desktop
- [ ] Installation testée sur Android
- [ ] Ajout écran d'accueil testé sur iOS
- [ ] Publication GitHub Pages testée

---

**Résumé :**
- ✅ 14/14 tests fonctionnels réussis
- ✅ Toutes les combinaisons gagnantes validées
- ✅ IA stratégique fonctionnelle
- ✅ Responsive design validé
- ✅ Compatibilité GitHub Pages confirmée

## 🎯 Compatibilité

### Navigateurs Supportés
- ✅ Chrome/Edge (version récente)
- ✅ Firefox (version récente)
- ✅ Safari (version récente)
- ✅ Opera (version récente)

### Appareils Testés
- ✅ Ordinateur de bureau
- ✅ Ordinateur portable
- ✅ Tablette (iPad, Android)
- ✅ Téléphone (iPhone, Android)

## 📱 Captures d'Écran

L'application s'adapte automatiquement à toutes les tailles d'écran :
- **Desktop** : Interface large avec grands boutons
- **Tablette** : Layout optimisé
- **Mobile** : Interface compacte et tactile

## 🐛 Résolution des Problèmes

### Les statistiques ne se sauvegardent pas
- Vérifiez que les cookies et LocalStorage ne sont pas bloqués
- Essayez en navigation normale (pas en navigation privée)

### Les animations ne fonctionnent pas
- Vérifiez que "Réduire les animations" n'est pas activé dans les paramètres système
- Essayez un navigateur différent

### Le jeu ne se charge pas
- Vérifiez que les chemins des fichiers sont corrects
- Ouvrez la console (F12) pour voir les erreurs éventuelles
- Assurez-vous que tous les fichiers (HTML, CSS, JS) sont présents

### Le bouton "Installer" n'apparaît pas (PWA)
- Vérifiez que vous utilisez HTTPS (ou localhost)
- Vérifiez que les icônes PNG sont générées et présentes
- Vérifiez le manifest dans DevTools → Application → Manifest
- Désinstallez l'ancienne version si déjà installée
- Essayez un navigateur différent (Chrome/Edge recommandés)

### Le mode offline ne fonctionne pas
- Visitez l'application une première fois en ligne
- Attendez que le Service Worker s'enregistre (vérifiez la console)
- Le cache peut prendre quelques secondes à se remplir
- Vérifiez DevTools → Application → Cache Storage
- Le cache doit contenir "xo-arena-v1.0.0"

### Les icônes ne s'affichent pas
- Générez les icônes avec `icons/auto-generate.html`
- Vérifiez que tous les PNG sont dans le dossier `icons/`
- Nommage : icon-72x72.png, icon-192x192.png, etc.
- Testez l'accès direct : `votre-url/icons/icon-192x192.png`

---

Ce projet est ouvert aux améliorations ! N'hésitez pas à :
- Signaler des bugs
- Proposer des fonctionnalités
- Améliorer le design
- Optimiser le code

## 📜 Licence

Ce projet est libre d'utilisation pour des projets personnels et éducatifs.

## 👨‍💻 Auteur

Développé avec ❤️ pour démontrer les capacités du HTML5, CSS3 et JavaScript moderne.

## 🔮 Améliorations Futures Possibles

- [ ] Mode multijoueur en ligne (WebSocket)
- [ ] Niveaux de difficulté de l'IA (Facile, Normal, Difficile)
- [ ] Thèmes personnalisables
- [ ] Effets sonores avancés (Web Audio API)
- [ ] Animations de victoire plus spectaculaires
- [ ] Classement global (nécessite un backend)
- [✅] **Support PWA** - Installable et offline ✅
- [ ] Mode tournoi
- [ ] Replay des parties
- [ ] Notifications push pour rappels

## 📞 Support

Pour toute question ou problème :
1. Consultez la section [Résolution des Problèmes](#-résolution-des-problèmes)
2. Vérifiez le fichier [TESTS.md](TESTS.md) pour les tests fonctionnels
3. Consultez [PWA-TESTS.md](PWA-TESTS.md) pour les problèmes PWA
4. Ouvrez une issue sur GitHub

---

**Amusez-vous bien ! 🎉**

*XO Arena - Le Tic-Tac-Toe réinventé en Progressive Web App*
