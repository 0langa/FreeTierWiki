"use client";

import * as React from "react";

type ModalProps = {
  open: boolean;
  /** Called when the browser closes the dialog (Escape, backdrop click) or after `open` turns false. */
  onClose: () => void;
  /** Accessible name for the dialog. */
  label: string;
  className?: string;
  children: React.ReactNode;
};

/**
 * A native `<dialog>` opened with `showModal()`. The browser handles focus trapping, Escape, and
 * returning focus to the opener; the backdrop is styled in globals.css. A click on the backdrop
 * (the dialog element itself, outside its content) closes it.
 */
export function Modal({ open, onClose, label, className = "", children }: ModalProps) {
  const ref = React.useRef<HTMLDialogElement>(null);

  React.useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    else if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-label={label}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
      className={className}
    >
      {children}
    </dialog>
  );
}
