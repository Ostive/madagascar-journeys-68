// Base types for all tables
export type Tables = {
  package_options: {
    Row: {
      id: number
      additional_activities: string
      included: boolean
      not_included: boolean
      created_at?: string
      updated_at?: string
    }
    Insert: {
      id?: number
      additional_activities: string
      included?: boolean
      not_included?: boolean
      created_at?: string
      updated_at?: string
    }
    Update: {
      id?: number
      additional_activities?: string
      included?: boolean
      not_included?: boolean
      updated_at?: string
    }
  }
}