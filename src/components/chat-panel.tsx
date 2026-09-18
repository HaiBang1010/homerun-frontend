import { BotMessageSquare, CheckCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { BrandButton } from "@/components/brand-button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Message = {
  id: number;
  from: "bot" | "user";
  text: string;
  time: string;
};

/** Sample transcript from Figma node 14470:4246. */
const SEED_MESSAGES: Message[] = [
  {
    id: 1,
    from: "bot",
    text: "🏡 Chào bạn! Tôi là trợ lý ảo của Homerun—sẵn sàng giúp bạn với những câu hỏi nhanh về đơn hàng, căn hộ, hoặc bất cứ điều gì bạn cần.",
    time: "7:20",
  },
  {
    id: 2,
    from: "user",
    text: "Nghe tuyệt đấy, bạn có thông tin nào muốn biết trước khi hỗ trợ tôi không?",
    time: "7:20",
  },
  {
    id: 3,
    from: "bot",
    text: "Trước khi tôi hỗ trợ, bạn có thể cho chúng tôi biết địa chỉ email của bạn không?",
    time: "7:20",
  },
  {
    id: 4,
    from: "user",
    text: "Đây là email của tôi: helloworld_123@gmail.com",
    time: "7:20",
  },
];

function BotAvatar() {
  return (
    <span className="grid size-12 shrink-0 place-items-center rounded-full bg-brand">
      <BotMessageSquare aria-hidden className="size-8 text-white" />
    </span>
  );
}

function BotMessage({ message }: { message: Message }) {
  return (
    <li className="flex flex-col items-start pr-10">
      <div className="relative w-full rounded-tl-xl rounded-tr-xl rounded-br-xl bg-neutral-200 px-5 py-4 drop-shadow-[0px_2px_0.5px_rgba(0,0,0,0.05)] ml-5 mb-5">
        <p className="text-[15px] text-neutral-800">{message.text}</p>
        <img
          src="/images/chat/bubble-tail-left.svg"
          alt=""
          aria-hidden
          width={39}
          height={31}
          className="absolute -bottom-5.25 left-0 h-7.75 w-9.75"
        />
      </div>
      <div className="relative z-10 -mt-4 flex items-center gap-2">
        <BotAvatar />
        <span className="text-[10px] text-[#888]">{message.time}</span>
      </div>
    </li>
  );
}

function UserMessage({ message }: { message: Message }) {
  return (
    <li className="flex flex-col items-end pr-3 pl-5">
      <div className="flex max-w-72.25 flex-col items-start">
        <div className="relative w-full rounded-tl-xl rounded-tr-xl rounded-bl-xl bg-orange-200 px-5 py-4 drop-shadow-[0px_1px_0.5px_rgba(0,0,0,0.2)]">
          <p className="text-[15px] text-neutral-800">{message.text}</p>
          <img
            src="/images/chat/bubble-tail-right.svg"
            alt=""
            aria-hidden
            width={39}
            height={31}
            className="absolute right-0 -bottom-5.25 h-7.75 w-9.75 -scale-x-100"
          />
        </div>
        <div className="mt-2.5 flex items-center gap-1">
          <span className="text-[10px] text-[#888]">{message.time}</span>
          <CheckCheck aria-hidden className="size-3.5 text-brand" />
        </div>
      </div>
    </li>
  );
}

/** Chat panel — Figma node 14470:4246. UI only: no API, the bot never replies. */
export function ChatPanel({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState(SEED_MESSAGES);
  const [draft, setDraft] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  useEffect(() => {
    const el = transcriptRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  const send = (event: React.FormEvent) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        from: "user",
        text,
        time: new Date().toLocaleTimeString("vi-VN", {
          hour: "numeric",
          minute: "2-digit",
        }),
      },
    ]);
    setDraft("");
  };

  return (
    <div
      role="dialog"
      aria-label="Homerun Chatbot"
      className={cn(
        "flex w-[calc(100vw-2rem)] max-w-100 flex-col overflow-hidden rounded-[20px] shadow-figma-lg",
        // 680 tall like Figma, shrinking only when the screen cannot fit it.
        "h-[min(680px,calc(100svh-6rem))] animate-in duration-300 fade-in slide-in-from-bottom-4",
      )}
    >
      <header className="relative flex h-22 shrink-0 items-center justify-between bg-brand px-6 shadow-[0px_24px_34px_0px_rgba(174,10,10,0.45)]">
        <div className="flex items-center gap-2.25">
          <BotMessageSquare aria-hidden className="size-10 text-white" />
          <span className="text-2xl font-bold text-white">Homerun Chatbot</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Thu gọn khung chat"
          className="rounded-full outline-none transition-opacity duration-150 focus-visible:ring-3 focus-visible:ring-white/50 hover:opacity-75"
        >
          <img
            src="/images/chat/minus-circle.svg"
            alt=""
            aria-hidden
            width={24}
            height={24}
            className="size-6"
          />
        </button>
      </header>

      <div className="relative min-h-0 flex-1 bg-[#f8f9fa]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-7 bg-linear-to-b from-black/24 to-transparent"
        />
        <div ref={transcriptRef} className="h-full overflow-y-auto px-5 py-6">
          <ul className="flex flex-col justify-end gap-8">
            {messages.map((message) =>
              message.from === "bot" ? (
                <BotMessage key={message.id} message={message} />
              ) : (
                <UserMessage key={message.id} message={message} />
              ),
            )}
          </ul>
        </div>
      </div>

      <form
        onSubmit={send}
        className="flex shrink-0 items-start gap-2 bg-white p-4 drop-shadow-[0px_-4px_8px_rgba(0,0,0,0.08)]"
      >
        <Input
          ref={inputRef}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Nhắn tin"
          aria-label="Nội dung tin nhắn"
          className="h-10 flex-1 rounded-[6px] border border-slate-line bg-white text-neutral-900 placeholder:text-slate-soft dark:bg-white dark:text-neutral-900"
        />
        <BrandButton
          type="submit"
          shape="rounded"
          className="type-body"
          disabled={!draft.trim()}
        >
          Gửi
        </BrandButton>
      </form>
    </div>
  );
}
