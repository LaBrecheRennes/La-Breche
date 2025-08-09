# La Brèche - Site des Cercles d'Écoute

Site web de l'association La Brèche de Rennes permettant l'affichage et l'inscription aux cercles d'écoute. Les événements sont gérés directement depuis un Google Sheet et affichés dynamiquement sur le site.

## Fonctionnalités

- Affichage des cercles d'écoute disponibles avec leurs informations (thématique, lieu, date, places disponibles)
- Chargement des données depuis Google Sheets
- Interface responsive adaptée mobile/desktop
- Thème personnalisé avec la charte graphique de La Brèche

## Structure des données

Les cercles d'écoute sont structurés dans le Google Sheet comme suit :
- Chaque onglet = un cercle (sauf l'onglet "Historique des cercles" qui est exclu)
- Cellules importantes dans chaque onglet :
  - C2 = Thématique du cercle
  - C3 = Nombre de places maximum
  - C4 = Date et heure
  - C5 = Lieu
  - C6 = Nombre de places disponibles

## Structure du site

- `accueil.html` - Page principale affichant les cercles disponibles
- `assets/css/style.css` - Feuille de style
- `assets/js/script.js` - Script principal gérant le chargement des données et l'affichage
- `assets/images/` - Ressources images du site

## Déploiement

Le site est déployé sur GitHub Pages et accessible à l'adresse :
https://labrecherennes.github.io/La-Breche/

## Maintenance

Pour mettre à jour les informations des cercles :
1. Modifier les données dans le Google Sheet connecté
2. Les modifications apparaîtront automatiquement sur le site

Pour modifier le code du site :
1. Cloner le repository
2. Effectuer les modifications nécessaires
3. Pousser les changements sur la branche principale

## Crédits

Développé pour l'association La Brèche - Rennes
https://labreche-rennes.fr
