import React from "react";

export default function NewsItem({ data }) {
  const { title, description, urlToImage, url, publishedAt, content } = data;

  return (
    <div className="news-item">
      <div className="image">
        <img src={urlToImage} alt="News" />
      </div>
      <div className="content">
        <h3 className="title">{title}</h3>
        <p className="description">{description}</p>
        <p className="published">Published: {publishedAt}</p>
        <p className="text">{content}</p>
        <a href={url} className="link" target="_blank" rel="noreferrer">
          Read More
        </a>
      </div>
    </div>
  );
}
