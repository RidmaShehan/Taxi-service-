export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      bookings: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string;
          pickup_location: string;
          destination: string;
          date_time: string;
          passenger_count: number;
          message: string | null;
          status: "pending" | "confirmed" | "cancelled";
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["bookings"]["Row"],
          "id" | "created_at" | "status"
        > & { status?: "pending" | "confirmed" | "cancelled" };
        Update: Partial<Database["public"]["Tables"]["bookings"]["Row"]>;
      };
      cars: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          seats: number;
          luggage: number;
          image_url: string | null;
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["cars"]["Row"],
          "id" | "created_at"
        >;
        Update: Partial<Database["public"]["Tables"]["cars"]["Row"]>;
      };
      testimonials: {
        Row: {
          id: string;
          name: string;
          country: string | null;
          review: string;
          rating: number;
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["testimonials"]["Row"],
          "id" | "created_at"
        >;
        Update: Partial<Database["public"]["Tables"]["testimonials"]["Row"]>;
      };
      reviews: {
        Row: {
          id: string;
          name: string;
          review: string;
          rating: number;
          approved: boolean;
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["reviews"]["Row"],
          "id" | "created_at" | "approved"
        > & { approved?: boolean };
        Update: Partial<Database["public"]["Tables"]["reviews"]["Row"]>;
      };
      profiles: {
        Row: {
          id: string;
          email: string;
          role: "user" | "admin";
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["profiles"]["Row"],
          "created_at"
        >;
        Update: Partial<Database["public"]["Tables"]["profiles"]["Row"]>;
      };
    };
  };
}

export type BookingRow = Database["public"]["Tables"]["bookings"]["Row"];
export type CarRow = Database["public"]["Tables"]["cars"]["Row"];
export type TestimonialRow =
  Database["public"]["Tables"]["testimonials"]["Row"];
export type ReviewRow = Database["public"]["Tables"]["reviews"]["Row"];
