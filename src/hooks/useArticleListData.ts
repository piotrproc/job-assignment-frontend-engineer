import { useAuth } from "../auth/AuthContext";
import { useOnUnauthorized } from "./useOnUnauthorized";
import { apiClient } from "../api/client";
import { toApiClientError } from "../api/errors";
import { ArticleType } from "../api/types";
import { useEffect, useState } from "react";
import { isRequestCanceled } from "../api/http";

interface UseArticleListDataResult {
  articles: ArticleType[];
  isLoading: boolean;
  errorMessage: string | null;
  handleToggleFavorite: (article: ArticleType) => void;
}

export function useArticleListData(): UseArticleListDataResult {
  const { isAuthenticated } = useAuth();
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onUnauthorized = useOnUnauthorized();

  useEffect(() => {
    const abortController = new AbortController();

    setIsLoading(true);
    setErrorMessage(null);

    apiClient
      .getArticles({ limit: 20, offset: 0 })
      .then(response => {
        if (abortController.signal.aborted) {
          return;
        }

        setArticles(response.articles);
      })
      .catch((error: unknown) => {
        if (abortController.signal.aborted || isRequestCanceled(error)) {
          return;
        }

        const apiError = toApiClientError(error);
        setErrorMessage(apiError.details[0] ?? apiError.message);
      })
      .finally(() => {
        if (abortController.signal.aborted) {
          return;
        }

        setIsLoading(false);
      });

    return () => {
      abortController.abort();
    };
  }, []);

  const handleToggleFavorite = async (article: ArticleType) => {
    if (!isAuthenticated) {
      onUnauthorized();
      return;
    }

    console.log("123");

    try {
      const response = article.favorited
        ? await apiClient.unfavoriteArticle(article.slug)
        : await apiClient.favoriteArticle(article.slug);

      setArticles(currentArticles =>
        currentArticles.map(currentArticle =>
          currentArticle.slug === article.slug ? response.article : currentArticle
        )
      );

    } catch (error) {
      const apiError = toApiClientError(error);
      if (apiError.status === 401 || apiError.status === 403) {
        onUnauthorized();
      }
    }
  };



  return {
    articles,
    isLoading,
    errorMessage,
    handleToggleFavorite,
  };
}
