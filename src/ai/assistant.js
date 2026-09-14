import { pipeline } from "@huggingface/transformers";
import vibekKnowledge from "./vibekKnowledge";

const MODEL_ID = "onnx-community/Qwen2.5-0.5B-Instruct";

let generator = null;
let loadingPromise = null;

const SYSTEM_PROMPT = `
You are VIBEK_ASSISTANT, the personal AI assistant for Vibek's portfolio.

You ONLY answer questions about Vibek using the VIBEK KNOWLEDGE below.

Rules:
- Never invent information.
- Never invent jobs, companies, clients, degrees, salaries, experience,
  projects, achievements, technologies or statistics.
- If the information is unavailable, say:
  "I don't have that information in my portfolio yet."
- Keep answers concise and natural.
- You can explain information that exists in the knowledge.
- For unrelated questions, politely redirect the visitor toward Vibek.

VIBEK KNOWLEDGE:

${vibekKnowledge}
`;

async function loadModel() {
  console.log("[VIBEK AI] Starting model load...");

  if (generator) {
    console.log("[VIBEK AI] Using existing model");
    return generator;
  }

  if (loadingPromise) {
    console.log("[VIBEK AI] Waiting for existing load...");
    return loadingPromise;
  }

  console.log("[VIBEK AI] Creating pipeline...");

  loadingPromise = pipeline(
    "text-generation",
    MODEL_ID,
    {
      dtype: "q4",
      progress_callback: (progress) => {
        console.log("[VIBEK AI] MODEL PROGRESS:", progress);
      },
    }
  );

  try {
    generator = await loadingPromise;

    console.log("[VIBEK AI] MODEL READY!");

    return generator;
  } catch (error) {
    console.error("[VIBEK AI] MODEL LOAD FAILED:", error);
    throw error;
  } finally {
    loadingPromise = null;
  }
}

export async function askVibek(question) {
  const cleanQuestion = question.trim();

  if (!cleanQuestion) {
    return "Ask me something about Vibek.";
  }

  const model = await loadModel();

  const messages = [
    {
      role: "system",
      content: SYSTEM_PROMPT,
    },
    {
      role: "user",
      content: cleanQuestion,
    },
  ];

  const result = await model(messages, {
    max_new_tokens: 160,
    temperature: 0.4,
    do_sample: true,
  });

  const generated = result?.[0]?.generated_text;

  if (Array.isArray(generated)) {
    const lastMessage = generated[generated.length - 1];

    if (lastMessage?.content) {
      return lastMessage.content.trim();
    }
  }

  return "I couldn't generate an answer right now.";
}

export async function preloadAssistant() {
  await loadModel();
}