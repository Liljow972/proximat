-- Création des tables pour Proximat

-- Table des clients
CREATE TABLE clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nom VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  telephone VARCHAR(20),
  adresse TEXT,
  ville VARCHAR(100),
  code_postal VARCHAR(10),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des projets
CREATE TABLE projets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  nom_projet VARCHAR(255) NOT NULL,
  description TEXT,
  adresse_projet TEXT,
  surface_totale DECIMAL(10,2),
  budget_estime DECIMAL(12,2),
  statut VARCHAR(50) DEFAULT 'en_cours',
  date_debut DATE,
  date_fin_prevue DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des devis
CREATE TABLE devis (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  projet_id UUID REFERENCES projets(id) ON DELETE CASCADE,
  numero_devis VARCHAR(50) UNIQUE NOT NULL,
  montant_ht DECIMAL(12,2) NOT NULL,
  taux_tva DECIMAL(5,2) DEFAULT 20.00,
  montant_ttc DECIMAL(12,2) NOT NULL,
  statut VARCHAR(50) DEFAULT 'brouillon',
  date_creation DATE DEFAULT CURRENT_DATE,
  date_validite DATE,
  notes TEXT,
  pdf_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des matériaux
CREATE TABLE materiaux (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nom VARCHAR(255) NOT NULL,
  description TEXT,
  unite VARCHAR(20) NOT NULL,
  prix_unitaire DECIMAL(10,2) NOT NULL,
  categorie VARCHAR(100),
  fournisseur VARCHAR(255),
  stock_disponible INTEGER DEFAULT 0,
  image_url TEXT,
  actif BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des lignes de devis
CREATE TABLE lignes_devis (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  devis_id UUID REFERENCES devis(id) ON DELETE CASCADE,
  materiau_id UUID REFERENCES materiaux(id),
  description VARCHAR(255) NOT NULL,
  quantite DECIMAL(10,2) NOT NULL,
  prix_unitaire DECIMAL(10,2) NOT NULL,
  montant_total DECIMAL(12,2) NOT NULL,
  ordre INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des précommandes
CREATE TABLE precommandes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES clients(id),
  numero_precommande VARCHAR(50) UNIQUE NOT NULL,
  montant_total DECIMAL(12,2) NOT NULL,
  statut VARCHAR(50) DEFAULT 'en_attente',
  date_livraison_souhaitee DATE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des lignes de précommande
CREATE TABLE lignes_precommandes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  precommande_id UUID REFERENCES precommandes(id) ON DELETE CASCADE,
  materiau_id UUID REFERENCES materiaux(id),
  quantite DECIMAL(10,2) NOT NULL,
  prix_unitaire DECIMAL(10,2) NOT NULL,
  montant_total DECIMAL(12,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes pour optimiser les performances
CREATE INDEX idx_clients_email ON clients(email);
CREATE INDEX idx_projets_client_id ON projets(client_id);
CREATE INDEX idx_devis_projet_id ON devis(projet_id);
CREATE INDEX idx_devis_numero ON devis(numero_devis);
CREATE INDEX idx_lignes_devis_devis_id ON lignes_devis(devis_id);
CREATE INDEX idx_precommandes_client_id ON precommandes(client_id);
CREATE INDEX idx_lignes_precommandes_precommande_id ON lignes_precommandes(precommande_id);
CREATE INDEX idx_materiaux_categorie ON materiaux(categorie);
CREATE INDEX idx_materiaux_actif ON materiaux(actif);

-- Triggers pour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projets_updated_at BEFORE UPDATE ON projets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_devis_updated_at BEFORE UPDATE ON devis FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_materiaux_updated_at BEFORE UPDATE ON materiaux FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_precommandes_updated_at BEFORE UPDATE ON precommandes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();