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
      inventory: {
        Row: {
          id: string
          watch_id: string
          quantity: number
          price: number
          status: string
          last_restock_date: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          watch_id: string
          quantity: number
          price: number
          status?: string
          last_restock_date?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          watch_id?: string
          quantity?: number
          price?: number
          status?: string
          last_restock_date?: string
          created_at?: string
          updated_at?: string
        }
      }
      price_history: {
        Row: {
          id: string
          watch_id: string
          price: number
          changed_at: string
          changed_by: string
        }
        Insert: {
          id?: string
          watch_id: string
          price: number
          changed_at?: string
          changed_by: string
        }
        Update: {
          id?: string
          watch_id?: string
          price?: number
          changed_at?: string
          changed_by?: string
        }
      }
      watch_images: {
        Row: {
          id: string
          watch_id: string
          url: string
          is_primary: boolean
          created_at: string
        }
        Insert: {
          id?: string
          watch_id: string
          url: string
          is_primary?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          watch_id?: string
          url?: string
          is_primary?: boolean
          created_at?: string
        }
      }
      watches: {
        Row: {
          id: string
          sku: string
          brand: string
          collection: string
          model: string
          gender: string
          style: string
          case_material: string
          case_diameter: string
          movement: string
          band_material: string
          dial_color: string
          water_resistance: string | null
          features: string[] | null
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          sku: string
          brand: string
          collection: string
          model: string
          gender: string
          style: string
          case_material: string
          case_diameter: string
          movement: string
          band_material: string
          dial_color: string
          water_resistance?: string | null
          features?: string[] | null
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          sku?: string
          brand?: string
          collection?: string
          model?: string
          gender?: string
          style?: string
          case_material?: string
          case_diameter?: string
          movement?: string
          band_material?: string
          dial_color?: string
          water_resistance?: string | null
          features?: string[] | null
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Functions: {
      update_watch_inventory: {
        Args: {
          p_watch_id: string
          p_quantity: number
          p_price: number
        }
        Returns: void
      }
    }
  }
}