
export interface Asset {
  stt: number;
  bankName: string;
  assetType: string;
  description: string;
  owner: string;
  value: number;
  pledgeDate: string;
}

export interface ExtractedData {
  customerName: string;
  assets: Asset[];
}
