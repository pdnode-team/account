'use client'
import React from 'react';
import NextLink from 'next/link';
import {
  Box,
  Paper,
  Typography,
  Button,
  Stack,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Dialog
} from '@mui/material';

export default function Home() {
  const [open, setOpen] = React.useState(true);
  const [generalLoading, setGeneralLoading] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    // 外部容器：使用 Box 替换 div，实现全屏居中
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: 'grey.50', // 对应 bg-gray-100
        p: 2, // 确保有内边距，防止内容贴边
      }}
    >
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"No GOOGLE translate"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Our website may crash when using Google Translate or other translations.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/*<Button onClick={handleClose}>Disagree</Button>*/}
          <Button onClick={handleClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
      {/* 中间的卡片：使用 Paper 替换 div，实现阴影、圆角和背景 */}
      <Paper
        elevation={10} // 对应 shadow-2xl，MUI 阴影级别
        sx={{
          padding: 5, // 对应 p-10
          borderRadius: 2, // 对应 rounded-md
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          // w-fit 效果，让 Paper 宽度自适应内容
          width: 'fit-content',
        }}
      >
        {/* 标题 */}
        <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Pdnode Account
        </Typography>

        {/* 副标题/描述 */}
        <Typography variant="body1" gutterBottom sx={{ mb: 3 }}>
          Please select your account type
        </Typography>

        {/* 按钮堆栈：使用 Stack 替换 space-y-4，实现垂直间距 */}
        <Stack spacing={2} direction="column" alignItems="stretch" sx={{ width: '100%' }}>

          {/* 1. General 按钮 - 使用 NextLink 和 Button 结合实现路由跳转 */}
          <Button
            component={NextLink} // 告诉 MUI Button 使用 NextLink 组件作为根元素
            href="/general"
            onClick={() => setGeneralLoading(true)}
            variant="outlined" // 对应 border border-gray-400
            color="inherit" // 对应 text-gray-800
            sx={{
              py: 1.5, // 对应 py-2
              borderColor: 'grey.400',
              '&:hover': {
                backgroundColor: 'grey.100', // 对应 hover:bg-gray-100
                borderColor: 'grey.500',
              },
            }}
            loading={generalLoading}
          >
            General
          </Button>

          {/* 2. Chat(Enterprise) 按钮 */}
          <Button
            variant="outlined"
            color="inherit"
            disabled // 假设这个按钮暂时不可用
            sx={{
              py: 1.5,
              borderColor: 'grey.400',
              '&:hover': {
                backgroundColor: 'grey.100',
                borderColor: 'grey.500',
              },
            }}
          >
            Chat(Enterprise)
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}