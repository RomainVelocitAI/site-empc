# Guide de Remplacement des Images - EMPC

Ce guide explique comment remplacer les images placeholder par les vraies photos du cabinet.

---

## Structure des Dossiers

```
public/images/
├── hero-equipe.svg          → Photo d'équipe (accueil)
├── portraits/
│   └── joelle-deblangey.svg → Portrait Dr Deblangey
├── therapies/
│   ├── gestalt.svg
│   ├── tcc.svg
│   ├── nutrition.svg
│   ├── sexologie.svg
│   └── familiales.svg
├── groupal/
│   ├── mbct.svg
│   └── mecl.svg
└── yoga/
    ├── hatha.svg
    └── nidra.svg
```

---

## Images à Fournir

### 1. Photo d'Équipe (Hero)

| Fichier | Dimensions | Format | Emplacement |
|---------|------------|--------|-------------|
| `photo-equipe-empc-2025.jpg` | 1920 × 1080 px minimum | JPG | `/public/images/` |

**Instructions :**
1. Renommer votre photo en `photo-equipe-empc-2025.jpg`
2. La placer dans `/public/images/`
3. Supprimer `hero-equipe.svg`
4. Dans le code, mettre à jour le chemin dans `src/lib/images.ts`

### 2. Portrait Dr Deblangey

| Fichier | Dimensions | Format | Emplacement |
|---------|------------|--------|-------------|
| `joelle.jpg` | 400 × 500 px minimum | JPG | `/public/images/portraits/` |

**Instructions :**
1. Renommer votre photo en `joelle-deblangey.jpg`
2. La placer dans `/public/images/portraits/`
3. Supprimer `joelle-deblangey.svg`

---

## Spécifications Techniques

### Formats Recommandés

| Type d'image | Format | Qualité | Poids max |
|--------------|--------|---------|-----------|
| Photos | `.jpg` ou `.webp` | 80-85% | 500 Ko |
| Hero/Banner | `.jpg` | 85% | 800 Ko |
| Logos/Icônes | `.svg` ou `.png` | - | 100 Ko |

### Dimensions Minimales

| Utilisation | Largeur | Hauteur | Ratio |
|-------------|---------|---------|-------|
| Hero (accueil) | 1920 px | 1080 px | 16:9 |
| Portrait | 400 px | 500 px | 4:5 |
| Cards thérapies | 800 px | 600 px | 4:3 |
| Méditation | 800 px | 600 px | 4:3 |

---

## Comment Remplacer une Image

### Méthode Simple (Remplacement Direct)

1. **Préparez votre image** aux bonnes dimensions
2. **Renommez-la** avec le même nom que le placeholder
3. **Placez-la** dans le même dossier
4. **Supprimez** l'ancien fichier `.svg`

### Exemple : Remplacer le portrait

```bash
# 1. Votre photo originale : joelle_photo_2024.jpg
# 2. La renommer :
mv joelle_photo_2024.jpg joelle-deblangey.jpg

# 3. La copier dans le bon dossier :
cp joelle-deblangey.jpg public/images/portraits/

# 4. Supprimer le placeholder SVG :
rm public/images/portraits/joelle-deblangey.svg
```

### Méthode Avancée (Mise à jour du code)

Si vous souhaitez garder un nom de fichier différent, modifiez le fichier `src/lib/images.ts` :

```typescript
// Avant
joelleDeblangey: {
  src: '/images/portraits/joelle-deblangey.svg',
  // ...
}

// Après
joelleDeblangey: {
  src: '/images/portraits/ma-nouvelle-photo.jpg',
  // ...
}
```

---

## Optimisation des Images

### Outils Recommandés

- **Squoosh** (gratuit) : https://squoosh.app/
- **TinyPNG** (gratuit) : https://tinypng.com/
- **ImageOptim** (Mac) : https://imageoptim.com/

### Paramètres d'Export

Pour les photos JPG :
- **Qualité** : 80-85%
- **Résolution** : 72 dpi (web)
- **Espace colorimétrique** : sRGB

---

## Checklist Avant Mise en Ligne

- [ ] Photo d'équipe (1920×1080 min)
- [ ] Portrait Dr Deblangey (400×500 min)
- [ ] Images compressées (< 500 Ko)
- [ ] Format JPG ou WebP
- [ ] Noms de fichiers sans accents ni espaces

---

## Support

Pour toute question technique, contactez :
- **VelocitAI / DIGIQO** - Romain

---

*Document créé le 28/12/2024*
