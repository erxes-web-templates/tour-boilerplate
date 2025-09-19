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

type CmsPost = {
  _id: string;
  slug: string;
  title: string;
  category: string
  excerpt: any
  createdAt: any
  content: string;
  thumbnail: {
    url: string;
    name: string;
  };
};

export type { CmsMenuList, CmsMenuListVariables, CmsPost };
