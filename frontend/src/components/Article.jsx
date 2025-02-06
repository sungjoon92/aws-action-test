import { useEffect, useState } from "react";
import articlesApi from "../api/articlesApi";
import styles from "./Article.module.css";
import { useNavigate } from "react-router-dom";

export default function Article({ article, isDetail = false, onDelete }) {
  const Navigate = useNavigate();

  async function deleteArticle(id) {
    if (confirm("정말로 삭세하시겠습니까?")) {
      try {
        const response = await articlesApi.deleteArticle(id);
        console.log("삭제 성공:", response);
        onDelete(id); // 부모 컴포넌트에서 삭제 후 상태 업데이트
      } catch (error) {
        console.error("삭제 실패:", error);
      }
    } else {
      return false;
    }
  }

  useEffect(() => {}, [article.id]);

  return (
    <div className={styles.articlesContainer}>
      <h2
        onClick={() => {
          Navigate(`/article/${article.id}`);
        }}
        className={`${styles.articleTitle} ${!isDetail && styles.pointer}`}
      >
        {article.title}
      </h2>
      {isDetail && <p className={styles.articleContent}>{article.content}</p>}
      {!isDetail && (
        <button
          className={styles.deleteButton}
          onClick={() => deleteArticle(article.id)}
        >
          삭제
        </button>
      )}
    </div>
  );
}
