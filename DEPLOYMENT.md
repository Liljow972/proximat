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
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key
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

# Déploiement
vercel --prod
```

## Configuration Vercel

1. **Connecter le repository GitHub**
2. **Configurer les variables d'environnement** dans le dashboard Vercel
3. **Activer les déploiements automatiques**

## Post-déploiement

1. **Tester toutes les fonctionnalités**
2. **Vérifier les performances** avec Lighthouse
3. **Configurer le monitoring** d'erreurs
4. **Mettre en place les sauvegardes** Supabase

## Monitoring

- **Vercel Analytics**: Performances et usage
- **Supabase Dashboard**: Base de données et API
- **EmailJS Dashboard**: Envoi d'emails
- **Google Analytics**: Comportement utilisateur

## Maintenance

- **Mises à jour de sécurité**: Mensuelles
- **Sauvegardes**: Automatiques via Supabase
- **Monitoring**: Alertes configurées
- **Performance**: Audit trimestriel