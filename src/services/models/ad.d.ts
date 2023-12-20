export type Ad = {
  id: number;
  title: string;
  description: string;
  price: number;
  favorited: boolean;
  photos: any[];
  seller: {
    phoneNumber: string;
    fullName: string;
  };
  intent: string;
  city: {
    id: number;
    name: string;
    state: {
      id: number;
      name: string;
      uf: string;
    };
  };
  itemCondition: {
    condition: string;
    description: string;
    id: number;
  };
  views: number;
  creationDate: string;
  status: string;
  reason: string;
  statusReason: string;
};
