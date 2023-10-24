export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      agriculteur: {
        Row: {
          adresse: string | null
          description: string | null
          facebook: string | null
          id: string
          instagram: string | null
          lien_image: string | null
          tel_fixe: string | null
          tel_portable: string | null
          twitter: string | null
          website: string | null
        }
        Insert: {
          adresse?: string | null
          description?: string | null
          facebook?: string | null
          id: string
          instagram?: string | null
          lien_image?: string | null
          tel_fixe?: string | null
          tel_portable?: string | null
          twitter?: string | null
          website?: string | null
        }
        Update: {
          adresse?: string | null
          description?: string | null
          facebook?: string | null
          id?: string
          instagram?: string | null
          lien_image?: string | null
          tel_fixe?: string | null
          tel_portable?: string | null
          twitter?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agriculteur_id_fkey"
            columns: ["id"]
            referencedRelation: "utilisateurs"
            referencedColumns: ["id"]
          }
        ]
      }
      etape: {
        Row: {
          description: string | null
          id_etape: number
          id_recette: string
        }
        Insert: {
          description?: string | null
          id_etape?: number
          id_recette: string
        }
        Update: {
          description?: string | null
          id_etape?: number
          id_recette?: string
        }
        Relationships: [
          {
            foreignKeyName: "etape_id_recette_fkey"
            columns: ["id_recette"]
            referencedRelation: "recette"
            referencedColumns: ["id_recette"]
          }
        ]
      }
      evenement: {
        Row: {
          adresse: string | null
          date: string | null
          description: string | null
          heure: string | null
          id_agriculteur: string | null
          id_evenement: number
          lien_image: string | null
          nom_evenement: string | null
        }
        Insert: {
          adresse?: string | null
          date?: string | null
          description?: string | null
          heure?: string | null
          id_agriculteur?: string | null
          id_evenement?: number
          lien_image?: string | null
          nom_evenement?: string | null
        }
        Update: {
          adresse?: string | null
          date?: string | null
          description?: string | null
          heure?: string | null
          id_agriculteur?: string | null
          id_evenement?: number
          lien_image?: string | null
          nom_evenement?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "evenement_id_agriculteur_fkey"
            columns: ["id_agriculteur"]
            referencedRelation: "agriculteur"
            referencedColumns: ["id"]
          }
        ]
      }
      follow: {
        Row: {
          id_agriculteur: string
          id_utilisateur: string
        }
        Insert: {
          id_agriculteur: string
          id_utilisateur: string
        }
        Update: {
          id_agriculteur?: string
          id_utilisateur?: string
        }
        Relationships: [
          {
            foreignKeyName: "follow_id_agriculteur_fkey"
            columns: ["id_agriculteur"]
            referencedRelation: "agriculteur"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "follow_id_utilisateur_fkey"
            columns: ["id_utilisateur"]
            referencedRelation: "utilisateurs"
            referencedColumns: ["id"]
          }
        ]
      }
      horaires: {
        Row: {
          heure_debut_apres_midi: string | null
          heure_debut_matin: string | null
          heure_fin_apres_midi: string | null
          heure_fin_matin: string | null
          id_horaires: string
          jour: string | null
        }
        Insert: {
          heure_debut_apres_midi?: string | null
          heure_debut_matin?: string | null
          heure_fin_apres_midi?: string | null
          heure_fin_matin?: string | null
          id_horaires: string
          jour?: string | null
        }
        Update: {
          heure_debut_apres_midi?: string | null
          heure_debut_matin?: string | null
          heure_fin_apres_midi?: string | null
          heure_fin_matin?: string | null
          id_horaires?: string
          jour?: string | null
        }
        Relationships: []
      }
      ingredient: {
        Row: {
          id_ingredient: number
          id_recette: string
          nom_ingredient: string | null
          quantite_ingredient: number | null
          unite_de_mesure: string | null
        }
        Insert: {
          id_ingredient?: number
          id_recette: string
          nom_ingredient?: string | null
          quantite_ingredient?: number | null
          unite_de_mesure?: string | null
        }
        Update: {
          id_ingredient?: number
          id_recette?: string
          nom_ingredient?: string | null
          quantite_ingredient?: number | null
          unite_de_mesure?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ingredient_id_recette_fkey"
            columns: ["id_recette"]
            referencedRelation: "recette"
            referencedColumns: ["id_recette"]
          }
        ]
      }
      ouverture_boutique: {
        Row: {
          id_agriculteur: string
          id_horaires: string
        }
        Insert: {
          id_agriculteur: string
          id_horaires: string
        }
        Update: {
          id_agriculteur?: string
          id_horaires?: string
        }
        Relationships: [
          {
            foreignKeyName: "ouverture_boutique_id_agriculteur_fkey"
            columns: ["id_agriculteur"]
            referencedRelation: "agriculteur"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ouverture_boutique_id_horaires_fkey"
            columns: ["id_horaires"]
            referencedRelation: "horaires"
            referencedColumns: ["id_horaires"]
          }
        ]
      }
      recette: {
        Row: {
          description: string | null
          id_recette: string
          lien_image: string | null
          temps_preparation: string | null
          titre: string | null
        }
        Insert: {
          description?: string | null
          id_recette?: string
          lien_image?: string | null
          temps_preparation?: string | null
          titre?: string | null
        }
        Update: {
          description?: string | null
          id_recette?: string
          lien_image?: string | null
          temps_preparation?: string | null
          titre?: string | null
        }
        Relationships: []
      }
      utilisateurs: {
        Row: {
          email: string | null
          id: string
          lien_image: string | null
          nom: string | null
          num_tel: string | null
          prenom: string | null
        }
        Insert: {
          email?: string | null
          id: string
          lien_image?: string | null
          nom?: string | null
          num_tel?: string | null
          prenom?: string | null
        }
        Update: {
          email?: string | null
          id?: string
          lien_image?: string | null
          nom?: string | null
          num_tel?: string | null
          prenom?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "utilisateurs_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
