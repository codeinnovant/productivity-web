import { AudioRecorder } from "@/components/audio-recorder";
import prisma from "@/lib/prisma";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default async function CalendarDate({
  params
}: {
  params: { date: string };
}) {
  // Convert the date string to a Date object
  const startDate = new Date(params.date);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 1);

  const notes = await prisma.note.findMany({
    where: {
      date: {
        gte: startDate,
        lt: endDate
      }
    },
    orderBy: {
      date: "asc"
    }
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-10">
      <div className="mb-6 flex w-full max-w-3xl items-center gap-8 p-4 text-center text-xl font-semibold">
        <Link href="/">
          <button className="cursor-pointer rounded-md p-4 px-8 text-center text-lg hover:bg-blue-100">
            <ArrowLeftIcon />
          </button>
        </Link>
        <span>{params.date}</span>
      </div>
      <div className="">
        <AudioRecorder date={params.date} />
      </div>

      <div className="flex flex-col gap-4">
        {notes.map((note, index) => {
          return (
            <div
              key={index}
              className="rounded border border-gray-300 p-2 text-gray-700"
            >
              {note.date.toDateString()}&nbsp;:&nbsp;{note.content}
            </div>
          );
        })}
      </div>
    </main>
  );
}
