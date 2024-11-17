"use client";

import { useState, useRef, useEffect } from "react";
import {
  Button,
  Box,
  Stack,
  Text,
  Input,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { X, Send, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { chakra } from "@chakra-ui/react";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useChat } from "ai/react";

const MotionBox = chakra(motion.div);

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  text: "Feel free to ask me anything about DeviceCare!",
  sender: "ai",
  timestamp: new Date(),
};

export function ChatWidget() {
  const {
    input,
    handleInputChange,
    handleSubmit: handleAISubmit,
    isLoading: aiLoading,
    messages: aiMessages,
    reload,
    setMessages: setAIMessages,
  } = useChat();
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [isMinimized, setIsMinimized] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isClosing, setIsClosing] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (aiMessages.length > 0) {
      const newMessages = aiMessages.map((msg) => ({
        id: msg.id,
        text: msg.content,
        sender: msg.role === "user" ? ("user" as const) : ("ai" as const),
        timestamp: new Date(),
      }));
      setMessages([WELCOME_MESSAGE, ...newMessages]);
    }
  }, [aiMessages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || aiLoading) return;

    const currentMessage = { role: "user", content: input };
    await handleAISubmit(e, {
      options: {
        body: {
          messages: [currentMessage],
        },
      },
    });
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsMinimized(true);
      setMessages([WELCOME_MESSAGE]);
      setAIMessages([]);
      setIsClosing(false);
    }, 200);
  };

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  return (
    <Box position="fixed" bottom="12px" right="12px" zIndex={50}>
      <Button
        size="lg"
        onClick={() => setIsMinimized(!isMinimized)}
        bg="#8223d2"
        color="white"
        _hover={{ bg: "#6a1ca8" }}
        borderRadius="full"
        width="56px"
        height="56px"
        padding={0}
      >
        <img
          src="https://d34csun8x058jd.cloudfront.net/images/asurion/letter_a_logo.png"
          alt="Asurion Chat"
          width="24px"
          height="24px"
          style={{
            objectFit: "contain",
            filter: "brightness(0) invert(1)",
          }}
        />
      </Button>

      <AnimatePresence>
        {!isMinimized && (
          <MotionBox
            position="fixed"
            bottom={{ base: 0, sm: "8px" }}
            right={{ base: 0, sm: "8px" }}
            width={{ base: "100%", sm: "380px" }}
            height={{ base: "100vh", sm: "600px" }}
            maxWidth={{ base: "100%", sm: "calc(100vw - 32px)" }}
            maxHeight={{ base: "100%", sm: "calc(100vh - 60px)" }}
            borderRadius={{ base: 0, sm: "md" }}
            bg="white"
            _dark={{ bg: "gray.900" }}
            boxShadow="lg"
            overflow="hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <Stack height="100%" gap={0}>
              <Stack
                direction="row"
                justify="space-between"
                align="center"
                p={4}
                borderBottomWidth="1px"
              >
                <HStack alignItems="flex-end" gap={1}>
                  <Text fontWeight="bold" lineHeight="shorter">
                    Asurion AI
                  </Text>
                  <Text
                    fontSize="2xs"
                    color="gray.600"
                    _dark={{ color: "gray.400" }}
                    mb="1px"
                  >
                    24/7 Support Chat
                  </Text>
                </HStack>
                <Stack direction="row" gap={4} position="relative">
                  <Minus
                    aria-label="Minimize chat"
                    size={18}
                    onClick={handleMinimize}
                    style={{ cursor: "pointer" }}
                  />
                  <DialogRoot>
                    <DialogTrigger asChild>
                      <X
                        aria-label="Close chat"
                        size={18}
                        style={{ cursor: "pointer" }}
                      />
                    </DialogTrigger>
                    <DialogContent
                      style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        margin: 0,
                        width: "calc(100% - 32px)",
                        maxWidth: "400px",
                      }}
                    >
                      <DialogHeader>
                        <DialogTitle>Done asking questions?</DialogTitle>
                      </DialogHeader>
                      <DialogBody>
                        Are you sure? This will restart your chat session.
                      </DialogBody>
                      <DialogFooter>
                        <DialogActionTrigger asChild>
                          <Button>Cancel</Button>
                        </DialogActionTrigger>
                        <DialogActionTrigger asChild>
                          <Button
                            onClick={handleClose}
                            bg="#8223d2"
                            color="white"
                            _hover={{ bg: "#6a1ca8" }}
                          >
                            Close Chat
                          </Button>
                        </DialogActionTrigger>
                      </DialogFooter>
                    </DialogContent>
                  </DialogRoot>
                </Stack>
              </Stack>

              <VStack
                flex={1}
                overflowY="auto"
                gap={4}
                p={4}
                alignItems="stretch"
                css={{
                  "&::-webkit-scrollbar": {
                    width: "8px",
                    borderRadius: "8px",
                    backgroundColor: "var(--chakra-colors-gray-100)",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "var(--chakra-colors-gray-300)",
                    borderRadius: "8px",
                    "&:hover": {
                      backgroundColor: "var(--chakra-colors-gray-400)",
                    },
                  },
                  "&::-webkit-scrollbar-track": {
                    borderRadius: "8px",
                  },
                }}
                _dark={{
                  "&::-webkit-scrollbar": {
                    backgroundColor: "var(--chakra-colors-gray-700)",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "var(--chakra-colors-gray-600)",
                    "&:hover": {
                      backgroundColor: "var(--chakra-colors-gray-500)",
                    },
                  },
                }}
              >
                {messages.map((message) => (
                  <Box
                    key={message.id}
                    alignSelf={
                      message.sender === "user" ? "flex-end" : "flex-start"
                    }
                    maxWidth="80%"
                    bg={message.sender === "user" ? "#8223d2" : "gray.100"}
                    color={message.sender === "user" ? "white" : "black"}
                    _dark={{
                      bg: message.sender === "user" ? "#8223d2" : "gray.800",
                      color: "white",
                    }}
                    py={2}
                    px={4}
                    borderRadius="lg"
                  >
                    <Text fontSize="sm" userSelect="text">
                      {message.text}
                    </Text>
                  </Box>
                ))}
                <div ref={messagesEndRef} />
              </VStack>

              <Stack
                direction="row"
                p={4}
                borderTopWidth="1px"
                gap={2}
                align="center"
                as="form"
                onSubmit={handleSend}
              >
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder={
                    aiLoading
                      ? "Waiting for response..."
                      : "Type your message..."
                  }
                  disabled={aiLoading}
                  size="md"
                />
                <Button
                  type="submit"
                  bg="#8223d2"
                  color="white"
                  _hover={{ bg: "#6a1ca8" }}
                  disabled={!input.trim() || aiLoading}
                >
                  <Send size={18} />
                </Button>
              </Stack>
            </Stack>
          </MotionBox>
        )}
      </AnimatePresence>
    </Box>
  );
}