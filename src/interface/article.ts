export interface Article {
  title: string;
  image: string;
  content: string;
  viewCount: number;
  slug: string;
  status: "draft" | "published" | "archived";
  isBreaking: boolean;
}
