# Morel Plomberie, site vitrine de démonstration

Site vitrine pour un plombier-chauffagiste à Paris et en petite couronne (75, 92, 93, 94).

**Voir le site en ligne : https://skorpiozzz.github.io/morel-plomberie/**

> **Projet de démonstration.** Morel Plomberie est une entreprise fictive. Les coordonnées, les avis clients et les mentions légales sont inventés. Le site sert d'exemple de ce que je peux livrer à un artisan.

## Objectif

Un artisan a besoin d'un site qui fait sonner son téléphone. Tout le site va dans ce sens :

- le numéro de téléphone est visible partout, avec une barre d'appel fixe sur mobile ;
- un formulaire de devis court, qui vérifie la zone d'intervention dès la saisie du code postal ;
- des prestations avec des prix indicatifs, pour rassurer avant le premier contact ;
- des pages légères, sans framework ni dépendance, qui s'affichent vite sur un téléphone en 4G.

## Pages

| Page | Contenu |
|---|---|
| [index.html](index.html) | Accueil : accroche, prestations, déroulé d'une intervention, avis, appel à l'action |
| [prestations.html](prestations.html) | Détail des prestations et tarifs indicatifs, engagements |
| [devis.html](devis.html) | Zone d'intervention, formulaire de demande de devis, horaires |
| [mentions-legales.html](mentions-legales.html) | Mentions légales et données personnelles (RGPD) |

## Technique

- HTML, CSS et JavaScript, sans framework ni étape de build
- Polices système et icônes SVG intégrées : aucune requête externe
- Photos en WebP redimensionnées (15 à 40 Ko chacune), chargement différé hors du haut de page
- Responsive, conçu d'abord pour le mobile
- Accessibilité : lien d'évitement, navigation au clavier, attributs ARIA sur le menu et le formulaire, messages d'erreur liés aux champs
- Référencement local : balises `title` et `description` par page, données structurées Schema.org (`Plumber`)

### Formulaire de devis

La logique est dans [js/main.js](js/main.js) :

- validation à la sortie de chaque champ et à l'envoi (nom, téléphone français, e-mail facultatif, code postal limité au 75, 92, 93 et 94, description) ;
- champ piège (honeypot) contre les robots ;
- case de consentement obligatoire.

En démo, l'attribut `action` du formulaire est vide : rien n'est envoyé, un message de confirmation s'affiche. Pour un vrai client, il suffit de renseigner l'URL d'un service d'envoi (Formspree, Web3Forms) ou d'un script PHP dans `action`. Le script envoie alors les données en `fetch` et affiche le résultat.

## Lancer le site

Pas d'installation. Ouvrez `index.html` dans un navigateur, ou lancez un petit serveur local :

```bash
python3 -m http.server 8000
```

puis allez sur http://localhost:8000.

Le site peut être hébergé tel quel sur n'importe quel hébergement statique (GitHub Pages, Netlify, OVH...).

## Structure

```
.
├── index.html
├── prestations.html
├── devis.html
├── mentions-legales.html
├── css/
│   └── style.css
├── img/          photos (WebP)
└── js/
    └── main.js
```

Les photos sont libres de droits. Sur un vrai site client, elles seraient remplacées par les photos des chantiers de l'artisan.

## Auteur

Alexandre Zapolski, développeur web freelance : [profil Malt](https://www.malt.fr/profile/alexandrezapolski)
