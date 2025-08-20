# Guide de Déploiement Proximat

## Prérequis

1. **Node.js** (version 18+)
2. **npm** ou **yarn**
3. **Compte Vercel**
4. **Compte Supabase**
5. **Compte EmailJS**

## Configuration des variables d'environnement

### 1. Supabase
```bash
REACT_APP_SUPABASE_URL=https://tqlfmjjh1lvlmttcauaa.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRnbGZtamloaWl2aW1pdGNhdWFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3MDk0NTMsImV4cCI6MjA3MTI4NTQ1M30.NYGpyXarb_ZoMZI1_iSzfra6HbA_2D_w8EDLOXEJLBU
```

### 2. EmailJS
```bash
REACT_APP_EMAILJS_SERVICE_ID=your-service-id
REACT_APP_EMAILJS_TEMPLATE_ID_ESTIMATE=your-estimate-template
REACT_APP_EMAILJS_TEMPLATE_ID_PREORDER=your-preorder-template
REACT_APP_EMAILJS_PUBLIC_KEY=your-public-key
```

### 3. Informations entreprise
```bash
REACT_APP_COMPANY_NAME=Proximat
REACT_APP_COMPANY_EMAIL=contact@proximat.fr
REACT_APP_COMPANY_PHONE=+33123456789
REACT_APP_COMPANY_ADDRESS=123 Rue Example, 75001 Paris
REACT_APP_COMPANY_SIRET=12345678901234
REACT_APP_COMPANY_TVA=FR12345678901
```

## Déploiement automatique

### Option 1: Script de déploiement
```bash
chmod +x deploy.sh
./deploy.sh
```

### Option 2: Commandes manuelles
```bash
# Installation
npm ci

# Vérifications
npm run lint
npm run test:coverage

# Build
npm run build





## Post-déploiement

1. **Tester toutes les fonctionnalités**
2. **Vérifier les performances** avec Lighthouse
3. **Configurer le monitoring** d'erreurs
4. **Mettre en place les sauvegardes** Supabase

## Monitoring

- **Supabase Dashboard**: Base de données et API
- **EmailJS Dashboard**: Envoi d'emails
- **Google Analytics**: Comportement utilisateur

## Maintenance

- **Mises à jour de sécurité**: Mensuelles
- **Sauvegardes**: Automatiques via Supabase
- **Monitoring**: Alertes configurées
- **Performance**: Audit trimestriel