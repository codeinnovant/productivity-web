import { openai } from "@/lib/openai";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Uploadable } from "openai/uploads.mjs";

const system_prompt =
  "You are a useful assistant. You've been doing this job forever, so you're really good at it. Your task is to answer the question asked if this is the case. Add only necessary punctuation, such as periods and commas, and use only the context provided. Reply with text as if speaking out loud";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const audio = formData.get("audio") as Uploadable;
    const date = formData.get("date") as string;

    // Check if audio is a File and handle accordingly
    if (audio) {
      const transcription = await openai.audio.transcriptions.create({
        file: audio,
        model: "whisper-1"
      });

      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: system_prompt
          },
          {
            role: "user",
            content: transcription.text
          }
        ],
        model: "gpt-4"
      });

      // save transcription in db
      await prisma.note.create({
        data: {
          date: new Date(date),
          content: transcription.text
        }
      });
      return NextResponse.json({
        data: {
          transcription: transcription.text,
          answer: completion.choices[0].message.content
        },
        status: 200
      });
    } else {
      return NextResponse.json({
        error: "No audio file provided",
        status: 400
      });
    }
  } catch (error) {
    console.log({ error });
    return NextResponse.json({ error: "Error saving audio file", status: 500 });
  }
}
