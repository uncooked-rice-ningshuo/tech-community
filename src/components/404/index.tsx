import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle="此页面不存在"
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          返回
        </Button>
      }
    />
  );
};

export default NotFoundPage;
