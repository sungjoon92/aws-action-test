import { useEffect, useState } from "react";
import articlesApi from "../api/articlesApi";
import styles from "./Article.module.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Article({ article, isDetail = false, onDelete }) {
  const Navigate = useNavigate();

  const [isDeleted, setIsDeleted] = useState(false);
  async function deleteArticle(id) {
    const result = await Swal.fire({
      title: "정말로 삭제하시겠습니까?",
      text: "삭제 후에는 복구할 수 없습니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "네, 삭제합니다!",
      cancelButtonText: "취소",
    });

    if (result.isConfirmed) {
      try {
        const response = await articlesApi.deleteArticle(id);
        console.log("삭제 성공:", response);
        onDelete(id); // 부모 컴포넌트에서 상태 업데이트

        // 삭제 성공 알림
        await Swal.fire({
          title: "삭제 완료!",
          text: "게시글이 삭제되었습니다.",
          icon: "success",
        });
      } catch (error) {
        console.error("삭제 실패:", error);
        setIsDeleted(true);

        // 삭제 실패 알림
        await Swal.fire({
          title: "삭제 실패",
          text: "게시글을 삭제하는 중 문제가 발생했습니다.",
          icon: "error",
        });
      }
    }
  }

  useEffect(() => {}, [article.id, isDeleted]);

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
