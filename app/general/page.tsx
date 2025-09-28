'use client'
import {Avatar, Backdrop, Box, CircularProgress, Paper} from "@mui/material";
import {useEffect, useState} from "react";
import {account, avatars} from "@/lib/appwrite_general";


export default function ProfilePage() {
  const [open, setOpen] = useState(true);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {

    const checkSession = async () => {
      try {
        const user = await account.get();
        // 仅在控制台打印用户对象，不做任何 UI 上的修改
        // console.log("Current user session:", user);
        setName(user.name)
        setAvatar(
          avatars.getInitials({
            name: user.name
          })
        )
        setOpen(false);
      } catch (e: unknown) {
        // 如果没有会话，仅打印信息
        // console.log("No active session found.");
        window.location.pathname = "/general/login";
      }
    };

    // 立即调用这个内部异步函数
    void checkSession();


  }, [])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: 'grey.50', // 对应 bg-gray-50
        p: 2,
      }}
    >
      <Backdrop
        sx={(theme) => ({color: '#fff', zIndex: theme.zIndex.drawer + 1})}
        open={open}
      >
        <Paper
          elevation={10} // 对应 shadow-2xl
          sx={{
            width: '100%',
            maxWidth: 448, // 对应 max-w-md (448px)
            padding: 8,
            borderRadius: 2, // 对应 rounded-xl
            border: '1px solid',
            borderColor: 'grey.200', // 对应 border-gray-100
            display: 'flex',             // 启用 Flexbox
            justifyContent: 'center',    // 水平居中
            alignItems: 'center',        // 垂直居中
            flexDirection: 'column',     // (可选) 确保子元素垂直堆叠
          }}
        >
          Checking the session...

          <CircularProgress color="inherit"/>
        </Paper>
      </Backdrop>
      {/* 登录卡片：使用 Paper 替换 div */}
      {!open &&  <Paper
        elevation={10} // 对应 shadow-2xl
        sx={{
          width: '100%',
          maxWidth: 448, // 对应 max-w-md (448px)
          padding: 4, // 对应 p-8
          borderRadius: 2, // 对应 rounded-xl
          border: '1px solid',
          borderColor: 'grey.200', // 对应 border-gray-100
          display: 'flex',             // 启用 Flexbox
          justifyContent: 'center',    // 水平居中
          alignItems: 'center',        // 垂直居中
          flexDirection: 'column',     // (可选) 确保子元素垂直堆叠
        }}
      >
        {name && <Avatar src={avatar} sx={{width: 56, height: 56}}/>}
      </Paper>}

    </Box>
  )
}