"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";

export default function SelectDropdown({
  icon: Icon,
  active = false,
  value,
  onChange,
  placeholder,
  options = [],
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const selected = value ? options.find((o) => o.value === value) : null;

  return (
    <div ref={wrapRef} className="relative w-full">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={`input flex cursor-pointer items-center gap-2 pl-10 pr-9 text-left transition-all duration-250 ease-in-out hover:bg-indigo-50 hover:border-indigo-300 hover:shadow-[0_10px_26px_-14px_rgba(99,102,241,0.45)] dark:hover:bg-indigo-600/20 dark:hover:border-indigo-500/50 dark:hover:shadow-[0_10px_30px_-12px_rgba(99,102,241,0.5)] ${
          active
            ? "border-transparent bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-600/25"
            : ""
        }`}
      >
        {Icon && (
          <Icon
            className={`pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors duration-250 ${
              active ? "text-white" : "text-faint"
            }`}
          />
        )}

        <span
          className={`truncate ${active ? "text-white" : selected ? "text-ink" : "text-faint"}`}
        >
          {selected ? selected.label : placeholder}
        </span>

        <ChevronDown
          className={`pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 transition-all duration-250 ${
            open ? "rotate-180" : ""
          } ${active ? "text-white" : "text-faint"}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.14, ease: [0.16, 1, 0.3, 1] }}
            role="listbox"
            className="absolute top-full left-0 right-0 z-50 mt-2 max-h-72 overflow-y-auto rounded-xl border border-line bg-panel p-1.5 text-ink shadow-xl"
          >
            {options.map((opt) => {
              const isSelected = opt.value === value;

              return (
                <button
                  key={opt.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className={`flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium transition-all duration-200 ease-in-out ${
                    isSelected
                      ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-600/25"
                      : "text-ink hover:bg-indigo-50 hover:text-indigo-700 dark:hover:bg-indigo-600/20 dark:hover:text-indigo-300"
                  }`}
                >
                  {opt.label}
                  {isSelected && <Check className="h-4 w-4 shrink-0" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}