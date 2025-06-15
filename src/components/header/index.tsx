import { useState, useRef }from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import "./index.css"

const navItems = [
    { key: "home", label: "首页", path: "/" },
    { key: "frontend", label: "前端", path: "/frontend" },
    { key: "backend", label: "后端", path: "/backend" },
    { key: "mobile", label: "移动开发", path: "/mobile" },
];

const PageHeader: React.FC = () => {
    const navigate = useNavigate();
    const [activeNavKey, setActiveNavKey] = useState("home");
    const [searchValue, setSearchValue] = useState("");
    const searchTimer = useRef<NodeJS.Timeout | null>(null);

    // 点击导航栏
    const handleNavClick = (key: string, path: string) => {
        setActiveNavKey(key);
        navigate(path);
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
        <div className="page-header-container">
            <div className="logo">Tech Community</div>
            <div className="nav-items">
                {navItems.map(item => (
                    <div
                        key={item.key}
                        className={`nav-item ${activeNavKey === item.key ? 'active' : ''}`}
                        onClick={() => handleNavClick(item.key, item.path)}
                    >
                        {item.label}
                    </div>
                ))}
            </div>
            <div className="search-container">
                <Input
                    placeholder="搜索文章、话题、用户"
                    prefix={<SearchOutlined />}
                    value={searchValue}
                    onChange={(e) => handleSearch(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearchEnter()}
                    className="search-input"
                />
            </div>
        </div>
    )
}

export default PageHeader