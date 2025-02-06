import styles from "./ArticleForm.module.css";
import { useState } from "react";
import articlesApi from "../api/articlesApi";

const INITIAL_FORM_DATA = {
  title: "",
  content: "",
  file: null,
};

export default function ArticleForm({ fetchArticles }) {
  const [inputData, setInputData] = useState(INITIAL_FORM_DATA);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setInputData(INITIAL_FORM_DATA);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputData.title.length == 0 || inputData.content.length == 0) {
      alert("제목 또는 내용 입력값은 필수입니다");
      return false;
    }
    try {
      await articlesApi.postArticle(inputData);
      fetchArticles();
      resetForm();
    } catch (error) {
      console.error("ERROR : ", error);
    }
  };

  return (
    <div className={styles.articleFormContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          id="title"
          name="title"
          value={inputData.title}
          onChange={handleFormChange}
          placeholder="title 입력"
          className={styles.input}
        />
        <textarea
          id="content"
          name="content"
          value={inputData.content}
          onChange={handleFormChange}
          placeholder="content 입력"
          className={styles.textarea}
        />
        <button type="submit" className={styles.button}>
          글쓰기
        </button>
      </form>
    </div>
  );
}
