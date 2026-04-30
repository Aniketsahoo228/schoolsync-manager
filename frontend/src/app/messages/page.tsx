"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/layout/PageHeader";
import { MESSAGES, type Message, type MessageTag } from "@/lib/data/messages";
import Link from "next/link";
import { Pencil, Inbox, Send, Star, FileText, Search, Trash2 } from "lucide-react";

const TAGS: { label: string; value: MessageTag | "all"; icon: React.ReactNode }[] = [
  { label: "Inbox",     value: "inbox",     icon: <Inbox size={15} /> },
  { label: "Sent",      value: "sent",      icon: <Send size={15} /> },
  { label: "Important", value: "important", icon: <Star size={15} /> },
  { label: "Drafts",    value: "draft",     icon: <FileText size={15} /> },
];

export default function MessagesPage() {
  const [activeTag, setActiveTag] = useState<MessageTag | "all">("inbox");
  const [selected, setSelected] = useState<Message | null>(MESSAGES[0]);
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<Message[]>(MESSAGES);

  const filtered = items.filter((m) => {
    const matchTag = activeTag === "all" || m.tag === activeTag;
    const matchQ   = m.subject.toLowerCase().includes(query.toLowerCase()) || m.from.toLowerCase().includes(query.toLowerCase());
    return matchTag && matchQ;
  });

  const unread = items.filter((m) => !m.read && m.tag === "inbox").length;

  function markRead(id: string) {
    setItems((p) => p.map((m) => m.id === id ? { ...m, read: true } : m));
  }

  function handleSelect(msg: Message) {
    setSelected(msg);
    markRead(msg.id);
  }

  function handleDelete(id: string) {
    if (confirm("Delete this message?")) {
      setItems((p) => p.filter((m) => m.id !== id));
      if (selected?.id === id) setSelected(null);
    }
  }

  return (
    <DashboardLayout>
      <PageHeader
        title="Messages"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Messages" }]}
        action={
          <Link href="/messages/compose" className="btn btn-primary">
            <Pencil size={16} /> Compose
          </Link>
        }
      />

      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr 1fr", gap: "1rem", minHeight: 520 }}>
        {/* Sidebar */}
        <div className="card" style={{ padding: "1rem 0" }}>
          <div style={{ padding: "0 0.75rem 0.75rem" }}>
            <Link href="/messages/compose" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
              <Pencil size={15} /> Compose
            </Link>
          </div>

          {TAGS.map((t) => {
            const count = items.filter((m) => m.tag === t.value).length;
            return (
              <button
                key={t.value}
                onClick={() => setActiveTag(t.value)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.625rem",
                  width: "100%",
                  padding: "0.6rem 1rem",
                  background: activeTag === t.value ? "var(--primary-light)" : "transparent",
                  color: activeTag === t.value ? "var(--primary)" : "var(--text-primary)",
                  fontWeight: activeTag === t.value ? 700 : 500,
                  fontSize: "0.875rem",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  borderRadius: 0,
                }}
              >
                {t.icon}
                <span style={{ flex: 1 }}>{t.label}</span>
                {count > 0 && (
                  <span className="badge" style={{ background: activeTag === t.value ? "var(--primary)" : "#e5e7eb", color: activeTag === t.value ? "white" : "var(--text-muted)", fontSize: "0.7rem" }}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}

          <div style={{ borderTop: "1px solid var(--border)", marginTop: "0.75rem", padding: "0.75rem 1rem" }}>
            <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>
              Unread
            </div>
            <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--primary)", marginTop: "0.25rem" }}>{unread}</div>
          </div>
        </div>

        {/* Message list */}
        <div className="card" style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "0.875rem 1rem", borderBottom: "1px solid var(--border)" }}>
            <div style={{ position: "relative" }}>
              <Search size={14} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} />
              <input
                type="text"
                placeholder="Search messages…"
                className="form-control"
                style={{ paddingLeft: "2.25rem", height: 36 }}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>

          <div style={{ flex: 1, overflowY: "auto" }}>
            {filtered.length === 0 ? (
              <div style={{ padding: "2rem", textAlign: "center", color: "var(--text-muted)" }}>No messages.</div>
            ) : (
              filtered.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => handleSelect(msg)}
                  style={{
                    padding: "0.875rem 1rem",
                    borderBottom: "1px solid var(--border)",
                    cursor: "pointer",
                    background: selected?.id === msg.id ? "var(--primary-light)" : msg.read ? "white" : "#fafafe",
                    transition: "background 0.1s",
                    display: "flex",
                    gap: "0.625rem",
                    alignItems: "flex-start",
                  }}
                >
                  {/* Unread dot */}
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: msg.read ? "transparent" : "var(--primary)", marginTop: 6, flexShrink: 0 }} />
                  <div style={{ width: 34, height: 34, borderRadius: "50%", background: msg.avatarColor, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: "0.875rem", flexShrink: 0 }}>
                    {msg.fromInitial}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.5rem" }}>
                      <span style={{ fontWeight: msg.read ? 500 : 700, fontSize: "0.875rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {msg.from}
                      </span>
                      <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", whiteSpace: "nowrap", flexShrink: 0 }}>{msg.date}</span>
                    </div>
                    <div style={{ fontSize: "0.82rem", fontWeight: msg.read ? 500 : 700, color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {msg.subject}
                    </div>
                    <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {msg.preview}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Message detail */}
        <div className="card" style={{ display: "flex", flexDirection: "column" }}>
          {selected ? (
            <>
              <div className="card-header" style={{ flexDirection: "column", alignItems: "flex-start", gap: "0.5rem" }}>
                <div style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
                  <h2 style={{ fontWeight: 800, fontSize: "1rem", margin: 0 }}>{selected.subject}</h2>
                  <button className="btn btn-danger" style={{ padding: "0.3rem 0.6rem" }} onClick={() => handleDelete(selected.id)}>
                    <Trash2 size={14} />
                  </button>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: selected.avatarColor, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: "0.8rem" }}>
                    {selected.fromInitial}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.82rem" }}>{selected.from}</div>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{selected.fromRole} · {selected.date}</div>
                  </div>
                </div>
              </div>
              <div className="card-body" style={{ flex: 1, overflowY: "auto" }}>
                <p style={{ fontSize: "0.875rem", lineHeight: 1.7, whiteSpace: "pre-line", color: "var(--text-primary)" }}>
                  {selected.body}
                </p>
                <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.625rem" }}>
                  <Link href="/messages/compose" className="btn btn-primary" style={{ fontSize: "0.82rem" }}>Reply</Link>
                  <button className="btn btn-secondary" style={{ fontSize: "0.82rem" }}>Forward</button>
                </div>
              </div>
            </>
          ) : (
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", flexDirection: "column", gap: "0.5rem" }}>
              <Inbox size={36} style={{ opacity: 0.3 }} />
              <span>Select a message to read</span>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
