interface BmTour {
  _id: string;
  content: string;
  startDate: string;
  endDate: string;
  cost: number;
  viewCount: number;
  name: string;
  itineraryId: string;
  refNumber: string;
}

interface BmToursData {
  bmTours: {
    total: number;
    list: BmTour[];
  };
}

interface BmTourDetail {
  _id: string;
  branchId?: string;
  content: string;
  cost: number;
  name: string;
  status: string;
  startDate: string;
  refNumber: string;
  viewCount: number;
}

interface BmTourDetailVariables {
  id: string;
  branchId?: string;
}

export type { BmTour, BmToursData, BmTourDetail, BmTourDetailVariables };
