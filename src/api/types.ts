export interface ProfileType {
  username: string;
  bio: string | null;
  image: string | null;
  following: boolean;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: ProfileType;
}

export interface MultipleArticlesResponse {
  articles: Article[];
  articlesCount: number;
}

export interface SingleProfileResponse {
  profile: ProfileType;
}

export interface ArticlesQuery {
  tag?: string;
  author?: string;
  favorited?: string;
  limit?: number;
  offset?: number;
}


