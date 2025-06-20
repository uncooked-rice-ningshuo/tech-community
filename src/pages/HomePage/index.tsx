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
  const navigate = useNavigate(); // 导航钩子
  const [activeTabKey, setActiveTabKey] = useState("hot"); // 活动标签的键值
  const [searchValue, setSearchValue] = useState(""); // 搜索框的值
  const [rankArticles, setRankArticles] = useState(mockArticles.list.slice(0, 5)); // 模拟文章排行数据
  const searchTimer = useRef<NodeJS.Timeout | null>(null); // 搜索定时器

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

  // 换一换功能
  const handleRefreshRank = () => {
    // 随机打乱文章列表顺序
    const shuffled = [...mockArticles.list].sort(() => 0.5 - Math.random());
    setRankArticles(shuffled.slice(0, 5));
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
          <div className="tip-description">是临时起意是蓄谋已久 是年轻自由而激烈的我们 凌晨6点的日出又怎么不算浪漫呢</div>
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
                        item.image && window.innerWidth > 768 ? (
                          <div className="article-image">
                            <img alt={item.title} src={item.image} />
                          </div>
                        ) : null
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
                      <div className="article-content-bf">{item.content}</div>
                      {item.image && window.innerWidth <= 768 ? (
                        <div className="article-image">
                          <img alt={item.title} src={item.image} />
                        </div>
                      ) : null}
                    </List.Item>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="row-two-right">
            <div className="right-container">
              <div className="hot-article-list">
                <div className="article-rank-header">
                  <div className="article-rank-icon">📃</div>
                  <div className="article-rank-title">文章榜</div>
                  <div className="article-rank-action" onClick={handleRefreshRank}>🔄 换一换</div>
                </div>
                <div className="article-rank-list">
                  {rankArticles.map((article, index) => (
                    <div 
                      key={article.id} 
                      className="article-rank-item"
                      onClick={() => handleArticleClick(article.id)}
                    >
                      <div className="article-rank-item-title">{article.title}</div>
                    </div>
                  ))}
                </div>
                <div className="article-rank-footer">
                  <div className="article-rank-more">查看更多 ›</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
