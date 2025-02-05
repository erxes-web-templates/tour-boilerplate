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

type MenuItem = {
  _id: string;
  label: string;
  url: string;
};

type CPDetail = {
  _id: string;
  name: string;
  description: string;
  copyright: string;
  styles: {
    baseColor: string;
    backgroundColor: string;
    headingFont: string;
    baseFont: string;
  };
  externalLinks: {
    phones: string[];
    emails: string[];
  };
};

export type { CmsMenuList, CmsMenuListVariables, MenuItem, CPDetail };
