import styles from "./ArticleForm.module.css";
import { useState } from "react";
import articlesApi from "../api/articlesApi";
import { useRef } from "react";
const INITIAL_FORM_DATA = {
  title: "",
  content: "",
  file: null,
};

export default function ArticleForm({ fetchArticles }) {
  const [inputData, setInputData] = useState(INITIAL_FORM_DATA);
  const fileInputRef = useRef(null); // 파일 input 요소에 대한 참조

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setInputData(INITIAL_FORM_DATA);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputData.title || !inputData.content) {
      alert("제목 또는 내용 입력값은 필수입니다");
    } else if (!inputData.file) {
      alert("파일이 존재하지 않습니다.");
      return;
    }

    const formData = new FormData(); // FormData 객체 생성
    formData.append("title", inputData.title);
    formData.append("content", inputData.content);

    // 선택된 이미지 파일이 있으면 FormData 객체에 추가
    if (inputData.file) {
      formData.append("file", inputData.file);
    }

    try {
      await articlesApi.postArticle(formData);
      fetchArticles();
      resetForm();
    } catch (error) {
      console.error("ERROR : ", error);
    }
  };

  // 파일 업로드
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // 선택된 첫 번째 파일 가져오기
    setInputData((prev) => ({ ...prev, file })); // 파일 state 업데이트
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
      <input
        type="file"
        name="file"
        id="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*" // 이미지 파일만 선택 가능하도록 제한
      />
    </div>
  );
}
