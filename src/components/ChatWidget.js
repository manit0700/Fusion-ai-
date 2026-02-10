import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Fab,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';

const ChatWidget = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi! Ask me anything about Manit’s background, projects, or skills.',
    },
  ]);
  const [contactStep, setContactStep] = useState(null);
  const [contactData, setContactData] = useState({ name: '', email: '', phone: '', notes: '' });
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open, loading]);

  const sendContact = async (payload) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Unable to send contact info.');
      }
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Thanks! Your info was sent to Manit.' },
      ]);
    } catch (err) {
      setError(err.message || 'Unable to send contact info.');
    }
  };

  const startContactFlow = () => {
    setContactStep('name');
    setContactData({ name: '', email: '', phone: '', notes: '' });
    setMessages((prev) => [
      ...prev,
      { role: 'assistant', content: 'Sure — what’s your name?' },
    ]);
  };

  const handleContactInput = async (value) => {
    const text = value.trim();
    if (!text) return;

    if (contactStep === 'name') {
      setContactData((prev) => ({ ...prev, name: text }));
      setContactStep('email');
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Thanks! What’s your email?' }]);
      return;
    }

    if (contactStep === 'email') {
      const valid = /.+@.+\..+/.test(text);
      if (!valid) {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: 'That email looks invalid. Please try again.' },
        ]);
        return;
      }
      setContactData((prev) => ({ ...prev, email: text }));
      setContactStep('phone');
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Got it. Your phone number?' }]);
      return;
    }

    if (contactStep === 'phone') {
      setContactData((prev) => ({ ...prev, phone: text }));
      setContactStep('notes');
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Any notes? (optional) You can type or say “skip”.' },
      ]);
      return;
    }

    if (contactStep === 'notes') {
      const notes = text.toLowerCase() === 'skip' ? '' : text;
      const payload = { ...contactData, notes, message: notes };
      setContactStep(null);
      await sendContact(payload);
      return;
    }
  };

  const sendMessage = async () => {
    const question = input.trim();
    if (!question || loading) return;

    const nextMessages = [...messages, { role: 'user', content: question }];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);
    setError('');

    try {
      const wantsContact = /contact|reach|hire|call|email|message|connect/i.test(question);
      if (!contactStep && wantsContact) {
        setLoading(false);
        startContactFlow();
        return;
      }

      if (contactStep) {
        setLoading(false);
        await handleContactInput(question);
        return;
      }

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Something went wrong.');
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      setError(err.message || 'Unable to send message.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage();
  };

  return (
    <>
      {!open && (
        <Fab
          color="primary"
          aria-label="Chat"
          onClick={() => setOpen(true)}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 1300,
            boxShadow: '0 0 30px rgba(0, 229, 255, 0.35)',
          }}
        >
          <ChatBubbleOutlineIcon />
        </Fab>
      )}

      {open && (
        <Paper
          elevation={0}
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            width: isMobile ? 'calc(100% - 32px)' : 360,
            height: isMobile ? '70vh' : 520,
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1400,
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(18px)',
          }}
        >
          <Box
            sx={{
              px: 2,
              py: 1.5,
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Ask about Manit
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Portfolio assistant
              </Typography>
            </Box>
            <Stack direction="row" spacing={1} alignItems="center">
              <Button
                size="small"
                variant="outlined"
                onClick={startContactFlow}
                sx={{ borderColor: 'rgba(0, 229, 255, 0.5)' }}
              >
                Contact
              </Button>
              <IconButton onClick={() => setOpen(false)} aria-label="Close chat">
                <CloseIcon />
              </IconButton>
            </Stack>
          </Box>

          <Box
            ref={scrollRef}
            sx={{
              flex: 1,
              overflowY: 'auto',
              px: 2,
              py: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5,
            }}
          >
            {messages.map((msg, index) => (
              <Box
                key={`${msg.role}-${index}`}
                sx={{
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  px: 1.5,
                  py: 1,
                  borderRadius: 2,
                  backgroundColor:
                    msg.role === 'user'
                      ? 'rgba(0, 229, 255, 0.2)'
                      : 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                  {msg.content}
                </Typography>
              </Box>
            ))}
            {loading && (
              <Stack direction="row" spacing={1} alignItems="center">
                <CircularProgress size={16} />
                <Typography variant="caption" color="text.secondary">
                  Thinking…
                </Typography>
              </Stack>
            )}
            {error && (
              <Typography variant="caption" color="error">
                {error}
              </Typography>
            )}
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              p: 2,
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              gap: 1,
            }}
          >
            <TextField
              fullWidth
              size="small"
              placeholder={
                contactStep
                  ? contactStep === 'name'
                    ? 'Your name'
                    : contactStep === 'email'
                    ? 'Your email'
                    : contactStep === 'phone'
                    ? 'Your phone'
                    : 'Notes (optional)'
                  : 'Ask about projects, skills, or experience'
              }
              value={input}
              onChange={(e) => setInput(e.target.value)}
              InputProps={{
                sx: {
                  backgroundColor: 'rgba(10, 15, 28, 0.6)',
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{ minWidth: 48, px: 1.5 }}
            >
              <SendIcon fontSize="small" />
            </Button>
          </Box>
        </Paper>
      )}
    </>
  );
};

export default ChatWidget;
