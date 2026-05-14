export interface ProfileType {
  username: string;
  bio: string | null;
  image: string | null;
  following: boolean;
}

export interface ArticleType {
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
  articles: ArticleType[];
  articlesCount: number;
}

export interface SingleArticleResponse {
  article: ArticleType;
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

export interface User {
  email: string;
  token: string;
  username: string;
  bio: string | null;
  image: string | null;
}

export interface SingleUserResponse {
  user: User;
}

export interface Profile {
  username: string;
  bio: string | null;
  image: string | null;
  following: boolean;
}
