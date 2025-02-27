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

  console.log(
    `[BM Tours] Fetching page ${page}, items per page: ${perPage}, config:`,
    config
  );

  try {
    const startTime = performance.now();

    const { data } = await client.query<BmToursData>({
      query: TOURS_QUERY,
      variables: { page, perPage, ...config },
      context: {
        headers: {
          "erxes-app-token": process.env.ERXES_APP_TOKEN,
        },
      },
    });

    const duration = performance.now() - startTime;
    console.log(
      `[BM Tours] Successfully fetched ${
        data.bmTours.list.length
      } items in ${duration.toFixed(2)}ms`
    );

    return data.bmTours;
  } catch (error) {
    console.error("[BM Tours] Error fetching data:", error);

    // More detailed error information
    if (error instanceof Error) {
      if ((error as any).networkError) {
        console.error(
          "[BM Tours] Network error details:",
          (error as any).networkError
        );
      }
      if ((error as any).graphQLErrors) {
        console.error(
          "[BM Tours] GraphQL errors:",
          (error as any).graphQLErrors
        );
      }
    }

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
