import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Avatar, Tag, Button, Skeleton, Typography } from "antd";
import { LeftOutlined, RightOutlined, UserOutlined } from "@ant-design/icons";
import mockArticlesData from "../../mock/articles.json";
import "./index.css";

interface Article {
  id: number;
  title: string;
  content: string;
  author: string;
  time: string;
  image?: string;
  category: string;
}

const { Title, Paragraph } = Typography;

const Article: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const articleId = Number(id);
      const foundArticle = mockArticlesData.list.find(item => item.id === articleId);
      
      if (foundArticle) {
        setArticle(foundArticle);
        const related = mockArticlesData.list
          .filter(item => item.category === foundArticle.category && item.id !== articleId)
          .slice(0, 3);
        setRelatedArticles(related);
      } else {
        navigate("/404");
      }
      
      setLoading(false);
    }, 500);
  }, [id, navigate]);

  const handlePrevArticle = () => {
    const currentIndex = mockArticlesData.list.findIndex(item => item.id === Number(id));
    if (currentIndex > 0) {
      navigate(`/article/${mockArticlesData.list[currentIndex - 1].id}`);
    }
  };

  const handleNextArticle = () => {
    const currentIndex = mockArticlesData.list.findIndex(item => item.id === Number(id));
    if (currentIndex < mockArticlesData.list.length - 1) {
      navigate(`/article/${mockArticlesData.list[currentIndex + 1].id}`);
    }
  };

  if (loading) {
    return (
      <div className="article-loading">
        <Skeleton active title={{ width: '50%' }} paragraph={{ rows: 10 }} />
      </div>
    );
  }

  if (!article) {
    return <div className="article-container">文章不存在</div>;
  }

  return (
    <div className="article">
      <div className="article-bg"></div>
      <div className="article-container">
        <div className="article-header">
          <Title level={2} className="article-title">{article.title}</Title>
          <div className="article-meta">
            <div className="article-author">
              <Avatar icon={<UserOutlined />} className="avatar" />
              {article.author}
            </div>
            <div className="article-time">{article.time}</div>
            <Tag color="blue" className="article-category">{article.category}</Tag>
          </div>
        </div>
        
        <div className="article-content">
          {article.content.split("。").map((paragraph, index) => (
            paragraph.trim() && (
              <Paragraph key={index}>{paragraph}。</Paragraph>
            )
          ))}
        </div>
        
        <div className="article-navigation">
          <Button 
            className="nav-button" 
            onClick={handlePrevArticle}
            disabled={mockArticlesData.list.findIndex(item => item.id === Number(id)) === 0}
          >
            <LeftOutlined /> 上一篇
          </Button>
          <Button 
            className="nav-button" 
            onClick={handleNextArticle}
            disabled={mockArticlesData.list.findIndex(item => item.id === Number(id)) === mockArticlesData.list.length - 1}
          >
            下一篇 <RightOutlined />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Article;
