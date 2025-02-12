import { useEffect, useState } from "react";
import articlesApi from "../api/articlesApi";
import ArticleForm from "../components/ArticleForm";
import Article from "../components/Article";

export default function HomePage() {
  const [articles, setArticles] = useState([]);

  async function fetchArticles() {
    const response = await articlesApi.getArticles();
    setArticles(response.reverse());

    console.log(response);
  }

  // 게시글 삭제
  const handleDelete = (id) => {
    setArticles((prevArticles) =>
      prevArticles.filter((article) => article.id !== id)
    );
  };

  useEffect(() => {
    fetchArticles();
  }, []);
  return (
    <div>
      <ArticleForm fetchArticles={fetchArticles}></ArticleForm>
      {articles.map((article) => {
        return (
          <Article
            key={article.id}
            article={article}
            isDetail={false}
            onDelete={handleDelete}
          ></Article>
        );
      })}
    </div>
  );
}
