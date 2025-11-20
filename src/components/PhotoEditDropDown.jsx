import { ChevronDown } from "lucide-react";

export function PhotoEditDropDownItem({ title, isOpen, onToggle, children }) {
    return (
        <div className="border-b border-slate-200 last:border-0">
            <button
                type="button"
                onClick={onToggle}
                className="flex w-full items-center justify-between px-4 py-4 text-left transition hover:text-purple-600"
            >
                <span className="text-base font-semibold text-slate-800">{title}</span>
                <ChevronDown
                    className={`h-5 w-5 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                        }`}
                />
            </button>
            <div
                className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
            >
                <div className="overflow-hidden px-4 pb-6">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default function PhotoEditDropDown({ children, className = "" }) {
    return (
        <div className={`rounded-xl border border-slate-200 bg-white shadow-sm ${className}`}>
            {children}
        </div>
    );
}
