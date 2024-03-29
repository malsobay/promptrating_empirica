import {
  usePlayer,
  useRound,
  useStage,
} from "@empirica/core/player/classic/react";
import React from "react";
import { Avatar } from "./components/Avatar";
import { Timer } from "./components/Timer";
import { Button } from "./components/Button";

export function Profile() {
  function handleSubmit() {
    if(stage.get("numPairsGenerated") < minPairsLabeled) {
      alert("Please complete at least "+minPairsLabeled+" pairs before submitting.");
      return;
    }
    player.set("numPairsEvaluated", stage.get("numPairsGenerated"))
    player.stage.set("submit", true);
  }

  const player = usePlayer();
  const round = useRound();
  const stage = useStage();
  const minPairsLabeled = 20; 


  const score = stage.get("numPairsGenerated") || 0;

  return (
    <div className="min-w-lg md:min-w-2xl m-x-auto px-3 py-2 text-gray-500 bg-gray-100 rounded-b-md grid grid-cols-3 items-center shadow-sm flex-shrink-0 overflow-auto flex-none">
      <div className="leading-tight ml-3">
        {/* <div className="text-gray-500 font-medium">
          {round ? round.get("name") : ""}
        </div> */}
        {/* <div className="text-empirica-400">
          {stage ? stage.get("name") : ""}
        </div> */}
        <Button color="#ff5c5c" handleClick={handleSubmit}>I'm done labeling</Button>
      </div>

      {/* <Timer /> */}

      <div className="flex space-x-3 items-center justify-end">
        <div className="flex flex-col items-center space-y-0.5">
          <div className="text-2xl font-semibold leading-none font-mono">
            {score}
          </div>
          <h1 className="text-xs font-semibold uppercase tracking-wider leading-none text-gray-400">
            Image pairs completed (min. {minPairsLabeled}, max. 100)
          </h1>
          
        </div>
        {/* <div className="h-11 w-11">
          <Avatar player={player} />
        </div> */}
      </div>
    </div>
  );
}
