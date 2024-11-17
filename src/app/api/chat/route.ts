import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const deviceCareContext = 
`What is DeviceCare? - DeviceCare is a comprehensive device management solution designed to help users monitor, protect, and optimize their electronic devices, ensuring they run smoothly and efficiently.
How do I install DeviceCare on my device? - To install DeviceCare, download the installer from our official website, run the setup file, and follow the on-screen instructions. DeviceCare is compatible with Windows, macOS, and major mobile operating systems.
What features does DeviceCare offer? - DeviceCare offers a range of features including device health monitoring, performance optimization, security scans, automated backups, and remote support capabilities.
Is DeviceCare compatible with all devices? - DeviceCare is compatible with most modern devices, including Windows and macOS computers, as well as Android and iOS smartphones and tablets. For a full list of compatible devices, please visit our compatibility page on the website.
How do I perform a device health scan with DeviceCare? - To perform a device health scan, open the DeviceCare application, navigate to the 'Health' tab, and click on 'Run Scan'. The scan will analyze your device for any issues and provide recommendations for optimization.
Can DeviceCare protect my device from malware and viruses? - Yes, DeviceCare includes robust security features that help protect your device from malware, viruses, and other security threats. Regular scans and real-time protection keep your device safe.
How can I contact DeviceCare support if I need help? - You can contact DeviceCare support through our in-app support chat, by emailing support@devicecare.com, or by calling our customer service hotline. Support is available 24/7.
Does DeviceCare offer a free trial? - Yes, DeviceCare offers a 14-day free trial with access to all premium features. You can sign up for the free trial on our website or through the DeviceCare app.
How do I update DeviceCare to the latest version? - DeviceCare automatically checks for updates and notifies you when a new version is available. You can also manually check for updates by going to the 'Settings' tab and selecting 'Check for Updates'.
Can I use DeviceCare on multiple devices with one subscription? - Yes, a single DeviceCare subscription allows you to manage and protect multiple devices. You can add devices to your account through the DeviceCare app or the web portal.`;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const fullMessages = [
    {
      role: 'system',
      content: 
      `You are DeviceCare's official AI assistant. Follow these guidelines:

      1. Use the following knowledge base to answer questions:
      ${deviceCareContext}

      2. Response rules:
      - For unrelated questions: "I'm sorry, I can only answer questions related to DeviceCare."
      - For DeviceCare questions not in knowledge base: "This is out of scope for me. Please contact support@devicecare.com or call our customer service at XXX-XXX-XXX."
      - For covered topics: Provide clear, direct answers from the knowledge base.

      3. Style:
      - Use friendly, professional tone
      - Keep responses concise
      - Format in plain text
      - Avoid special characters or line numbers`
    },
    ...messages
  ];

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    stream: true,
    messages: fullMessages,
    temperature: 0.7,
    max_tokens: 500
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
} 