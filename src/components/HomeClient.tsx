"use client";

import { useCallback, useState } from "react";
import Atmosphere from "@/components/Atmosphere";
import FeedbackView from "@/components/FeedbackView";
import GateConfirm from "@/components/GateConfirm";
import GateDecline from "@/components/GateDecline";
import Intro from "@/components/Intro";
import MainView from "@/components/MainView";
import MusicToggle from "@/components/MusicToggle";

type Stage = "gate" | "declined" | "intro" | "main" | "feedback";

export default function HomeClient() {
  const [stage, setStage] = useState<Stage>("gate");
  const [leaving, setLeaving] = useState(false);

  const transitionTo = useCallback((next: Stage) => {
    setLeaving(true);
    window.setTimeout(() => {
      setStage(next);
      setLeaving(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 700);
  }, []);

  const showAtmosphere = stage !== "intro" && stage !== "gate" && stage !== "declined";
  const showMusic = stage !== "gate" && stage !== "declined";

  return (
    <div className={`app-shell stage-${stage} ${leaving ? "is-leaving" : "is-entering"}`}>
      {showAtmosphere && (
        <Atmosphere variant={stage === "feedback" ? "stars" : "petals"} />
      )}
      {showMusic && (
        <div className="top-bar">
          <MusicToggle />
        </div>
      )}

      <main className="stage-content">
        {stage === "gate" && (
          <GateConfirm
            onConfirm={() => transitionTo("intro")}
            onDecline={() => transitionTo("declined")}
          />
        )}
        {stage === "declined" && (
          <GateDecline onRetry={() => transitionTo("gate")} />
        )}
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
