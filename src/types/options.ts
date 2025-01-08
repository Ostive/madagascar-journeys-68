export interface Option {
  id: number;
  name: string;
  description: string | null;
}

export interface IncludedOption {
  destination_id: number;
  option_id: number;
}

export interface NotIncludedOption {
  destination_id: number;
  option_id: number;
}