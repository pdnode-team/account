'use client';
import React, { useState, useEffect } from 'react';
import {Alert, Backdrop, Paper} from '@mui/material';

export default function NetworkStatusChecker() {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    // 检查初始状态
    setOnline(navigator.onLine);

    // 定义事件处理函数
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    // 添加事件监听器
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // 清理函数：在组件卸载时移除监听器
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (online) {
    return null; // 在线时，不显示任何内容
  }

  // 离线时，显示 MUI Snackbar 通知
  return (
    <Backdrop
      sx={(theme) => ({color: '#fff', zIndex: theme.zIndex.drawer + 1})}
      open={online}
    >
      <Paper
        elevation={10} // 对应 shadow-2xl
        sx={{
          width: '100%',
          maxWidth: 500, // 对应 max-w-md (448px)
          padding: 10,
          borderRadius: 2, // 对应 rounded-xl
          border: '1px solid',
          borderColor: 'grey.200', // 对应 border-gray-100
          display: 'flex',             // 启用 Flexbox
          justifyContent: 'center',    // 水平居中
          alignItems: 'center',        // 垂直居中
          flexDirection: 'column',     // (可选) 确保子元素垂直堆叠
        }}
      >

        <Alert severity="error">You are offline. Please check your network connection.</Alert>
      </Paper>
    </Backdrop>
  );
}