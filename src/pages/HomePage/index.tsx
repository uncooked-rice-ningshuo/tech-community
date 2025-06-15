import { useState } from "react";
import { Carousel, Tabs, List, Tooltip, Avatar, Tag } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import "./index.css";

interface CarouselItem {
  id: number;
  title: string;
  image: string;
  link: string;
}

interface Article {
  id: number;
  title: string;
  content: string;
  author: string;
  time: string;
  image?: string;
  category: string;
}

const carouselItems: CarouselItem[] = [
  {
    id: 1,
    title: "Unite Shanghai 2024",
    image: "/images/VCG41N1854360311.jpg",
    link: "/article/1"
  },
  {
    id: 2,
    title: "技术社区年度盛会",
    image: "/images/VCG211555991086.jpg",
    link: "/article/2"
  },
  {
    id: 3,
    title: "前端技术发展趋势",
    image: "/images/VCG211567890395.jpg",
    link: "/article/3"
  },
];

// 模拟数据
const mockArticles: Article[] = [
  {
    id: 1,
    title: "Unite Shanghai 2024，我们回来了",
    content: "Unite Shanghai 2024将于7月23-25日在上海举行，这是一场技术盛会，将有来自全球的开发者参与。本次大会将围绕游戏开发、AR/VR、人工智能等多个主题展开讨论。",
    author: "Unity官方",
    time: "2024-07-01",
    image: "/images/unite.svg",
    category: "技术大会"
  },
  {
    id: 2,
    title: "工程师成长之路",
    content: "从初级工程师到高级工程师，需要经历哪些成长？本文将分享一位资深工程师的成长经验和技术积累。",
    author: "技术先锋",
    time: "2024-06-28",
    category: "职业成长"
  },
  {
    id: 3,
    title: "React 18新特性详解",
    content: "React 18带来了哪些新特性？如何利用这些特性提升应用性能？本文将详细介绍React 18的并发渲染、自动批处理等特性。",
    author: "React专家",
    time: "2024-06-25",
    image: "/images/react.svg",
    category: "前端技术"
  },
  {
    id: 4,
    title: "TypeScript高级类型体操",
    content: "TypeScript的类型系统非常强大，本文将介绍一些高级类型技巧，帮助你更好地利用TypeScript进行开发。",
    author: "TS爱好者",
    time: "2024-06-20",
    category: "前端技术"
  },
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTabKey, setActiveTabKey] = useState("hot");

  const handleTabChange = (key: string) => {
    setActiveTabKey(key);
  }

  const handleArticleClick = (id: number) => {
    navigate(`/article/${id}`);
  }

  return (
    <div className="home-container">
      <div className="row-one">
        <div className="row-one-container">
          <div className="carousel">
            <Carousel autoplay autoplaySpeed={5000} dots={true} effect="fade">
              {carouselItems.map(item => (
                <div key={item.id} onClick={() => navigate(item.link)}>
                  <div className="carousel-item" style={{ backgroundImage: `url(${item.image})` }}>
                    <div className="carousel-content">
                      <h2>{item.title}</h2>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
          <div className="carousel-column">
            {carouselItems.map(item => (
              <div key={item.id} onClick={() => navigate(item.link)}>
                <div className="carousel-column-item" style={{ backgroundImage: `url(${item.image})` }}>
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
      <div className="tip">
        <div className="tip-content">
          <div className="tip-title">Tip</div>
          <div className="tip-description">是临时起意是蓄谋已久 是年轻自由而热烈的我们 凌晨6点的日出又怎么不算浪漫呢</div>
        </div>
        <div className="tip-button">
          查看更多
        </div>
      </div>
      <div className="row-two">
        <div className="row-two-container">
          <div className="row-two-left">
            <div className="main-container">
              <Tabs
                className="main-tabs"
                activeKey={activeTabKey}
                onChange={handleTabChange}
                items={[
                  { key: 'hot', label: '热门' },
                  { key: 'new', label: '最新' },
                ]}
              />

              <div className="article-list">
                <List
                  itemLayout="vertical"
                  size="large"
                  dataSource={mockArticles}
                  renderItem={(item) => (
                    <List.Item
                      key={item.id}
                      className="article-item"
                      onClick={() => handleArticleClick(item.id)}
                    >
                      
                    </List.Item>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="row-two-right"></div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
