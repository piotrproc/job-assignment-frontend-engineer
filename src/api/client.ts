import { AxiosRequestConfig } from "axios";
import { API_BASE_URL } from "./http";
import type { MultipleArticlesResponse } from "./types";
import { createApiClientError } from "./errors";

export interface RequestOptions {
  signal?: AbortSignal;
}

async function request<TResponse>(path: string, init: AxiosRequestConfig = {}): Promise<TResponse> {
  try {
    const response = await fetch(API_BASE_URL + path, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      }
    })
    return response.json();
  } catch (error) {
    console.log("Error while retrieving request", error);

    throw createApiClientError(0);
  }
}

export const apiClient = {
  getArticles(options?: RequestOptions): Promise<MultipleArticlesResponse> {
    return request<MultipleArticlesResponse>("/articles");
  }
};
