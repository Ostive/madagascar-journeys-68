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
          start_date?: string | null
          status?: string | null
          travel_type?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
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
