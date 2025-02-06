import { useEffect, useState } from "react";
import articlesApi from "../api/articlesApi";
import ArticleForm from "../components/ArticleForm";
import Article from "../components/Article";

export default function HomePage() {
  const [articles, setArticles] = useState([]);

  async function fetchArticles() {
    const response = await articlesApi.getArticles();
    setArticles(response.reverse());
  }

  // 게시글 삭제
  const handleDelete = (id) => {
    setArticles((prevArticles) =>
      prevArticles.filter((article) => article.id !== id)
    );
  };

  useEffect(() => {
    fetchArticles();
  }, []); // isDeleted가 변경될 때마다 데이터 다시 가져오기

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
