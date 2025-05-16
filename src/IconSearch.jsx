import { useEffect, useState } from "react";

export default function IconSearch() {
  const [show, setShow] = useState(false);

  function customOpenEventListener() {
    setShow(true);
  }

  useEffect(() => {
    document.body.addEventListener("gz-search-open", customOpenEventListener);

    return () => {
      document.body.removeEventListener(
        "gz-search-open",
        customOpenEventListener,
      );
    };
  });

  if (show) {
    return (
      <>
        <div
          className="backdrop"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 1040,
            width: "100vw",
            height: "100vh",
            backgroundColor: "var(--lia-bs-modal-backdrop-bg)",
            opacity: "var(--lia-bs-modal-backdrop-opacity)",
          }}
        ></div>
        <div
          role="dialog"
          onClick={() => setShow(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 1050,
            display: "block",
            width: "100%",
            height: "100%",
            outline: 0,
            overflowX: "hidden",
            overflowY: "auto",
          }}
        >
          <div
            className="modal"
            style={{
              margin: "1.5625rem auto",
              marginTop: "56px",
              position: "relative",
              width: "auto",
              maxWidth:
                "min(53.75rem, calc(100vw - var(--lia-bs-grid-gutter-width)))",
            }}
          >
            <form
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              <input
                placeholder="Custom search"
                style={{
                  width: "100%",
                  padding: "20px",
                  border: 0,
                  borderRadius: "var(--lia-bs-input-border-radius-lg)",
                }}
              />
            </form>
          </div>
        </div>
      </>
    );
  }
}
