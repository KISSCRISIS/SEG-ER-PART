import {
  BarChart3,
  CreditCard,
  FilePlus2,
  FolderClock,
  Home,
} from "lucide-react";
import { useLocation } from "wouter";

const items = [
  { label: "Home", path: "/practice", icon: Home },
  { label: "Create Exam", path: "/practice/create", icon: FilePlus2 },
  { label: "My Exams", path: "/practice/exams", icon: FolderClock },
  {
    label: "Performance Analysis",
    path: "/practice/performance",
    icon: BarChart3,
  },
  {
    label: "Subscriptions & Settings",
    path: "/practice/settings",
    icon: CreditCard,
  },
];

export default function QbankNav() {
  const [location, navigate] = useLocation();
  return (
    <nav
      aria-label="Qbank navigation"
      className="mb-5 overflow-x-auto rounded-2xl border border-cyan-200/10 bg-slate-900/80 p-2"
    >
      <div className="flex min-w-max gap-1">
        {items.map(({ label, path, icon: Icon }) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold ${location === path ? "bg-cyan-500 text-slate-950" : "text-slate-300 hover:bg-white/5"}`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}
