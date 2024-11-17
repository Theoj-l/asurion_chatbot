"use client";

import { ChatWidget } from "@/components/ui/chat-widget";
import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";
import { ColorModeButton } from "@/components/ui/color-mode";

export default function Home() {
  return (
    <main style={{ overflow: "hidden" }}>
      <Box position="fixed" top={1} right={1} zIndex={50}>
        <ColorModeButton />
      </Box>
      <Container maxW="4xl" py={8}>
        <VStack gap={8} align="stretch">
          <Heading>Welcome to Our Service</Heading>
          {[...Array(20)].map((_, i) => (
            <Box
              key={i}
              p={6}
              bg="gray.50"
              _dark={{ bg: "gray.900" }}
              rounded="md"
            >
              <Heading size="md" mb={4}>
                Section {i + 1}
              </Heading>
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Text>
            </Box>
          ))}
        </VStack>
      </Container>
      <ChatWidget />
    </main>
  );
}
