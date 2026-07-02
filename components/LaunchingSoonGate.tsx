"use client";

import { useEffect, useState } from "react";

const PASSWORD = "winner";
const STORAGE_KEY = "bp-preview-access";

export default function LaunchingSoonGate() {
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Allow ?access=winner via URL to set the cookie
    const params = new URLSearchParams(window.location.search);
    if (params.get("access") === PASSWORD) {
      window.localStorage.setItem(STORAGE_KEY, "1");
      setUnlocked(true);
      // Clean the query param
      window.history.replaceState({}, "", window.location.pathname);
      return;
    }

    setUnlocked(window.localStorage.getItem(STORAGE_KEY) === "1");
  }, []);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (input.trim().toLowerCase() === PASSWORD) {
      window.localStorage.setItem(STORAGE_KEY, "1");
      setUnlocked(true);
    } else {
      setError(true);
    }
  }

  // While we figure out unlock state, render nothing (avoids flash of real site)
  if (unlocked === null) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "#0F2441",
          zIndex: 99999,
        }}
      />
    );
  }

  if (unlocked) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#0F2441",
        color: "#FFF9F6",
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily:
          "'DM Sans', 'Inter', system-ui, -apple-system, sans-serif",
        padding: "32px",
      }}
    >
      <div style={{ maxWidth: "560px", width: "100%", textAlign: "center" }}>
        <div
          style={{
            display: "inline-block",
            padding: "10px 16px",
            border: "1px solid #23BDC8",
            borderRadius: "999px",
            color: "#23BDC8",
            fontSize: "11px",
            letterSpacing: "3px",
            fontWeight: 600,
            textTransform: "uppercase",
            marginBottom: "32px",
          }}
        >
          Bridgepoint Maintenance
        </div>

        <h1
          style={{
            fontSize: "clamp(40px, 7vw, 72px)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            margin: "0 0 16px",
            lineHeight: 1.05,
          }}
        >
          Launching Soon
        </h1>

        <p
          style={{
            fontSize: "18px",
            lineHeight: 1.5,
            color: "rgba(255, 249, 246, 0.75)",
            margin: "0 0 32px",
            maxWidth: "440px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Licensed plumbing, electrical, HVAC, and general contracting across Canada and the US. 24/7 emergency dispatch line live now.
        </p>

        <a
          href="tel:+18559109090"
          style={{
            display: "inline-block",
            background: "#23BDC8",
            color: "#0F2441",
            padding: "14px 32px",
            borderRadius: "8px",
            fontWeight: 700,
            fontSize: "16px",
            textDecoration: "none",
            marginBottom: "48px",
          }}
        >
          Call 1-855-910-9090
        </a>

        <div
          style={{
            borderTop: "1px solid rgba(255, 249, 246, 0.15)",
            paddingTop: "32px",
            marginTop: "16px",
          }}
        >
          <form
            onSubmit={submit}
            style={{
              display: "flex",
              gap: "8px",
              maxWidth: "320px",
              margin: "0 auto",
            }}
          >
            <input
              type="password"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setError(false);
              }}
              placeholder="Client access"
              style={{
                flex: 1,
                background: "rgba(255, 249, 246, 0.08)",
                border: error
                  ? "1px solid #F87171"
                  : "1px solid rgba(255, 249, 246, 0.2)",
                borderRadius: "6px",
                padding: "10px 14px",
                color: "#FFF9F6",
                fontSize: "14px",
                outline: "none",
                fontFamily: "inherit",
              }}
              autoComplete="off"
            />
            <button
              type="submit"
              style={{
                background: "#FFF9F6",
                color: "#0F2441",
                border: "none",
                borderRadius: "6px",
                padding: "10px 20px",
                fontWeight: 600,
                fontSize: "14px",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Enter
            </button>
          </form>
          {error && (
            <p
              style={{
                color: "#F87171",
                fontSize: "12px",
                marginTop: "12px",
                marginBottom: 0,
              }}
            >
              Incorrect access code.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
