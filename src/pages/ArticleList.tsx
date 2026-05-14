import AppLayout from "../components/AppLayout";
import { formatPublicationDate, getAuthorImage } from "../utils/articlePresentation";
import { useArticleListData } from "../hooks/useArticleListData";
import MainBar from "../components/home/MainBar";
import Feeds from "../components/home/Feeds";
import Tags from "../components/home/Tags";

export default function ArticleList() {
  const { handleToggleFavorite, articles, isLoading, errorMessage } = useArticleListData();

  return (
    <>
      <AppLayout activeNav="home">
        <div className="home-page">
          <MainBar/>

          <div className="container page">
            <div className="row">
              <div className="col-md-9">
                <Feeds/>

                {isLoading && <div className="article-preview">Loading articles...</div>}

                {!isLoading && errorMessage && (
                  <div className="article-preview">
                    <ul className="error-messages">
                      <li>{errorMessage}</li>
                    </ul>
                  </div>
                )}

                {!isLoading && !errorMessage && articles.length === 0 && (
                  <div className="article-preview">No articles are here... yet.</div>
                )}

                {!isLoading &&
                  !errorMessage &&
                  articles.length > 0 &&
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
                        <button
                          className={`btn btn-sm pull-xs-right ${
                            article.favorited ? "btn-primary" : "btn-outline-primary"
                          }`}
                          type="button"
                          onClick={() => {
                            handleToggleFavorite(article);
                          }}
                        >
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

              <Tags/>
            </div>
          </div>
        </div>
      </AppLayout>
    </>
  );
}
