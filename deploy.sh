#!/bin/bash

# Script de déploiement automatisé pour Proximat
echo "🚀 Démarrage du déploiement Proximat..."

# Vérification des prérequis
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm n'est pas installé"
    exit 1
fi

# Installation des dépendances
echo "📦 Installation des dépendances..."
npm ci

# Vérification du linting
echo "🔍 Vérification du code..."
npm run lint

# Tests (si disponibles)
if npm run test --silent 2>/dev/null; then
    echo "🧪 Exécution des tests..."
    npm run test:coverage
fi

# Build de production
echo "🏗️ Build de production..."
npm run build

# Vérification de la taille du bundle
echo "📊 Analyse de la taille du bundle..."
if [ -d "build" ]; then
    echo "✅ Build réussi - Taille du dossier build:"
    du -sh build/
else
    echo "❌ Échec du build"
    exit 1
fi

# Déploiement sur Vercel (si vercel CLI est installé)
if command -v vercel &> /dev/null; then
    echo "🌐 Déploiement sur Vercel..."
    vercel --prod
else
    echo "⚠️ Vercel CLI non installé. Installez avec: npm i -g vercel"
    echo "📁 Fichiers prêts pour le déploiement dans le dossier 'build/'"
fi

echo "✅ Déploiement terminé!"