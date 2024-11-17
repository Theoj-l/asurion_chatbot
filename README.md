# Next.js Chat Application

A modern chat application built with Next.js 14, featuring dark mode support.

## Getting Started

### Live Demo

Check out the live demo at [https://asurion-chatbot.vercel.app/](https://asurion-chatbot.vercel.app/)

### Local Development

1. Clone the repository:

```bash
git clone https://github.com/Theoj-l/asurion_chatbot.git
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Copy `.env.example` to `.env.local` and configure environment variables

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## FAQ Integration

The chatbot is trained on a custom FAQ dataset using the following approach:

1. FAQ documents are preprocessed and formatted for optimal context
2. The data is integrated into the chat completion API calls in `src/app/api/chat/route.ts`
3. Each query is analyzed against the FAQ knowledge base before generating a response
4. The model uses this context to provide accurate, company-specific answers

### Customizing the FAQ

To use your own FAQ:

1. Prepare your FAQ document in a clear Q&A format
2. Update the context in the chat API route
3. Adjust the system prompt if needed for your specific use case

## Project Structure
