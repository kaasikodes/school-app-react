export type TPaymentCategry = {
  name: string;
  id: string;
  description?: string;
};
export type TCurrency = {
  name: string;
  id: string;
  code: string;
};

export type TLevelfee = {
  id: string;
  level: string;

  category: string;
  docUrl: string;
  amount: number;
  inPart: boolean;
  currency: string;
};
export type TSudentSessPaymentRec = {
  id: string;
  student: string;
  recorder?: string;
  amountDue: number;
  amountPaid: number;
  createdAt: string;
};
