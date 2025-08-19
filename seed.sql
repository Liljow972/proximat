-- Insertion des matériaux de base
INSERT INTO materiaux (nom, description, unite, prix_unitaire, categorie, fournisseur, stock_disponible) VALUES
('Béton C25/30', 'Béton standard pour fondations', 'm³', 120.00, 'Béton', 'Lafarge', 50),
('Parpaing 20x20x50', 'Parpaing standard', 'unité', 2.50, 'Maçonnerie', 'Terreal', 1000),
('Ciment Portland', 'Ciment CEM I 52.5', 'sac 35kg', 8.50, 'Liants', 'Lafarge', 200),
('Sable 0/4', 'Sable fin pour mortier', 'tonne', 25.00, 'Granulats', 'Carrière Local', 100),
('Gravier 4/20', 'Gravier pour béton', 'tonne', 28.00, 'Granulats', 'Carrière Local', 80),
('Fer à béton HA 10', 'Armature haute adhérence', 'ml', 1.20, 'Ferraillage', 'ArcelorMittal', 5000),
('Brique rouge', 'Brique terre cuite', 'unité', 0.85, 'Maçonnerie', 'Terreal', 2000),
('Tuile canal', 'Tuile terre cuite traditionnelle', 'm²', 15.00, 'Couverture', 'Terreal', 500),
('Isolant laine de verre', 'Isolation thermique 100mm', 'm²', 8.50, 'Isolation', 'Isover', 300),
('Placo BA13', 'Plaque de plâtre standard', 'm²', 4.20, 'Cloisons', 'Placo', 400);

-- Mise à jour du fichier .env.example