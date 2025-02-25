interface Section {
  type: string;
  name?: string;
  config?: any;
  order: number;
  content?: string;
  contentType?: string;
  contentTypeId?: string | null;
}

export type { Section };
