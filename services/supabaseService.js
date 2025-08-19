import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Service pour les clients
export const clientService = {
  // Créer un nouveau client
  async createClient(clientData) {
    const { data, error } = await supabase
      .from('clients')
      .insert([clientData])
      .select();
    
    if (error) throw error;
    return data[0];
  },

  // Récupérer un client par email
  async getClientByEmail(email) {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('email', email)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  // Mettre à jour un client
  async updateClient(id, updates) {
    const { data, error } = await supabase
      .from('clients')
      .update(updates)
      .eq('id', id)
      .select();
    
    if (error) throw error;
    return data[0];
  }
};

// Service pour les projets
export const projectService = {
  // Créer un nouveau projet
  async createProject(projectData) {
    const { data, error } = await supabase
      .from('projets')
      .insert([projectData])
      .select();
    
    if (error) throw error;
    return data[0];
  },

  // Récupérer les projets d'un client
  async getProjectsByClient(clientId) {
    const { data, error } = await supabase
      .from('projets')
      .select('*')
      .eq('client_id', clientId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }
};

// Service pour les devis
export const quoteService = {
  // Créer un nouveau devis
  async createQuote(quoteData) {
    const { data, error } = await supabase
      .from('devis')
      .insert([quoteData])
      .select();
    
    if (error) throw error;
    return data[0];
  },

  // Ajouter des lignes au devis
  async addQuoteLines(quoteId, lines) {
    const linesWithQuoteId = lines.map(line => ({
      ...line,
      devis_id: quoteId
    }));

    const { data, error } = await supabase
      .from('lignes_devis')
      .insert(linesWithQuoteId)
      .select();
    
    if (error) throw error;
    return data;
  },

  // Récupérer un devis complet avec ses lignes
  async getQuoteWithLines(quoteId) {
    const { data, error } = await supabase
      .from('devis')
      .select(`
        *,
        lignes_devis(*),
        projets(
          *,
          clients(*)
        )
      `)
      .eq('id', quoteId)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Générer un numéro de devis unique
  async generateQuoteNumber() {
    const year = new Date().getFullYear();
    const { data, error } = await supabase
      .from('devis')
      .select('numero_devis')
      .like('numero_devis', `DEV-${year}-%`)
      .order('numero_devis', { ascending: false })
      .limit(1);
    
    if (error) throw error;
    
    let nextNumber = 1;
    if (data && data.length > 0) {
      const lastNumber = data[0].numero_devis.split('-')[2];
      nextNumber = parseInt(lastNumber) + 1;
    }
    
    return `DEV-${year}-${nextNumber.toString().padStart(4, '0')}`;
  }
};

// Service pour les matériaux
export const materialService = {
  // Récupérer tous les matériaux actifs
  async getActiveMaterials() {
    const { data, error } = await supabase
      .from('materiaux')
      .select('*')
      .eq('actif', true)
      .order('categorie', { ascending: true });
    
    if (error) throw error;
    return data;
  },

  // Récupérer les matériaux par catégorie
  async getMaterialsByCategory(category) {
    const { data, error } = await supabase
      .from('materiaux')
      .select('*')
      .eq('categorie', category)
      .eq('actif', true)
      .order('nom', { ascending: true });
    
    if (error) throw error;
    return data;
  },

  // Créer un nouveau matériau
  async createMaterial(materialData) {
    const { data, error } = await supabase
      .from('materiaux')
      .insert([materialData])
      .select();
    
    if (error) throw error;
    return data[0];
  }
};

// Service pour les précommandes
export const preorderService = {
  // Créer une nouvelle précommande
  async createPreorder(preorderData) {
    const { data, error } = await supabase
      .from('precommandes')
      .insert([preorderData])
      .select();
    
    if (error) throw error;
    return data[0];
  },

  // Ajouter des lignes à la précommande
  async addPreorderLines(preorderId, lines) {
    const linesWithPreorderId = lines.map(line => ({
      ...line,
      precommande_id: preorderId
    }));

    const { data, error } = await supabase
      .from('lignes_precommandes')
      .insert(linesWithPreorderId)
      .select();
    
    if (error) throw error;
    return data;
  },

  // Générer un numéro de précommande unique
  async generatePreorderNumber() {
    const year = new Date().getFullYear();
    const { data, error } = await supabase
      .from('precommandes')
      .select('numero_precommande')
      .like('numero_precommande', `PRE-${year}-%`)
      .order('numero_precommande', { ascending: false })
      .limit(1);
    
    if (error) throw error;
    
    let nextNumber = 1;
    if (data && data.length > 0) {
      const lastNumber = data[0].numero_precommande.split('-')[2];
      nextNumber = parseInt(lastNumber) + 1;
    }
    
    return `PRE-${year}-${nextNumber.toString().padStart(4, '0')}`;
  }
};

// Utilitaires pour la gestion des erreurs
export const handleSupabaseError = (error) => {
  console.error('Erreur Supabase:', error);
  
  if (error.code === 'PGRST116') {
    return 'Aucun enregistrement trouvé';
  }
  
  if (error.code === '23505') {
    return 'Cet enregistrement existe déjà';
  }
  
  if (error.code === '23503') {
    return 'Référence invalide';
  }
  
  return error.message || 'Une erreur est survenue';
};