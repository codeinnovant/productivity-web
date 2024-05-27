"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BotIcon, UserIcon } from "lucide-react";
import { FormEvent, useState } from "react";

type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

export function Chat() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState<ChatMessage[]>([]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const messages: ChatMessage[] = [
        ...conversation,
        { role: "user", content: prompt }
      ];
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache"
        },
        body: JSON.stringify({ messages }),
        cache: "no-cache"
      });
      if (res.ok) {
        const data = await res.json();
        setConversation([
          ...messages,
          { role: "assistant", content: data.response }
        ]);
      } else {
        throw new Error("Network response was not ok.");
      }
    } catch (error) {
      console.error("Failed to fetch response.");
    }
    setIsLoading(false);
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center pb-2">
        <CardTitle>Chat</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <textarea
            className="flex-grow rounded border border-gray-300 p-2 text-gray-700 outline-none"
            placeholder="Enter your prompt"
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
          ></textarea>
          <Button size="lg" type="submit" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Prompt"}
          </Button>
        </form>
        {conversation.length > 0 && (
          <>
            <p className="mb-4 mt-8 text-xl font-semibold">Conversation</p>
            {conversation.map((message, i) => (
              <div
                key={i}
                className="mt-4 flex gap-4 rounded border border-gray-300 p-4"
              >
                {message.role === "user" ? (
                  <UserIcon className="h-6 w-6 text-gray-500" />
                ) : (
                  <BotIcon className="h-6 w-6 text-gray-500" />
                )}
                <p>{message.content}</p>
              </div>
            ))}
          </>
        )}
      </CardContent>
    </Card>
  );
}
