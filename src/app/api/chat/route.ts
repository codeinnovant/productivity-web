import OpenAI, { openai } from "@/lib/openai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = body.messages;

    const params: OpenAI.Chat.ChatCompletionCreateParams = {
      messages: messages,
      model: "gpt-3.5-turbo",
      stream: false
    };

    const chatCompletion: OpenAI.Chat.ChatCompletion =
      await openai.chat.completions.create(params);

    const response = {
      response: chatCompletion?.choices[0].message.content?.trim()
    };
    return NextResponse.json(response);
  } catch (error) {
    console.log({ error });
    return NextResponse.error();
  }
}
