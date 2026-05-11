import { AxiosRequestConfig } from "axios";
import { http } from "./http";
import type { MultipleArticlesResponse } from "./types";
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
  getArticles(options?: RequestOptions): Promise<MultipleArticlesResponse> {
    return request<MultipleArticlesResponse>("/articles");
  }
};
