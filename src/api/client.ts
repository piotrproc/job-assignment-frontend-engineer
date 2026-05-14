import { AxiosRequestConfig } from "axios";
import { http } from "./http";
import type {
  ArticlesQuery,
  MultipleArticlesResponse,
  SingleArticleResponse,
  SingleProfileResponse,
  SingleUserResponse,
} from "./types";
import { createApiClientError } from "./errors";

export interface RequestOptions {
  signal?: AbortSignal;
}

async function request<TResponse>(path: string, init: AxiosRequestConfig = {}): Promise<TResponse> {
  try {
    const response = await http.request<TResponse>({
      ...init,
      url: path,
    });
    return response.data;
  } catch (error) {
    console.log("Error MyError");

    throw createApiClientError(0);
  }
}

export const apiClient = {
  login(email: string, password: string): Promise<SingleUserResponse> {
    return request<SingleUserResponse>("/users/login", {
      method: "POST",
      data: {
        user: { email, password },
      },
    });
  },

  getArticles(query?: ArticlesQuery): Promise<MultipleArticlesResponse> {
    return request<MultipleArticlesResponse>("/articles", {
      params: query
    });
  },

  getArticle(slug: string): Promise<SingleArticleResponse> {
    return request<SingleArticleResponse>(`/articles/${slug}`);
  },

  getProfile(username: string): Promise<SingleProfileResponse> {
    return request<SingleProfileResponse>(`/profiles/${username}`);
  },

  getCurrentUser(options?: RequestOptions): Promise<SingleUserResponse> {
    return request<SingleUserResponse>("/user", options);
  },

  favoriteArticle(slug: string): Promise<SingleArticleResponse> {
    return request<SingleArticleResponse>(`/articles/${slug}/favorite`, { method: "POST" });
  },

  unfavoriteArticle(slug: string): Promise<SingleArticleResponse> {
    return request<SingleArticleResponse>(`/articles/${slug}/favorite`, { method: "DELETE" });
  },

  followUser(username: string): Promise<SingleProfileResponse> {
    return request<SingleProfileResponse>(`/profiles/${username}/follow`, { method: "POST" });
  },

  unfollowUser(username: string): Promise<SingleProfileResponse> {
    return request<SingleProfileResponse>(`/profiles/${username}/follow`, { method: "DELETE" });
  },
};
