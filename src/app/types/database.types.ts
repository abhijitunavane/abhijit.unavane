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
      about: {
        Row: {
          experiences: Database["public"]["CompositeTypes"]["experience"][]
          headers: string[]
          id: number
          image: string | null
          infoHeader: string
          infoSummary: string
          links: Database["public"]["CompositeTypes"]["about_link"][]
        }
        Insert: {
          experiences: Database["public"]["CompositeTypes"]["experience"][]
          headers?: string[]
          id?: number
          image?: string | null
          infoHeader: string
          infoSummary: string
          links: Database["public"]["CompositeTypes"]["about_link"][]
        }
        Update: {
          experiences?: Database["public"]["CompositeTypes"]["experience"][]
          headers?: string[]
          id?: number
          image?: string | null
          infoHeader?: string
          infoSummary?: string
          links?: Database["public"]["CompositeTypes"]["about_link"][]
        }
        Relationships: []
      }
      domain: {
        Row: {
          id: string
          image: string | null
          name: string
          next: Database["public"]["CompositeTypes"]["link"] | null
          overview: string
          projectDescription: string
          projectList: Database["public"]["Tables"]["project"]["Row"][]
        }
        Insert: {
          id: string
          image?: string | null
          name: string
          next?: Database["public"]["CompositeTypes"]["link"] | null
          overview: string
          projectDescription: string
          projectList?: Database["public"]["Tables"]["project"]["Row"][]
        }
        Update: {
          id?: string
          image?: string | null
          name?: string
          next?: Database["public"]["CompositeTypes"]["link"] | null
          overview?: string
          projectDescription?: string
          projectList?: Database["public"]["Tables"]["project"]["Row"][]
        }
        Relationships: []
      }
      photos: {
        Row: {
          category: string
          categoryId: string
          description: string | null
          id: number
          image: string
          instagramUrl: string
          nextCategoryId: string
          title: string | null
        }
        Insert: {
          category: string
          categoryId: string
          description?: string | null
          id?: number
          image: string
          instagramUrl: string
          nextCategoryId: string
          title?: string | null
        }
        Update: {
          category?: string
          categoryId?: string
          description?: string | null
          id?: number
          image?: string
          instagramUrl?: string
          nextCategoryId?: string
          title?: string | null
        }
        Relationships: []
      }
      project: {
        Row: {
          description: string
          domainId: string | null
          features: Database["public"]["CompositeTypes"]["feature"][] | null
          githubUrl: string | null
          hostUrl: string | null
          id: string
          image: string | null
          likes: number
          name: string
          nextProjectLink: Database["public"]["CompositeTypes"]["link"] | null
          shares: number
        }
        Insert: {
          description: string
          domainId?: string | null
          features?: Database["public"]["CompositeTypes"]["feature"][] | null
          githubUrl?: string | null
          hostUrl?: string | null
          id: string
          image?: string | null
          likes?: number
          name: string
          nextProjectLink?: Database["public"]["CompositeTypes"]["link"] | null
          shares?: number
        }
        Update: {
          description?: string
          domainId?: string | null
          features?: Database["public"]["CompositeTypes"]["feature"][] | null
          githubUrl?: string | null
          hostUrl?: string | null
          id?: string
          image?: string | null
          likes?: number
          name?: string
          nextProjectLink?: Database["public"]["CompositeTypes"]["link"] | null
          shares?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_project_domainId_fkey"
            columns: ["domainId"]
            isOneToOne: false
            referencedRelation: "domain"
            referencedColumns: ["id"]
          },
        ]
      }
      visitors: {
        Row: {
          id: string
          likes: string[]
          name: string | null
          shares: string[]
        }
        Insert: {
          id?: string
          likes?: string[]
          name?: string | null
          shares?: string[]
        }
        Update: {
          id?: string
          likes?: string[]
          name?: string | null
          shares?: string[]
        }
        Relationships: []
      }
      work: {
        Row: {
          id: number
          image: string | null
          link: Database["public"]["CompositeTypes"]["link"] | null
          name: string
        }
        Insert: {
          id: number
          image?: string | null
          link?: Database["public"]["CompositeTypes"]["link"] | null
          name: string
        }
        Update: {
          id?: number
          image?: string | null
          link?: Database["public"]["CompositeTypes"]["link"] | null
          name?: string
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
      continents:
        | "Africa"
        | "Antarctica"
        | "Asia"
        | "Europe"
        | "Oceania"
        | "North America"
        | "South America"
      link_type: "INSTAGRAM" | "LINKEDIN"
    }
    CompositeTypes: {
      about_link: {
        type: Database["public"]["Enums"]["link_type"] | null
        link: string | null
        image: string | null
      }
      experience: {
        role: string | null
        companyName: string | null
        companyLink: string | null
        type: string | null
        period: string | null
        location: string | null
        summary: string | null
        skills: string[] | null
      }
      feature: {
        name: string | null
        description: string | null
        image: string | null
      }
      link: {
        label: string | null
        route: string | null
      }
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
