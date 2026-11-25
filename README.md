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
  components/   composants React (layout/, properties/, favorites/, home/, seo/, ui/)
  hooks/        hooks React (favoris)
  lib/          appels API, favoris, données structurées, formatage
  types/        types des réponses de l'API
```
