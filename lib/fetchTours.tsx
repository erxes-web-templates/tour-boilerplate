import { TOUR_DETAIL_QUERY, TOURS_QUERY } from "@/graphql/queries";
import { getClient } from "./client";
import {
  BmTourDetail,
  BmTourDetailVariables,
  BmToursData,
} from "@/types/tours";

export async function fetchBmTours(
  page: number,
  perPage: number,
  config?: any
) {
  const client = getClient();

  try {
    const { data } = await client.query<BmToursData>({
      query: TOURS_QUERY,
      variables: { page, perPage, ...config },
      context: {
        headers: {
          "erxes-app-token": process.env.ERXES_APP_TOKEN,
        },
      },
    });

    return data.bmTours;
  } catch (error) {
    console.error("Error fetching BM Tours:", error);
    return { total: 0, list: [] };
  }
}

export async function fetchBmTourDetail(id: string, branchId?: string) {
  const client = getClient();

  try {
    const { data } = await client.query<
      { bmTourDetail: BmTourDetail },
      BmTourDetailVariables
    >({
      query: TOUR_DETAIL_QUERY,
      variables: { id, branchId },
      context: {
        headers: {
          "erxes-app-token": process.env.ERXES_APP_TOKEN,
        },
      },
    });

    return data.bmTourDetail;
  } catch (error) {
    console.error("Error fetching BM Tour Detail:", error);
    return null;
  }
}
