export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      blogs: {
        Row: {
          category: string | null
          content: string
          created_at: string | null
          date: string | null
          excerpt: string | null
          id: number
          image: string | null
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          category?: string | null
          content: string
          created_at?: string | null
          date?: string | null
          excerpt?: string | null
          id?: never
          image?: string | null
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          category?: string | null
          content?: string
          created_at?: string | null
          date?: string | null
          excerpt?: string | null
          id?: never
          image?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      circuits: {
        Row: {
          created_at: string | null
          date_range: string | null
          departure_location: string | null
          departure_time: string | null
          description: string | null
          difficulty: string | null
          dress_code: string | null
          duration_days: number
          enabled: boolean | null
          gallery: string[] | null
          id: number
          long_description: string | null
          main_image: string | null
          name: string
          persons: string | null
          price: number | null
          rating: number | null
          return_time: string | null
          short_description: string | null
          tour_location: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          date_range?: string | null
          departure_location?: string | null
          departure_time?: string | null
          description?: string | null
          difficulty?: string | null
          dress_code?: string | null
          duration_days: number
          enabled?: boolean | null
          gallery?: string[] | null
          id?: never
          long_description?: string | null
          main_image?: string | null
          name: string
          persons?: string | null
          price?: number | null
          rating?: number | null
          return_time?: string | null
          short_description?: string | null
          tour_location?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          date_range?: string | null
          departure_location?: string | null
          departure_time?: string | null
          description?: string | null
          difficulty?: string | null
          dress_code?: string | null
          duration_days?: number
          enabled?: boolean | null
          gallery?: string[] | null
          id?: never
          long_description?: string | null
          main_image?: string | null
          name?: string
          persons?: string | null
          price?: number | null
          rating?: number | null
          return_time?: string | null
          short_description?: string | null
          tour_location?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      customizable_options: {
        Row: {
          additional_activities: string | null
          circuit_id: number | null
          comfort_level: string | null
          id: number
        }
        Insert: {
          additional_activities?: string | null
          circuit_id?: number | null
          comfort_level?: string | null
          id?: never
        }
        Update: {
          additional_activities?: string | null
          circuit_id?: number | null
          comfort_level?: string | null
          id?: never
        }
        Relationships: [
          {
            foreignKeyName: "customizable_options_circuit_id_fkey"
            columns: ["circuit_id"]
            isOneToOne: false
            referencedRelation: "circuits"
            referencedColumns: ["id"]
          },
        ]
      }
      destination_highlights: {
        Row: {
          destination_id: number
          highlight_id: number
        }
        Insert: {
          destination_id: number
          highlight_id: number
        }
        Update: {
          destination_id?: number
          highlight_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "destination_highlights_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "destination_highlights_highlight_id_fkey"
            columns: ["highlight_id"]
            isOneToOne: false
            referencedRelation: "highlights"
            referencedColumns: ["id"]
          },
        ]
      }
      destinations: {
        Row: {
          best_time_to_visit: string | null
          description: string | null
          direction: string | null
          duration: string | null
          id: number
          location: string | null
          location_id: number | null
          long_description: string | null
          main_image: string | null
          name: string
          price: number | null
          user_id: string | null
        }
        Insert: {
          best_time_to_visit?: string | null
          description?: string | null
          direction?: string | null
          duration?: string | null
          id?: never
          location?: string | null
          location_id?: number | null
          long_description?: string | null
          main_image?: string | null
          name: string
          price?: number | null
          user_id?: string | null
        }
        Update: {
          best_time_to_visit?: string | null
          description?: string | null
          direction?: string | null
          duration?: string | null
          id?: never
          location?: string | null
          location_id?: number | null
          long_description?: string | null
          main_image?: string | null
          name?: string
          price?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_destinations_location"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
        ]
      }
      faqs: {
        Row: {
          answer: string
          destination_id: number
          id: number
          question: string
        }
        Insert: {
          answer: string
          destination_id: number
          id?: never
          question: string
        }
        Update: {
          answer?: string
          destination_id?: number
          id?: never
          question?: string
        }
        Relationships: [
          {
            foreignKeyName: "faqs_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
        ]
      }
      highlights: {
        Row: {
          description: string
          id: number
        }
        Insert: {
          description: string
          id?: never
        }
        Update: {
          description?: string
          id?: never
        }
        Relationships: []
      }
      included_options: {
        Row: {
          destination_id: number
          option_id: number
        }
        Insert: {
          destination_id: number
          option_id: number
        }
        Update: {
          destination_id?: number
          option_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "included_options_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "included_options_option_id_fkey"
            columns: ["option_id"]
            isOneToOne: false
            referencedRelation: "options"
            referencedColumns: ["id"]
          },
        ]
      }
      itineraries: {
        Row: {
          activities: string | null
          circuit_id: number | null
          day_number: number
          id: number
          travel_duration: string | null
        }
        Insert: {
          activities?: string | null
          circuit_id?: number | null
          day_number: number
          id?: never
          travel_duration?: string | null
        }
        Update: {
          activities?: string | null
          circuit_id?: number | null
          day_number?: number
          id?: never
          travel_duration?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "itineraries_circuit_id_fkey"
            columns: ["circuit_id"]
            isOneToOne: false
            referencedRelation: "circuits"
            referencedColumns: ["id"]
          },
        ]
      }
      locations: {
        Row: {
          created_at: string | null
          description: string | null
          direction: Database["public"]["Enums"]["direction_enum"] | null
          geom: unknown
          id: number
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          direction?: Database["public"]["Enums"]["direction_enum"] | null
          geom: unknown
          id?: never
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          direction?: Database["public"]["Enums"]["direction_enum"] | null
          geom?: unknown
          id?: never
          name?: string
        }
        Relationships: []
      }
      logistics: {
        Row: {
          accommodation: string | null
          circuit_id: number | null
          id: number
          meals_included: string | null
          transport: string | null
        }
        Insert: {
          accommodation?: string | null
          circuit_id?: number | null
          id?: never
          meals_included?: string | null
          transport?: string | null
        }
        Update: {
          accommodation?: string | null
          circuit_id?: number | null
          id?: never
          meals_included?: string | null
          transport?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "logistics_circuit_id_fkey"
            columns: ["circuit_id"]
            isOneToOne: false
            referencedRelation: "circuits"
            referencedColumns: ["id"]
          },
        ]
      }
      media: {
        Row: {
          alt_text: string | null
          id: number
          media_url: string
          reference_id: number
          reference_type: string | null
        }
        Insert: {
          alt_text?: string | null
          id?: never
          media_url: string
          reference_id: number
          reference_type?: string | null
        }
        Update: {
          alt_text?: string | null
          id?: never
          media_url?: string
          reference_id?: number
          reference_type?: string | null
        }
        Relationships: []
      }
      not_included_options: {
        Row: {
          destination_id: number
          option_id: number
        }
        Insert: {
          destination_id: number
          option_id: number
        }
        Update: {
          destination_id?: number
          option_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "not_included_options_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "not_included_options_option_id_fkey"
            columns: ["option_id"]
            isOneToOne: false
            referencedRelation: "options"
            referencedColumns: ["id"]
          },
        ]
      }
      options: {
        Row: {
          description: string | null
          id: number
          name: string
        }
        Insert: {
          description?: string | null
          id?: never
          name: string
        }
        Update: {
          description?: string | null
          id?: never
          name?: string
        }
        Relationships: []
      }
      practical_information: {
        Row: {
          circuit_id: number | null
          id: number
          included: string | null
          not_included: string | null
          recommended_gear: string | null
        }
        Insert: {
          circuit_id?: number | null
          id?: never
          included?: string | null
          not_included?: string | null
          recommended_gear?: string | null
        }
        Update: {
          circuit_id?: number | null
          id?: never
          included?: string | null
          not_included?: string | null
          recommended_gear?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "practical_information_circuit_id_fkey"
            columns: ["circuit_id"]
            isOneToOne: false
            referencedRelation: "circuits"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          id: string
          role: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id: string
          role?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      quiz_responses: {
        Row: {
          activities: string[] | null
          additional_info: string | null
          budget: string | null
          created_at: string | null
          duration: string | null
          email: string | null
          id: string
          region: string | null
          travel_type: string[] | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          activities?: string[] | null
          additional_info?: string | null
          budget?: string | null
          created_at?: string | null
          duration?: string | null
          email?: string | null
          id?: string
          region?: string | null
          travel_type?: string[] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          activities?: string[] | null
          additional_info?: string | null
          budget?: string | null
          created_at?: string | null
          duration?: string | null
          email?: string | null
          id?: string
          region?: string | null
          travel_type?: string[] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      reservation_requests: {
        Row: {
          adults_count: number | null
          children_count: number | null
          created_at: string
          destination_id: string | null
          end_date: string | null
          estimated_month: string | null
          estimated_season: string | null
          group_size: number | null
          group_type: string | null
          id: string
          reference_id: number | null
          reference_type: string | null
          start_date: string | null
          status: string | null
          travel_type: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          adults_count?: number | null
          children_count?: number | null
          created_at?: string
          destination_id?: string | null
          end_date?: string | null
          estimated_month?: string | null
          estimated_season?: string | null
          group_size?: number | null
          group_type?: string | null
          id?: string
          reference_id?: number | null
          reference_type?: string | null
          start_date?: string | null
          status?: string | null
          travel_type: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          adults_count?: number | null
          children_count?: number | null
          created_at?: string
          destination_id?: string | null
          end_date?: string | null
          estimated_month?: string | null
          estimated_season?: string | null
          group_size?: number | null
          group_type?: string | null
          id?: string
          reference_id?: number | null
          reference_type?: string | null
          start_date?: string | null
          status?: string | null
          travel_type?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          circuit_id: number | null
          id: number
          rating: number | null
          review_text: string | null
          traveler_name: string | null
        }
        Insert: {
          circuit_id?: number | null
          id?: never
          rating?: number | null
          review_text?: string | null
          traveler_name?: string | null
        }
        Update: {
          circuit_id?: number | null
          id?: never
          rating?: number | null
          review_text?: string | null
          traveler_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_circuit_id_fkey"
            columns: ["circuit_id"]
            isOneToOne: false
            referencedRelation: "circuits"
            referencedColumns: ["id"]
          },
        ]
      }
      site_settings: {
        Row: {
          blog_count: number | null
          circuits_count: number | null
          created_at: string | null
          destinations_count: number | null
          hero_images: string[] | null
          hero_subtitle: string | null
          hero_title: string | null
          id: number
          show_blog: boolean | null
          show_circuits: boolean | null
          show_destinations: boolean | null
          updated_at: string | null
        }
        Insert: {
          blog_count?: number | null
          circuits_count?: number | null
          created_at?: string | null
          destinations_count?: number | null
          hero_images?: string[] | null
          hero_subtitle?: string | null
          hero_title?: string | null
          id?: number
          show_blog?: boolean | null
          show_circuits?: boolean | null
          show_destinations?: boolean | null
          updated_at?: string | null
        }
        Update: {
          blog_count?: number | null
          circuits_count?: number | null
          created_at?: string | null
          destinations_count?: number | null
          hero_images?: string[] | null
          hero_subtitle?: string | null
          hero_title?: string | null
          id?: number
          show_blog?: boolean | null
          show_circuits?: boolean | null
          show_destinations?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_admin_user: {
        Args: {
          user_email: string
          user_password: string
        }
        Returns: undefined
      }
      scoring_search_destinations_and_circuits: {
        Args: {
          user_id: string
        }
        Returns: {
          destination_name: string
          destination_description: string
          circuit_name: string
          circuit_description: string
          score: number
        }[]
      }
    }
    Enums: {
      direction_enum:
        | "nord"
        | "sud"
        | "est"
        | "ouest"
        | "nord-est"
        | "nord-ouest"
        | "sud-est"
        | "sud-ouest"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
