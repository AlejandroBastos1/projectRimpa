import React from "react";

export default function Modal({ show, children }) {
  if (!show) return null;

  return (
    <div className="modal-isOpen">
      <div className="modal-content">
        {children}
      </div>
    </div>
  );
}