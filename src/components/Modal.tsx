import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSave,
  title,
  children,
}) => {
  const modalRoot = document.body;
  const elRef = useRef<HTMLDivElement | null>(null);

  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const el = elRef.current!;
    if (isOpen) {
      modalRoot.appendChild(el);
    }
    return () => {
      if (el.parentElement) {
        modalRoot.removeChild(el);
      }
    };
  }, [isOpen, modalRoot]);

  if (!isOpen) return null;

  return createPortal(
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "white",
          color: "#333", // Fix text visibility
          padding: "1.5rem",
          borderRadius: "8px",
          minWidth: "400px",
          maxWidth: "90%",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <h3 style={{ margin: 0 }}>{title}</h3>
          <button
            onClick={onClose}
            style={{
              border: "none",
              background: "none",
              cursor: "pointer",
              fontSize: "1.25rem",
              color: "#999",
            }}
          >
            &times;
          </button>
        </div>
        <div>{children}</div>
        <div
          style={{
            marginTop: "1.5rem",
            display: "flex",
            justifyContent: "flex-end",
            gap: "0.5rem",
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "0.5rem 1rem",
              border: "1px solid #d9d9d9",
              borderRadius: "4px",
              background: "white",
              cursor: "pointer",
              color: "#333",
            }}
          >
            Cancel
          </button>
          {onSave && (
            <button
              onClick={onSave}
              style={{
                padding: "0.5rem 1rem",
                border: "none",
                borderRadius: "4px",
                background: "#1890ff",
                color: "white",
                cursor: "pointer",
              }}
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>,
    elRef.current
  );
};
