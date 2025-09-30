'use client'
import {
  Alert,
  Avatar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
} from "@mui/material";
import {useEffect, useState} from "react";
import {account, avatars} from "@/lib/appwrite_general";


export default function ProfilePage() {
  const [open, setOpen] = useState(true);
  const [name, setName] = useState("")

  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);

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
        setEmail(user.email)
        setIsEmailVerified(user.emailVerification)
        console.log(user)
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
      {!open && <Paper
        elevation={10} // 对应 shadow-2xl
        sx={{
          width: '100%',
          maxWidth: 600, // 对应 max-w-md (448px)
          padding: 8, // 对应 p-8

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
        {!isEmailVerified && <Alert severity="warning" sx={{width: '100%', my: 2}}>Your email is not Verified</Alert>}
        {!isEmailVerified && <Alert severity="warning" sx={{width: '100%', my: 1}}>You must verify your email address to change your profile.</Alert>}

          <Box
            sx={{
              display: 'flex',          // 启用 Flexbox
              alignItems: 'center',     // 垂直居中对齐，让标签和输入框居中对齐
              gap: 2,                   // 标签和输入框之间的间距
              width: '100%',            // 确保这行占据 Paper 的全部宽度
              // maxWidth: 400,            // (可选) 限制这一行的最大宽度
              my: 4,                // 为这行添加垂直间距
            }}
          >

            {/* 2. 输入框 */}
            <TextField
              id="name"
              label="Name"
              placeholder="Please enter your name."
              variant="outlined"
              size="small" // (可选) 使输入框更紧凑
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth    // 使得输入框占据剩余的所有空间
              disabled={!isEmailVerified}
            />

            <Button disabled={!isEmailVerified}>Change</Button>
          </Box>
          <Box
            sx={{
              display: 'flex',          // 启用 Flexbox
              alignItems: 'center',     // 垂直居中对齐，让标签和输入框居中对齐
              gap: 2,                   // 标签和输入框之间的间距
              width: '100%',            // 确保这行占据 Paper 的全部宽度
              // maxWidth: 400,            // (可选) 限制这一行的最大宽度
              // my: 4,                // 为这行添加垂直间距
            }}
          >

            <TextField
              id="email"
              label="email"
              placeholder="Please enter your email."
              variant="outlined"
              size="small" // (可选) 使输入框更紧凑
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth    // 使得输入框占据剩余的所有空间
              disabled={!isEmailVerified}
            />
            <Button disabled={!isEmailVerified}>Change</Button>
          </Box>

      </Paper>}

    </Box>
  )
}