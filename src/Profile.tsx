import AppLayout from "./AppLayout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiClient } from "./api/client";
import { Article, ProfileType } from "./api/types";
import { formatPublicationDate, getAuthorImage } from "./utils/articlePresentation";

export default function Profile() {
  const { username } = useParams<{ username: string }>();

  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [articles, setArticles] = useState<Article[] | null>([]);

  useEffect(() => {

    apiClient.getProfile(username).then(
      (response) => {
        console.log(response.profile);
        setProfile(response.profile);
      }
    );

  },[]);

  useEffect(() => {
    apiClient.getArticles({
      limit: 20,
      offset: 0,
      author: username
    }).then((response) => {
      setArticles(response.articles);
      console.log(response.articles);
    })
  }, []);

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
                  <button className="btn btn-sm btn-outline-secondary action-btn">
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
                      <a href="/#/profile/albertpai">
                        <img src={getAuthorImage(article?.author.image ?? null)} />
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
                      {article.tagList.length > 0 && (
                        <ul className="tag-list">
                          {article.tagList.map(tag => (
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
