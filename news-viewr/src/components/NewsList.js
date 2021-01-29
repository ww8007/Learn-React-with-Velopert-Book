import React from 'react';
import styled from 'styled-components';
import NewsItem from './NewsItem';
import axios from 'axios';
import usePromise from '../lib/usePromise';
const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const NewsList = ({ category }) => {
  const [loading, response, error] = usePromise(() => {
    const query = category === 'all' ? '' : `&category=${category}`;
    return axios.get(
      `http://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=ecdd1223d3d44bc98e30d948cdf8ec7f`
    );
  }, [category]);

  // 대기 중
  if (loading) {
    return <NewsListBlock>대기중...</NewsListBlock>;
  }
  // 아직 articles 값 대기중
  if (!response) {
    return null;
  }
  // 에러발생
  if (error) {
    return <NewsListBlock>에러발생</NewsListBlock>;
  }
  // response 값 유효
  const { articles } = response.data;
  return (
    <NewsListBlock>
      {articles.map((article) => (
        <NewsItem key={article.url} article={article}></NewsItem>
      ))}
    </NewsListBlock>
  );
};

export default NewsList;
