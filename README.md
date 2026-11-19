# Plateau rugby à 13

Appli de bord de terrain : plusieurs matchs en même temps, chrono et mi-temps par match,
alertes de fin de chrono, classement et météo heure par heure.

**Mode d'emploi Android et iPhone : https://jeremyper.github.io/plateau-rugby-13/guide.html**

- Fin de chrono : sonnerie forte et vibration répétées jusqu'à « Couper la sonnerie » (1 minute au plus).
- Écran gardé allumé dès le coup d'envoi.
- Chronos calculés depuis l'heure du coup d'envoi et données enregistrées à chaque touche :
  rien n'est perdu si le téléphone se verrouille ou ferme la page.
- S'ouvre sans réseau après une première visite.

## Installation
1. Copiez tout le dossier dans un site servi en **HTTPS** (Caddy, Nginx Proxy Manager, GitHub Pages…).
   Le HTTPS est obligatoire pour la position, les notifications et l'écran maintenu allumé.
2. Ouvrez l'adresse sur le téléphone, puis « Ajouter à l'écran d'accueil ».
   Sur iPhone, les notifications ne marchent qu'une fois la page ajoutée à l'écran d'accueil.
3. Dans l'onglet Plateau, cochez « Notification du téléphone » et touchez « Tester l'alerte ».

## Fichiers
- `index.html` : l'appli complète (données stockées sur le téléphone, rien n'est envoyé ailleurs)
- `guide.html` : mode d'emploi à partager (installation Android et iPhone, son, écran verrouillé, données)
- `sw.js` : service worker, pour les notifications sur Android et l'ouverture sans réseau
  (changer `VERSION` à chaque mise en ligne)
- `manifest.webmanifest`, `icon-192.png`, `icon-512.png` : installation sur l'écran d'accueil

## Services externes
- Météo et recherche de ville : Open-Meteo (gratuit, sans clé), appelé seulement depuis l'onglet Météo.
- Polices : Google Fonts (l'appli fonctionne aussi sans).

## Essayer en ligne
Version servie par GitHub Pages : https://jeremyper.github.io/plateau-rugby-13/

## Contribuer
Projet libre : signalements et propositions bienvenus via les *issues* et les *pull requests*.
Aucune étape de compilation : c'est une page HTML statique, à ouvrir via un petit serveur local
(par exemple `python3 -m http.server`) ou en HTTPS pour tester notifications et position.

## Licence
[MIT](LICENSE) © 2026 Jérémy Perizatto
