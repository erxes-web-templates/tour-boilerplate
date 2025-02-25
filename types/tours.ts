interface BmTour {
  _id: string;
  content: string;
  startDate: string;
  endDate: string;
  cost: number;
  viewCount: number;
  name: string;
  itineraryId: string;
  itinerary: any;
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
  itinerary: any;
}

interface BmTourDetailVariables {
  id: string;
  branchId?: string;
}

interface Itinerary {
  _id: string;
  images?: any;
  branchId?: string;
  content?: string;
  info1?: string;
  info2?: string;
  info3?: string;
  info4?: string;
  location?: {
    lat: number;
    lng: number;
    mapId: string;
    name: string;
  };
  name: string;
  status?: string;
  totalcost?: number;
  personCost?: any;
}

export type {
  BmTour,
  BmToursData,
  BmTourDetail,
  BmTourDetailVariables,
  Itinerary,
};
