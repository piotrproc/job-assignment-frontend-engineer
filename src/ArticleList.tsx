import AppLayout from "./AppLayout";
import { useEffect, useState } from "react";
import { apiClient } from "./api/client";
import { ArticleType } from "./api/types";
import { formatPublicationDate, getAuthorImage } from "./utils/articlePresentation";

export default function ArticleList() {
  const [articles, setArticles] = useState<ArticleType[]>([]);

  useEffect(() => {
    apiClient
      .getArticles()
      .then(response => {
        console.log(response.articles);
        setArticles(response.articles);
      })
      .catch((error: unknown) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <AppLayout activeNav="home">
        <div className="home-page">
          <div className="banner">
            <div className="container">
              <h1 className="logo-font">conduit</h1>
              <p>A place to share your knowledge.</p>
            </div>
          </div>

          <div className="container page">
            <div className="row">
              <div className="col-md-9">
                <div className="feed-toggle">
                  <ul className="nav nav-pills outline-active">
                    <li className="nav-item">
                      <a className="nav-link disabled" href="">
                        Your Feed
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link active" href="">
                        Global Feed
                      </a>
                    </li>
                  </ul>
                </div>

                {articles.length > 0 &&
                  articles.map(article => (
                      <div className="article-preview" key={article.slug}>
                        <div className="article-meta">
                          <a href={`/#/profile/${article.author.username}`}>
                            <img src={getAuthorImage(article.author.image ?? null)} alt={article.author.username} />
                          </a>
                          <div className="info">
                            <a href={`/#/profile/${article.author.username}`} className="author">
                              {article.author.username}
                            </a>
                            <span className="date">{formatPublicationDate(article.createdAt)}</span>
                          </div>
                          <button className="btn btn-outline-primary btn-sm pull-xs-right">
                            <i className="ion-heart" /> {article.favoritesCount}
                          </button>
                        </div>
                        <a href={`/#/${article.slug}`} className="preview-link">
                          <h1>{article.title}</h1>
                          <p>{article.description}</p>
                          <span>Read more...</span>
                        </a>
                      </div>
                  ))}
              </div>

              <div className="col-md-3">
                <div className="sidebar">
                  <p>Popular Tags</p>

                  <div className="tag-list">
                    <a href="" className="tag-pill tag-default">
                      programming
                    </a>
                    <a href="" className="tag-pill tag-default">
                      javascript
                    </a>
                    <a href="" className="tag-pill tag-default">
                      emberjs
                    </a>
                    <a href="" className="tag-pill tag-default">
                      angularjs
                    </a>
                    <a href="" className="tag-pill tag-default">
                      react
                    </a>
                    <a href="" className="tag-pill tag-default">
                      mean
                    </a>
                    <a href="" className="tag-pill tag-default">
                      node
                    </a>
                    <a href="" className="tag-pill tag-default">
                      rails
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AppLayout>
    </>
  );
}
