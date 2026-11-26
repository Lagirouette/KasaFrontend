# Kasa — Front-end (Next.js)

Refonte du site Kasa en Next.js (App Router, TypeScript, Tailwind CSS 4), branchée sur l'API Express du dossier `../KasaBackend`.

## Démarrage

1. Lancer le backend (port 3000) :
   ```bash
   cd ../KasaBackend
   npm install
   npm start
   ```
2. Configurer le front : copier `.env.example` en `.env.local`.
   - `API_URL` : URL du backend (`http://localhost:3000`)
   - `SITE_URL` : URL publique du site, utilisée pour le sitemap, les URL canoniques et les données structurées
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM` : serveur d'envoi de l'email de confirmation d'inscription (sans SMTP, l'email est affiché dans la console en développement)
3. Lancer le front (port 3001) :
   ```bash
   npm install
   npm run dev
   ```
4. Ouvrir http://localhost:3001

## Tests

```bash
npm test
```

## Documentation

Le code est documenté en JSDoc. La documentation HTML est générée avec TypeDoc dans le dossier `docs/` :

```bash
npm run docs
```

Ouvrir ensuite `docs/index.html` dans un navigateur.

## Build de production

Les pages sont pré-rendues au build à partir des données de l'API, puis rafraîchies toutes les minutes : **le backend doit être démarré pendant `npm run build`**.

```bash
npm run build
npm start
```

- Sitemap : `/sitemap.xml`
- Robots : `/robots.txt`

## Arborescence

```
src/
  app/          routes (App Router), layout, pages d'erreur
  components/   composants React (auth/, layout/, messages/, properties/, favorites/, home/, seo/, ui/)
  contexts/     contexte React des favoris
  hooks/        hooks React (favoris)
  lib/          appels API, session, validation, emails, favoris, données structurées, formatage
  proxy.ts      protection des pages réservées aux utilisateurs connectés
  types/        types des réponses de l'API
```
