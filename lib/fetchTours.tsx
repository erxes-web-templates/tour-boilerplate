import {
  TOUR_DETAIL_QUERY,
  TOUR_GROUP_DETAIL_QUERY,
  TOURS_GROUP_QUERY,
  TOURS_QUERY,
} from "@/graphql/queries";
import { getClient } from "./client";
import {
  BmTourDetail,
  BmTourDetailVariables,
  BmTourGroupDetailVariables,
  BmToursData,
  BmToursGroupVariables,
} from "@/types/tours";

export async function fetchBmTours(
  page: number,
  perPage: number,
  config?: any
) {
  const client = getClient();

  console.log(
    `[BM Tours] Request params - page: ${page}, perPage: ${perPage}, config:`,
    JSON.stringify(config)
  );

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
    console.error("[BM Tours] Error fetching data:", error);

    // Log more detailed error information
    if ((error as any).graphQLErrors) {
      console.error(
        "[BM Tours] GraphQL errors:",
        JSON.stringify((error as any).graphQLErrors)
      );
    }
    if ((error as any).networkError) {
      console.error(
        "[BM Tours] Network error details:",
        (error as any).networkError
      );
      // For 400 errors, the response might contain more information
      if ((error as any).networkError.result) {
        console.error(
          "[BM Tours] Error response:",
          JSON.stringify((error as any).networkError.result)
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

export async function fetchBmToursGroup(page: number, perPage: number) {
  const client = getClient();

  try {
    const { data } = await client.query<
      { bmToursGroup: { list: BmTourDetail[] } },
      BmToursGroupVariables
    >({
      query: TOURS_GROUP_QUERY,
      variables: { status: "website", page, perPage },
      context: {
        headers: {
          "erxes-app-token": process.env.ERXES_APP_TOKEN,
        },
      },
    });

    return data.bmToursGroup.list;
  } catch (error) {
    console.error("Error fetching BM Tour Detail:", error);
    return null;
  }
}

export async function fetchBmToursGroupDetail(groupCode: string) {
  const client = getClient();

  try {
    const { data } = await client.query<
      { bmToursGroupDetail: BmTourDetail[] },
      BmTourGroupDetailVariables
    >({
      query: TOUR_GROUP_DETAIL_QUERY,
      variables: { groupCode, status: "website" },
      context: {
        headers: {
          "erxes-app-token": process.env.ERXES_APP_TOKEN,
        },
      },
    });

    return data.bmToursGroupDetail;
  } catch (error) {
    console.error("Error fetching BM Tours Group Detail:", error);
    return null;
  }
}
