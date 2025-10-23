export interface EditBusinessProps {
  businessId: string;
  status?: string;
}

export interface ForBusinessEdit {
  edit(props: EditBusinessProps): Promise<void>;
}
