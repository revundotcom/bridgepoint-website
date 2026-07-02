"use client";

import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    window.location.replace("/");
  }, []);

  return (
    <div style={{ minHeight: "60vh" }}>
      <meta httpEquiv="refresh" content="0; url=/" />
      <noscript>
        <p style={{ padding: "2rem", textAlign: "center" }}>
          Redirecting to Bridgepoint Maintenance home. <a href="/">Continue</a>.
        </p>
      </noscript>
    </div>
  );
}
