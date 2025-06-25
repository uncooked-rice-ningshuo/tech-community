# Tech Community 技术社区项目文档

## 1. 项目概述

Tech Community 是一个基于 React 和 TypeScript 开发的技术社区网站，旨在为技术爱好者提供一个分享知识、交流经验的平台。该项目采用现代前端技术栈，实现了响应式设计，确保在不同设备上都能提供良好的用户体验。

![image-20250625091834820](C:/Users/HUAWEI/AppData/Roaming/Typora/typora-user-images/image-20250625091834820.png)

## 2. 技术栈

- **前端框架**：React 18
- **开发语言**：TypeScript
- **UI 组件库**：Ant Design 5.17.4
- **路由管理**：React Router 6.23.1
- **HTTP 请求**：Axios 1.7.2
- **构建工具**：React Scripts 5.0.1

## 3. 项目结构

```
├── public/                 # 静态资源目录
│   ├── images/             # 图片资源
│   ├── index.html          # HTML 模板
│   └── manifest.json       # PWA 配置
├── src/                    # 源代码目录
│   ├── components/         # 公共组件
│   │   ├── 404/            # 404 页面组件
│   │   ├── carousel/       # 轮播图组件
│   │   └── header/         # 页面头部组件
│   ├── layout/             # 布局组件
│   ├── mock/               # 模拟数据
│   │   └── articles.json   # 文章数据
│   ├── pages/              # 页面组件
│   │   ├── Article/        # 文章详情页
│   │   └── HomePage/       # 首页
│   ├── router/             # 路由配置
│   ├── utils/              # 工具函数
│   ├── App.tsx             # 应用入口组件
│   └── index.tsx           # 应用渲染入口
└── package.json            # 项目依赖配置
```

## 4. 功能模块

### 4.1 布局组件 (Layout)

布局组件定义了整个应用的基本结构，包括页头、内容区和页脚。使用 Ant Design 的 Layout 组件实现，并通过 React Router 的 Outlet 组件渲染子路由内容。

```tsx
// 布局结构
<Layout>
  <Header>
    <PageHeader />
  </Header>
  <Content>
    <Outlet /> // 子路由内容渲染位置
  </Content>
  <Footer>Footer</Footer>
</Layout>
```

### 4.2 导航组件 (Header)

导航组件实现了网站的顶部导航栏，包括：

- 网站 Logo
- 导航菜单（首页、前端、后端、移动开发）
- 搜索框

导航组件具有响应式设计，在不同屏幕尺寸下会调整布局：

- 大屏幕：Logo、导航菜单和搜索框并排显示

![image-20250625091906924](C:/Users/HUAWEI/AppData/Roaming/Typora/typora-user-images/image-20250625091906924.png)

- 中等屏幕：调整导航项宽度和内边距

![image-20250625091930323](C:/Users/HUAWEI/AppData/Roaming/Typora/typora-user-images/image-20250625091930323.png)

- 小屏幕：隐藏搜索框，调整导航菜单布局

![image-20250625091954187](C:/Users/HUAWEI/AppData/Roaming/Typora/typora-user-images/image-20250625091954187.png)

- 超小屏幕：隐藏 Logo，只显示导航菜单

![image-20250625092009295](C:/Users/HUAWEI/AppData/Roaming/Typora/typora-user-images/image-20250625092009295.png)

### 4.3 首页 (HomePage)

![image-20250625091834820](C:/Users/HUAWEI/AppData/Roaming/Typora/typora-user-images/image-20250625091834820.png)

首页是网站的主要入口，包含以下功能模块：

1. **轮播图区域**：展示热门文章或活动的大图轮播
2. **提示区域**：显示特定提示信息
3. **文章列表区域**：
   - 分为"热门"和"最新"两个标签页
   - 文章列表展示文章标题、作者、发布时间、分类和内容摘要
   - 文章列表项可点击跳转到文章详情页
   - 响应式设计，在移动端调整图片位置
4. **侧边栏**：
   - 文章排行榜
   - "换一换"功能，随机展示不同文章

首页实现了响应式设计，在不同屏幕尺寸下会调整布局和元素大小，确保良好的用户体验。

### 4.4 文章详情页 (Article)

![image-20250625092118388](C:/Users/HUAWEI/AppData/Roaming/Typora/typora-user-images/image-20250625092118388.png)

![image-20250625092054184](C:/Users/HUAWEI/AppData/Roaming/Typora/typora-user-images/image-20250625092054184.png)

文章详情页展示单篇文章的完整内容，包括：

1. **文章头部**：标题、作者信息、发布时间和分类
2. **文章内容**：完整的文章正文
3. **文章导航**：上一篇/下一篇文章导航按钮
4. **相关文章**：展示同类别的其他文章

文章详情页同样实现了响应式设计，在不同屏幕尺寸下会调整布局和元素大小。

## 5. 数据管理

### 5.1 模拟数据

项目使用 `mock/articles.json` 文件模拟文章数据，包含多篇文章的详细信息：

```json
{
  "total": 10,
  "list": [
    {
      "id": 1,
      "title": "Unite Shanghai 2024，我们回来了",
      "content": "...",
      "author": "Unity 官方",
      "time": "2024-07-01",
      "image": "/images/VCG41N1854360311.jpg",
      "category": "技术大会"
    },
    // 更多文章...
  ]
}
```

### 5.2 数据获取与展示

- **首页**：从模拟数据中获取文章列表，并根据不同标签页（热门/最新）展示
- **文章详情页**：根据 URL 参数 `id` 从模拟数据中查找对应文章
- **相关文章**：根据当前文章的分类，从模拟数据中筛选同类别的其他文章

## 6. 响应式设计

项目实现了全面的响应式设计，通过媒体查询适配不同屏幕尺寸：

- **大屏幕** (> 1200px)：完整布局，最大宽度 1200px

![image-20250625092202449](C:/Users/HUAWEI/AppData/Roaming/Typora/typora-user-images/image-20250625092202449.png)

- **中等屏幕** (992px - 1200px)：调整容器宽度和内边距

![image-20250625092217116](C:/Users/HUAWEI/AppData/Roaming/Typora/typora-user-images/image-20250625092217116.png)

- **平板** (768px - 992px)：调整导航布局，缩小元素间距

![image-20250625092226606](C:/Users/HUAWEI/AppData/Roaming/Typora/typora-user-images/image-20250625092226606.png)

- **手机** (< 768px)：单列布局，调整图片位置，隐藏部分次要元素

![image-20250625092236772](C:/Users/HUAWEI/AppData/Roaming/Typora/typora-user-images/image-20250625092236772.png)

## 7. 项目运行

### 7.1 开发环境

```bash
npm install   # 安装依赖
npm start     # 启动开发服务器
```

### 7.2 生产环境

```bash
npm run build  # 构建生产版本
```

## 8. 未来扩展

1. **后端集成**：替换模拟数据，连接真实后端 API
2. **用户系统**：实现用户注册、登录和个人中心
3. **评论系统**：为文章添加评论和点赞功能
4. **内容管理**：实现文章发布和编辑功能
5. **搜索优化**：实现全文搜索功能

## 9. 总结

Tech Community 技术社区项目是一个基于现代前端技术栈的响应式网站，通过精心的设计和实现，为用户提供了良好的浏览体验。项目结构清晰，代码组织合理，具有良好的可维护性和可扩展性，为后续功能迭代提供了坚实的基础。
        