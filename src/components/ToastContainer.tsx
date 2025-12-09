import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { removeToast } from "../store/uiSlice";

export const ToastContainer: React.FC = () => {
  const toasts = useAppSelector((state) => state.ui.toasts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        dispatch(removeToast(toasts[0].id));
      }, 3000); // Auto dismiss after 3s
      return () => clearTimeout(timer);
    }
  }, [toasts, dispatch]);

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 2000,
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          style={{
            padding: "12px 24px",
            borderRadius: "4px",
            color: "white",
            backgroundColor:
              toast.type === "success"
                ? "#52c41a"
                : toast.type === "error"
                ? "#f5222d"
                : "#1890ff",
            boxShadow:
              "0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)",
            animation: "slideIn 0.3s ease-in-out",
          }}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
};
