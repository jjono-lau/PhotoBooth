import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function CustomDropDown({
  label,
  options = [],
  selectedId,
  onSelect,
  placeholder = "Select an option",
  renderTrigger,
  renderOption,
  getOptionId = (option) => option?.id,
  getOptionLabel = (option) => option?.label ?? "",
  className = "",
  menuClassName = "max-h-64",
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const selectedOption = useMemo(() => {
    return options.find((option) => getOptionId(option) === selectedId);
  }, [getOptionId, options, selectedId]);

  useEffect(() => {
    if (!open) return undefined;
    const handleClick = (event) => {
      if (!containerRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const handleSelect = (option) => {
    const optionId = getOptionId(option);
    onSelect?.(optionId, option);
    setOpen(false);
  };

  const triggerContent = renderTrigger
    ? renderTrigger(selectedOption)
    : selectedOption
      ? getOptionLabel(selectedOption)
      : placeholder;

  return (
    <div className={`w-full ${className}`} ref={containerRef}>
      {label ? (
        <p className="mb-2 text-sm font-medium text-slate-600">{label}</p>
      ) : null}

      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-lg border border-slate-300 bg-white px-4 py-3 text-left text-sm text-slate-700 shadow-sm transition focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
      >
        <span className="flex-1 truncate">{triggerContent}</span>
        <ChevronDown
          className={`ml-3 h-4 w-4 text-slate-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open ? (
        <div
          className={`z-20 mt-2 w-full overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-xl ${menuClassName}`}
        >
          <ul role="listbox" aria-label={label ?? "Custom dropdown"}>
            {options.map((option) => {
              const optionId = getOptionId(option);
              const isActive = optionId === selectedId;
              return (
                <li key={optionId}>
                  <button
                    type="button"
                    className={`flex w-full items-start gap-2 px-4 py-3 text-left text-sm transition ${
                      isActive
                        ? "bg-purple-50 text-purple-700"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                    onClick={() => handleSelect(option)}
                  >
                    {renderOption
                      ? renderOption(option, { isActive })
                      : getOptionLabel(option)}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
