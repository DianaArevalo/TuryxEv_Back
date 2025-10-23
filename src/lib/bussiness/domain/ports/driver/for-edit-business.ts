export interface EditBusinessProps {
  businessId: string;
  status?: string;
}

export interface ForEditBusiness {
  edit(props: EditBusinessProps): Promise<void>;
}
