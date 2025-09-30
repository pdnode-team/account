'use client'
import {useEffect, useState} from 'react';
import {Box, Paper, Typography, TextField, Button, Alert, Link, Stack, Checkbox, FormControlLabel} from "@mui/material";
import {FormEvent} from 'react'; // 导入 FormEvent 类型
import {account} from '@/lib/appwrite_general'
import {isValidEmail} from "@/lib/email";
import {ID} from "appwrite"

export default function RegisterPage() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState('');
  const [isAgree, setIsAgree] = useState<boolean>(false);
  const [name, setName] = useState('');

  useEffect(() => {

    const checkSession = async () => {
      try {
        await account.get();
        window.location.pathname = "/general";
      } catch (e: unknown) {

      }
    };

    // 立即调用这个内部异步函数
    void checkSession();


  }, [])

  // 修复 TypeScript 错误：明确事件类型为 React.FormEvent<HTMLFormElement>
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isAgree) {
      setError('Please agree User Agreement and Privacy Agreement.');
      return;
    }

    setDisabled(true)
    setDisabled(true)

    if (!email || !password || !name) {
      setError('Please enter email and password and name');
      setDisabled(false)

      return;
    }

    if (password.length < 8) {
      setDisabled(false)
      setError('Password must be at least 8 characters');
      return;
    }

    if (!isValidEmail(email)) {
      setDisabled(false)
      setError('Invalid email');
      return
    }

    try {
      const result = await account.create({
        userId: ID.unique(),
        name,
        email,
        password
      });

      console.log(result);

      window.location.pathname = '/general';
    } catch (e: unknown) { // ✅ 修复点 1: 将类型改为 unknown
      setDisabled(false)

      if (e instanceof Error) { // ✅ 修复点 2: 检查它是否是 Error 实例
        // 现在，在 if 块内，e 已经被缩小为 Error 类型，可以安全地访问 message
        setError(e.message);
      } else {
        // 处理非 Error 类型的抛出值（例如，如果有人 throw "Something went wrong"）
        setError("An unknown error occurred during register.");
      }
    }

  };

  return (

    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: 'grey.50',
        p: 2,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          width: '100%',
          maxWidth: 448,
          padding: 4,
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'grey.200',
        }}
      >
        <Typography variant="h4" component="h1" align="center" gutterBottom sx={{fontWeight: 'bold'}}>
          Register
        </Typography>
        {error && (<Alert severity="error" sx={{mb: 3}}>{error}</Alert>)}



        <Alert severity="info" sx={{mb: 3}}>
          You are logging in to the &quot;general&quot; account. <Link href="/">Back</Link>
        </Alert>


        <Box component="form" onSubmit={handleSubmit} sx={{mt: 1}}>
          <Stack spacing={3}>

            <TextField
              value={name}
              onChange={e => setName(e.target.value)}
              margin="normal"
              required
              fullWidth
              name="name"
              label="name"
              type="text"
              id="name"
              placeholder="Please enter your name"
              variant="outlined"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoFocus
              placeholder="Please enter your email address"
              variant="outlined"
            />


            <TextField
              value={password}
              onChange={e => setPassword(e.target.value)}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              placeholder="Please enter your password"
              variant="outlined"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained" // 蓝色背景
              color="primary"
              size="large"
              disabled={disabled}
              loading={disabled}
              sx={{mt: 3, mb: 2}}
            >
              Register
            </Button>

            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    // 放大/缩小 Checkbox 内部的 SVG 图标
                    '& .MuiSvgIcon-root': {fontSize: 20}
                  }}
                  value={isAgree}
                  onChange={(e) => setIsAgree(e.target.checked)}
                />
              }
              // 将标签文本放在 Typography 中，以明确控制其大小
              label={
                <Typography
                  component="span" // 使用 span 确保所有内容在同一行
                  sx={{ fontSize: 'inherit' }} // 继承 Box 的字体大小
                >
                  I have read and agreed to the{' '}
                  <Link
                    href="https://pdnode.com/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    User Agreement
                  </Link>
                  {' '}and{' '}
                  <Link
                    href="https://pdnode.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy Agreement.
                  </Link>
                </Typography>

              }
            />

          </Stack>
        </Box>


        <Box sx={{textAlign: 'center', mt: 2}}>

          <Link href="/general/login" variant="body2" color="primary">
            login?
          </Link>
        </Box>
      </Paper>
    </Box>
  );
}
