export interface EditBusinessProps {
  businessId: string;
  status?: string;
}

export interface SuperAdminBusinessServicePort {
  edit(props: EditBusinessProps): Promise<void>;
}
