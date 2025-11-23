export interface EditHotelProps {
  hotelId: string;
  plan?: string;
  status?: string;
  score?: number;
  freePlanEnd?: Date;
}

export interface SuperAdminHotelServicePort {
  edit(props: EditHotelProps): Promise<void>;
}
