import { useState, useRef } from "react";
import { Carousel, Tabs, List, Tooltip, Avatar, Tag, Input } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchOutlined } from '@ant-design/icons';
import "./index.css";
import mockArticlesData from "../../mock/articles.json";

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
const mockArticles: {
  total: number;
  list: Article[];
} = mockArticlesData;

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTabKey, setActiveTabKey] = useState("hot");
  const [searchValue, setSearchValue] = useState("");
  const searchTimer = useRef<NodeJS.Timeout | null>(null);

  const handleTabChange = (key: string) => {
    setActiveTabKey(key);
  }

  const handleArticleClick = (id: number) => {
    navigate(`/article/${id}`);
  }

  // 设定搜索框的值
  const handleSearch = (value: string) => {
    setSearchValue(value);

    // 防抖处理
    if (searchTimer.current) {
        clearTimeout(searchTimer.current);
    }

    searchTimer.current = setTimeout(() => {
        // 执行搜索逻辑
        // console.log("执行搜索逻辑", value);
    }, 300);
  }

  // 回车搜索
  const handleSearchEnter = () => {
    // 执行搜索逻辑
    console.log("执行搜索逻辑", searchValue);
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
              <div className="tabs-container">
                <Tabs
                  className="tabs"
                  activeKey={activeTabKey}
                  onChange={handleTabChange}
                  items={[
                    { key: 'hot', label: '热门' },
                    { key: 'new', label: '最新' },
                  ]}
                />

                <div className="article-search">
                  <Input 
                    prefix={<SearchOutlined />}
                    className="article-search-input"
                    placeholder="搜索文章" 
                    value={searchValue}
                    onChange={(e) => handleSearch(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearchEnter()}
                  />
                </div>
              </div>

              <div className="article-list">
                <List
                  itemLayout="vertical"
                  size="large"
                  dataSource={mockArticles.list}
                  renderItem={(item) => (
                    <List.Item
                      key={item.id}
                      className="article-item"
                      onClick={() => handleArticleClick(item.id)}
                      extra={
                        item.image && (
                          <div className="article-image">
                            <img alt={item.title} src={item.image} />
                          </div>
                        )
                      }
                    >
                      <div className="article-title">{item.title}</div>
                      <div className="article-meta">
                        <div className="article-author">
                          <Avatar size="small" src={item.image} />
                          <span className="article-author-name">{item.author}</span>
                        </div>
                        <div className="article-time">{item.time}</div>
                        <div className="article-category">
                          <Tag color="blue">{item.category}</Tag>
                        </div>
                      </div>
                      <div className="article-content">{item.content}</div>
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
