import { AxiosRequestConfig } from "axios";
import { http } from "./http";
import type { ArticlesQuery, MultipleArticlesResponse, SingleArticleResponse, SingleProfileResponse } from "./types";
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
  }
};
