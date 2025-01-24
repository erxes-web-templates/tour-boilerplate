interface CmsMenuList {
  _id: string;
  url: string;
  parentId: string;
  icon: string;
  kind: string;
  label: string;
  contentType: string;
  contentTypeID: string;
  order: number;
}

interface CmsMenuListVariables {
  clientPortalId: string;
  kind: string;
}

export type { CmsMenuList, CmsMenuListVariables };
