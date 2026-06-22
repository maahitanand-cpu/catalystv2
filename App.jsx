import { lazy, Suspense, useState, useEffect } from "react";
import Catalyst from "./Catalyst.jsx";
import CursorSparks from "./CursorSparks.jsx";

const Hackathon = lazy(() => import("./Hackathon.jsx"));

function useHashRoute() {
  const [route, setRoute] = useState(() => window.location.hash);
  useEffect(() => {
    const onHash = () => setRoute(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return route;
}

export default function App() {
  const route = useHashRoute();
  const onHackathon = route.startsWith("#/hackathon");

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = onHackathon ? "Catalyst Hack 2026 | Catalyst" : "Catalyst | Student Builders Club";
  }, [onHackathon]);

  return (
    <>
      <CursorSparks />
      {onHackathon ? (
        <Suspense fallback={<div style={{ minHeight: "100vh", background: "#000" }} />}>
          <Hackathon />
        </Suspense>
      ) : (
        <Catalyst />
      )}
    </>
  );
}
