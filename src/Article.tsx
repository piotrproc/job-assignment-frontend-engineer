import AppLayout from "./AppLayout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiClient } from "./api/client";
import { ArticleType } from "./api/types";
import { formatPublicationDate, getAuthorImage } from "./utils/articlePresentation";
import { useArticleData } from "./hooks/useArticleData";

export default function Article() {
  const { slug } = useParams<{ slug: string }>();

  const {
    article,
    isLoading,
    errorMessage,
    isFavoritePending,
    isFollowPending,
    isOwnArticle,
    handleToggleFavorite,
    handleToggleFollow,
  } = useArticleData({
    slug,
  });

  console.log(slug);

  const profileHref = `/#/profile/${article?.author.username}`;
  const shouldShowFollowButton = !isOwnArticle;
  const followButtonClass = `btn btn-sm ${article?.author.following ? "btn-secondary" : "btn-outline-secondary"}`;
  const favoriteButtonClass = `btn btn-sm ${article?.favorited ? "btn-primary" : "btn-outline-primary"}`;


  const renderArticleMeta = () => {
    return (
      <div className="article-meta">
        <a href="/#/profile/ericsimmons">
          <img src={getAuthorImage(article?.author.image ?? null)} alt={article?.author.username} />
        </a>
        <div className="info">
          <a href={profileHref} className="author">
            {article?.author.username}
          </a>
          <span className="date">{formatPublicationDate(article ? article.createdAt : "")}</span>
        </div>
        <button className={followButtonClass} type="button" onClick={handleToggleFollow}>
          <i className="ion-plus-round" />
          &nbsp; {article?.author.following ? "Following" : "Follow"} {article?.author.username}
        </button>
        &nbsp;&nbsp;
        <button
          className={favoriteButtonClass}
          type="button"
          onClick={handleToggleFavorite}
        >
          <i className="ion-heart" />
          &nbsp; Favorite Post <span className="counter">({article?.favoritesCount})</span>
        </button>
      </div>
    );
  };

  return (
    <>
      <AppLayout activeNav="home">
        <div className="article-page">
          <div className="banner">
            <div className="container">
              <h1>{article?.title}</h1>
              {renderArticleMeta()}
            </div>
          </div>

          <div className="container page">
            <div className="row article-content">
              <div className="col-md-12">
                {article?.body.split("\n").map((paragraph, index) => (
                  <p key={`${article?.slug}-${index}`}>{paragraph}</p>
                ))}
              </div>
            </div>

            <hr />

            <div className="article-actions">
              {renderArticleMeta()}
            </div>

            <div className="row">
              <div className="col-xs-12 col-md-8 offset-md-2">
                <form className="card comment-form">
                  <div className="card-block">
                    <textarea className="form-control" placeholder="Write a comment..." rows={3} />
                  </div>
                  <div className="card-footer">
                    <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                    <button className="btn btn-sm btn-primary">Post Comment</button>
                  </div>
                </form>

                <div className="card">
                  <div className="card-block">
                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                  </div>
                  <div className="card-footer">
                    <a href="/#/profile/jacobschmidt" className="comment-author">
                      <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                    </a>
                    &nbsp;
                    <a href="/#/profile/jacobschmidt" className="comment-author">
                      Jacob Schmidt
                    </a>
                    <span className="date-posted">Dec 29th</span>
                  </div>
                </div>

                <div className="card">
                  <div className="card-block">
                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                  </div>
                  <div className="card-footer">
                    <a href="/#/profile/jacobschmidt" className="comment-author">
                      <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                    </a>
                    &nbsp;
                    <a href="/#/profile/jacobschmidt" className="comment-author">
                      Jacob Schmidt
                    </a>
                    <span className="date-posted">Dec 29th</span>
                    <span className="mod-options">
                      <i className="ion-edit" />
                      <i className="ion-trash-a" />
                    </span>
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
