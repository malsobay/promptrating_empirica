import { Chat, useGame } from "@empirica/core/player/classic/react";

import React from "react";
import { Profile } from "./Profile";
import { Stage } from "./Stage";

export function Game() {
  const game = useGame();
  return (
    <div className="h-full w-full flex">
      <div className="h-full w-full flex flex-col space-y-5">
        <Profile />
        <div className="h-full flex items-center justify-center overflow-auto h-auto">
          <Stage />
        </div>
      </div>
    </div>
  );
}
