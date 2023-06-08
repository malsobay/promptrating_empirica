import {
  Slider,
  usePlayer,
  usePlayers,
  useStage,
} from "@empirica/core/player/classic/react";
import React from "react";
import { Avatar } from "../components/Avatar";
import { Button } from "../components/Button";

export function ImagePairs() {
  const player = usePlayer();
  const players = usePlayers();
  const stage = useStage();

  function handleSubmit() {
    player.stage.set("submit", true);
  }

  function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generateNewPair() {
    stage.set("numPairsGenerated", stage.get("numPairsGenerated")+1);
    stage.set("leftImageIndex", randomInteger(1,15));
    stage.set("rightImageIndex", randomInteger(1,15));
    if (stage.get("leftImageIndex") === stage.get("rightImageIndex")) {
      stage.set("rightImageIndex", randomInteger(1,15));
    }
  }

  function isAttentionCheck() {
    stage.set("numPairsGenerated", stage.get("numPairsGenerated")+1);
    stage.set("leftImageIndex", Math.random() < 0.5 ? "correct.png" : "wrong.png");
    stage.set("rightImageIndex", stage.get("leftImageIndex") == "correct.png" ? "wrong.png" : "correct.png");
  }

  function chooseLeft() {
    stage.append("ratings", {leftIndex: stage.get("leftImageIndex"), rightIndex: stage.get("rightImageIndex"), choice: "left"});
    if (Math.random() < 0.1) {
      isAttentionCheck();
    } else {
      generateNewPair(); 
    }
  }

  function chooseRight() {
    stage.append("ratings", {leftIndex: stage.get("leftImageIndex"), rightIndex: stage.get("rightImageIndex"), choice: "right"});
    if (Math.random() < 0.1) {
      isAttentionCheck();
    } else {
      generateNewPair(); 
    }
  }

  return (
    <div className="md:min-w-96 lg:min-w-128 xl:min-w-192 flex flex-col items-center space-y-10">
      <img src="https://uploads8.wikiart.org/00243/images/clementine-hunter/2016-28-11.jpg!Large.jpg" width="300"/>
      <h2>Please click the image below that most closely resembles the reference image above:</h2>
        <div className="flex">
        <img src={"images/image_"+stage.get("leftImageIndex")} width="200" style={{margin:50}} onClick={chooseLeft}/>
        
        <img src={"images/image_"+stage.get("rightImageIndex")} width="200" style={{margin:50}} onClick={chooseRight}/>
        </div>
    </div>    
  );
}
