# Guide — Ajouter de nouveaux exercices à FootLib

Mémo pratique pour intégrer de nouveaux exercices (contenu, images, traduction anglaise).

---

## En bref : 2 façons de procéder

- **Option simple (déléguer)** : tu ajoutes les exercices dans le Google Sheet, tu prépares les images, et tu me dis « j'ai ajouté des exercices ». Je m'occupe du reste (traduction soccer + filigrane + manifeste + déploiement).
- **Option autonome** : tu suis les étapes ci-dessous toi-même.

---

## Ce qu'il faut comprendre

- **Le texte du Sheet est lu EN DIRECT par l'app.** Toute modification de contenu ou de traduction dans le Sheet apparaît immédiatement en ligne, **sans redéploiement**.
- **Les images sont hébergées dans l'app** (`public/schemas/`). Ajouter/modifier une image demande un **commit + push** pour être déployé.
- L'app n'a pas de backend : Google Sheet (contenu) + dossier d'images = toute la donnée.

Fichiers clés :
- Google Sheet, onglet `Banque d'exercices` (en-têtes en **ligne 3**, données dès la **ligne 4**)
- Images : `public/schemas/EXNNN.png`
- Originaux propres (sans filigrane) : `pdf-import/schemas-clean/EXNNN.png`

---

## 1. Ajouter le contenu dans le Google Sheet

1. Nouvelle ligne à la suite (prochain ID, ex: `EX349`).
2. Remplir les colonnes FR. Pour **Phase de jeu**, **Principe de jeu**, **Méthode pédagogique**, **Type** : choisir une valeur dans la **liste déroulante** (sinon « Non valide »).
3. Cocher les bonnes colonnes d'âge (U9 → U17+).
4. Laisser les **colonnes EN vides** (elles seront remplies par le script de traduction, étape 3).

Si jamais une cellule affiche « Non valide » (valeur hors liste), lancer dans Apps Script la fonction **`normaliserBanque`** : elle recale les valeurs sur les listes officielles.

---

## 2. Ajouter les images (avec filigrane FootLib)

Nommer chaque image **`EXNNN.png`** (le numéro de l'exercice).

**Méthode hébergée (recommandée, fiable + filigrane)**
1. Déposer l'image originale (propre) dans `pdf-import/schemas-clean/EXNNN.png`
2. Dans le Terminal :
   ```
   cd "/Users/fadil459/Documents/Claude/Claude Code/APP foot"
   npm run schemas
   ```
   (applique le filigrane « FootLib » sur toutes les images **puis** régénère le manifeste)
3. Commit + push pour déployer (ou me le demander).

**Méthode Drive (rapide, sans filigrane, moins fiable)**
- Mettre l'**ID brut Drive** dans la colonne `Schema (URL)` du Sheet. L'image s'affichera via le secours Drive, mais sans filigrane et de façon moins stable si beaucoup d'images chargent en même temps.

---

## 3. Traduire le contenu en anglais (vocabulaire soccer correct)

**Ne pas utiliser Google Traduction** (il traduit mot à mot : « marquer » → « Mark » au lieu de « Score », etc.). Utiliser le script dédié.

1. Dans le Terminal :
   ```
   cd "/Users/fadil459/Documents/Claude/Claude Code/APP foot"
   export ANTHROPIC_API_KEY=sk-ant-...   (ta vraie clé)
   node pdf-import/translate-en.mjs
   ```
   Grâce au **mode reprise**, seuls les **nouveaux** exercices (colonnes EN vides) sont traduits. Sortie : `pdf-import/output/translations-en.csv`.
2. Dans Google Sheets : **Fichier → Importer → Upload** `translations-en.csv` → **Insérer une nouvelle feuille**. Renommer la feuille exactement **`TRAD_EN`**.
3. Dans Apps Script, lancer **`appliquerTraductionsEN`** : remplit les colonnes EN de `Banque d'exercices` par correspondance d'ID (sans toucher au reste).
4. (Optionnel) Supprimer l'onglet `TRAD_EN` une fois fait.

La traduction apparaît immédiatement en ligne (lecture directe du Sheet).

---

## Référence des commandes

```
npm run schemas                  # filigrane + manifeste des images
node scripts/watermark-schemas.mjs   # filigrane seul
node scripts/gen-schema-manifest.mjs # manifeste seul
node pdf-import/translate-en.mjs  # traduction EN soccer (mode reprise)
node pdf-import/extract.mjs <pdf> --start-id=N   # import en masse depuis un PDF
```

Fonctions Apps Script (dans le Sheet) :
- `normaliserBanque` — recale Phase/Principe/Méthode sur les listes déroulantes
- `appliquerTraductionsEN` — injecte les traductions EN depuis l'onglet `TRAD_EN`

---

## Rappels importants

- Clé API Anthropic : nécessaire pour la traduction et l'import PDF. Ne jamais la committer.
- Outillage local (`pdf-import/`, `sharp`, etc.) : volontairement **hors dépôt GitHub** (sinon le build Netlify casse). Les scripts restent sur le Mac.
- Pour déployer des **images** : commit + push (auto-deploy Netlify). Pour du **texte/traduction** : rien à faire, c'est en direct.
- En cas d'erreur « inconnue » dans Apps Script après un import : recharger la page du Sheet puis rouvrir Apps Script.
