"use client";

import { useCallback, useState } from "react";
import Atmosphere from "@/components/Atmosphere";
import FeedbackView from "@/components/FeedbackView";
import Intro from "@/components/Intro";
import MainView from "@/components/MainView";
import MusicToggle from "@/components/MusicToggle";
import VisitBeacon from "@/components/VisitBeacon";

type Stage = "intro" | "main" | "feedback";

export default function HomeClient() {
  const [stage, setStage] = useState<Stage>("intro");
  const [leaving, setLeaving] = useState(false);

  const transitionTo = useCallback((next: Stage) => {
    setLeaving(true);
    window.setTimeout(() => {
      setStage(next);
      setLeaving(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 700);
  }, []);

  const showAtmosphere = stage !== "intro";

  return (
    <div className={`app-shell stage-${stage} ${leaving ? "is-leaving" : "is-entering"}`}>
      <VisitBeacon />
      {showAtmosphere && (
        <Atmosphere variant={stage === "feedback" ? "stars" : "petals"} />
      )}
      <div className="top-bar">
        <MusicToggle />
      </div>

      <main className="stage-content">
        {stage === "intro" && <Intro onEnter={() => transitionTo("main")} />}
        {stage === "main" && (
          <MainView
            onOpenFeedback={() => transitionTo("feedback")}
            onBack={() => transitionTo("intro")}
          />
        )}
        {stage === "feedback" && (
          <FeedbackView onBack={() => transitionTo("main")} />
        )}
      </main>
    </div>
  );
}
