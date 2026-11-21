# Kasa — Front-end (Next.js)

Refonte du site Kasa en Next.js (App Router, TypeScript, Tailwind CSS 4), branchée sur l'API Express du dossier `../KasaBackend`.

## Démarrage

1. Lancer le backend (port 3000) :
   ```bash
   cd ../KasaBackend
   npm install
   npm start
   ```
2. Configurer le front : copier `.env.example` en `.env.local` (`API_URL=http://localhost:3000`).
3. Lancer le front (port 3001) :
   ```bash
   npm install
   npm run dev
   ```
4. Ouvrir http://localhost:3001

## Arborescence

```
src/
  app/          routes (App Router), layout, pages d'erreur
  components/   composants React (layout/, properties/, home/, ui/)
  lib/          appels API, formatage
  types/        types des réponses de l'API
```
