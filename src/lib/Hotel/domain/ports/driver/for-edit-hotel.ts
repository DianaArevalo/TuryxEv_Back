export interface EditProps {
  hotelId: string;
  name?: string;
  location?: string;
  plan?: string;
  status?: string;
  score?: string;
  picture?: string;
  freePlanEnd?: Date;
}

export interface ForEditHotel {
  edit(props: EditProps): Promise<void>;
}
