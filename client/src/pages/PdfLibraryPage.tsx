import Bi from "@/components/Bi";
import { DICT } from "@/lib/seg-i18n";
import DashboardLayout from "@/components/DashboardLayout";
import { trpc } from "@/lib/trpc";
import { useRef, useState } from "react";
import { Link } from "wouter";

/**
 * LEARN â†’ PDF Library.
 *
 * Imports personal PDF files into the local workspace store (never modifies
 * the original SEG books). Notes, bookmarks, and reading position are kept
 * locally in the browser so they survive closing and reopening the app.
 * Summaries are extractive from the PDF text layer only â€” no medical content
 * is synthesized and nothing is sent to an external service.
 */
function bi(key: string): string {
  const entry = DICT[key];
  return entry ? `${entry.en} — ${entry.ar}` : key;
}

export default function PdfLibraryPage() {
  const list = trpc.pdfLibrary.list.useQuery();
  const importPdf = trpc.pdfLibrary.import.useMutation();
  const fileInput = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<string>("");
  const [busy, setBusy] = useState(false);

  async function handleFiles(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;
    if (!file.name.toLowerCase().endsWith(".pdf")) {
      setStatus(bi("pdf.error.type"));
      return;
    }
    setBusy(true);
    setStatus(`Importing "${file.name}"â€¦`);
    try {
      const base64 = await fileToBase64(file);
      const result = await importPdf.mutateAsync({
        fileName: file.name,
        fileBase64: base64,
      });
      setStatus(`${bi("pdf.imported")} "${result.name}" (${result.pages} ${bi("pdf.pages")}).`);
      await list.refetch();
    } catch (error: any) {
      setStatus(`${bi("pdf.import.failed")}: ${error?.message ?? error}`);
    } finally {
      setBusy(false);
      if (fileInput.current) fileInput.current.value = "";
    }
  }

  return (
    <DashboardLayout>
      <main className="mx-auto max-w-5xl space-y-5 text-slate-100">
        <header className="rounded-2xl border border-cyan-200/15 bg-slate-900/70 p-6">
          <h1 className="text-3xl font-black"><Bi t="pdf.title" /></h1>
          <p className="mt-2 text-sm text-slate-300" dir="rtl">
            Ø§Ø³ØªÙŠØ±Ø§Ø¯ Ù…Ù„ÙØ§Øª PDF Ø§Ù„Ø´Ø®ØµÙŠØ© Ù„Ù„Ø¯Ø±Ø§Ø³Ø© ÙˆØ§Ù„Ù…Ø±Ø§Ø¬Ø¹Ø©. ØªÙØ­ÙØ¸ Ø§Ù„Ù…Ù„Ø§Ø­Ø¸Ø§Øª
            ÙˆØ§Ù„Ø¥Ø´Ø§Ø±Ø§Øª Ø§Ù„Ù…Ø±Ø¬Ø¹ÙŠØ© ÙˆÙ…ÙˆÙ‚Ø¹ Ø§Ù„Ù‚Ø±Ø§Ø¡Ø© Ù…Ø­Ù„ÙŠÙ‹Ø§ ÙˆØªØ¨Ù‚Ù‰ Ø¨Ø¹Ø¯ Ø¥ØºÙ„Ø§Ù‚ Ø§Ù„ØªØ·Ø¨ÙŠÙ‚
            ÙˆØ¥Ø¹Ø§Ø¯Ø© ÙØªØ­Ù‡. Ù„Ø§ ÙŠØªÙ… Ø¥Ø±Ø³Ø§Ù„ Ø£ÙŠ Ù…Ù„Ù Ø¥Ù„Ù‰ Ø®Ø¯Ù…Ø© Ø®Ø§Ø±Ø¬ÙŠØ©.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <input
              ref={fileInput}
              type="file"
              accept="application/pdf,.pdf"
              aria-label="Select PDF file"
              className="hidden"
              onChange={event => void handleFiles(event.target.files)}
            />
            <button
              type="button"
              disabled={busy}
              onClick={() => fileInput.current?.click()}
              className="rounded-xl bg-cyan-500 px-5 py-3 font-black text-slate-950 disabled:opacity-40"
            >
              {busy ? <Bi t="pdf.importing" /> : <Bi t="pdf.import" />}
            </button>
            {status ? (
              <p className="rounded-lg bg-white/5 px-4 py-2 text-sm text-cyan-100">
                {status}
              </p>
            ) : null}
          </div>
        </header>

        <section aria-label="Imported PDFs" className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {list.isLoading ? <p className="text-sm"><Bi t="pdf.loading" /></p> : null}
          {list.isError ? (
            <button
              onClick={() => void list.refetch()}
              className="rounded-lg bg-white/10 px-3 py-2 text-xs font-bold"
            >
              <Bi t="qbank.retry" />
            </button>
          ) : null}
          {list.data?.items.map(item => (
            <article
              key={item.id}
              className="flex flex-col rounded-2xl border border-white/10 bg-slate-900/70 p-5"
            >
              <p className="text-xs text-cyan-200"><Bi t="pdf.label" /></p>
              <h2 className="mt-2 truncate font-black">{item.name}</h2>
              <p className="mt-1 text-xs text-slate-400">
                {item.pages ? `${item.pages} pages Â· ` : ""}
                imported {new Date(item.createdAt).toLocaleString()}
              </p>
              <Link
                href={`/learn/books/imported?pdf=${encodeURIComponent(item.id)}`}
                className="mt-auto rounded-xl bg-cyan-500 px-4 py-3 text-center font-bold text-slate-950"
              >
                <Bi t="pdf.read" />
              </Link>
            </article>
          ))}
          {list.data && list.data.items.length === 0 ? (
            <p className="text-sm text-slate-400">
              <Bi t="pdf.empty.library" />
            </p>
          ) : null}
        </section>
      </main>
    </DashboardLayout>
  );
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result ?? "");
      // Strip the data URL prefix; the server expects raw base64.
      const comma = result.indexOf(",");
      resolve(comma >= 0 ? result.slice(comma + 1) : result);
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}


