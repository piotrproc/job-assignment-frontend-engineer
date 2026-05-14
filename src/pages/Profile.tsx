import AppLayout from "../components/AppLayout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiClient } from "../api/client";
import { ArticleType, ProfileType } from "../api/types";
import { formatPublicationDate, getAuthorImage } from "../utils/articlePresentation";
import { useProfileData } from "../hooks/useProfileData";

export default function Profile() {
  const { username } = useParams<{ username: string }>();

  // const [profile, setProfile] = useState<ProfileType | null>(null);

  const isFavoritesTab = location.pathname.endsWith("/favorites");

  const {
    profile,
    articles,
    isLoading,
    errorMessage,
    isFollowPending,
    pendingFavoriteBySlug,
    isOwnProfile,
    handleToggleFollow,
    handleToggleFavorite,
  } = useProfileData({
    username,
    isFavoritesTab,
  });

  return (
    <>
      <AppLayout activeNav="home">
        <div className="profile-page">
          <div className="user-info">
            <div className="container">
              <div className="row">
                <div className="col-xs-12 col-md-10 offset-md-1">
                  <img src={getAuthorImage(profile?.image ?? null)} className="user-img" alt={profile?.username}/>
                  <h4>{profile?.username}</h4>
                  <p>{profile?.bio ?? "No bio available."}</p>
                  <button
                    className={`btn btn-sm action-btn ${
                      profile?.following ? "btn-secondary" : "btn-outline-secondary"
                    }`}
                    type="button"
                    onClick={handleToggleFollow}
                    disabled={isFollowPending}
                  >
                    <i className="ion-plus-round" />
                    &nbsp; {profile?.following ? "Following" : "Follow"} {profile?.username}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <div className="articles-toggle">
                  <ul className="nav nav-pills outline-active">
                    <li className="nav-item">
                      <a className="nav-link active" href="">
                        My Articles
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="">
                        Favorited Articles
                      </a>
                    </li>
                  </ul>
                </div>

                {articles ? articles.map(article => (
                  <div className="article-preview" key={article.slug}>
                    <div className="article-meta">
                      <a href="/public#/profile/albertpai">
                        <img src={getAuthorImage(article?.author.image ?? null)} />
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
                      {article.tagList.length > 0 && (
                        <ul className="tag-list">
                          {article.tagList.map((tag:string) => (
                            <li className="tag-default tag-pill tag-outline" key={`${article.slug}-${tag}`}>
                              {tag}
                            </li>
                          ))}
                        </ul>
                      )}
                    </a>
                  </div>
                )) : ""}
              </div>
            </div>
          </div>
        </div>
      </AppLayout>
    </>
  );
}
