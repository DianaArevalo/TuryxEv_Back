export interface EditHotelProps {
  hotelId: string;
  name?: string;
  location?: string;
  plan?: string;
  status?: string;
  score?: string;
  picture?: string;
  freePlanEnd?: Date;
}

export interface ForHotelEdit {
  edit(props: EditHotelProps): Promise<void>;
}
