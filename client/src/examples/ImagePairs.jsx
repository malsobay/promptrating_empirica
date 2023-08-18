import {
  usePlayer,
  usePlayers,
  useStage,
  useGame
} from "@empirica/core/player/classic/react";
import React from "react";
import imagepaths from "./imagepaths.json";
import {sample} from "lodash";

export function ImagePairs() {
  const player = usePlayer();
  const players = usePlayers();
  const stage = useStage();
  const game = useGame();
  const treatment = game.get("treatment"); 
  const refImage = treatment.refImage;
  const refImageURL = "https://prompteng.s3.us-east-2.amazonaws.com/reference_images/"+refImage+".jpeg"
  const maxPairsLabeled = 100; 

  function handleSubmit() {
    player.stage.set("submit", true);
  }

  function randomAWSImageURL(refImage) {
    const generatedImageId = sample(imagepaths[refImage])
    return "https://prompteng.s3.us-east-2.amazonaws.com/images/"+refImage+"_generated_image_"+generatedImageId+".png";
  }

  function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generateNewPair() {
    stage.set("numPairsGenerated", stage.get("numPairsGenerated")+1);
    if(stage.get("numPairsGenerated") >= maxPairsLabeled) {
      handleSubmit();
    }
    stage.set("leftImageURL", randomAWSImageURL(refImage));
    stage.set("rightImageURL", randomAWSImageURL(refImage));
    if (stage.get("leftImageURL") === stage.get("rightImageURL")) {
      stage.set("rightImageURL", randomAWSImageURL(refImage));
    }
  }

  function isAttentionCheck() {
    stage.set("numPairsGenerated", stage.get("numPairsGenerated")+1);
    stage.set("leftImageURL", Math.random() < 0.5 ? "images/correct.png" : "images/wrong.png");
    stage.set("rightImageURL", stage.get("leftImageURL") == "images/correct.png" ? "images/wrong.png" : "images/correct.png");
  }
  
  function chooseLeft() {
    stage.set("ratings", [...stage.get("ratings"), {leftIndex: stage.get("leftImageURL"), rightIndex: stage.get("rightImageURL"), choice: "left", timestamp: Date.now()}]);
    if (stage.get("leftImageURL") == "images/wrong.png") {
      handleSubmit();
    }
    if (Math.random() < 0.1) {
      isAttentionCheck();
    } else {
      generateNewPair(); 
    }
  }

  function chooseRight() {
    if (stage.get("rightImageURL") == "images/wrong.png") {
      handleSubmit();
    }
    stage.set("ratings", [...stage.get("ratings"), {leftIndex: stage.get("leftImageURL"), rightIndex: stage.get("rightImageURL"), choice: "right", timestamp: Date.now()}]);
    if (Math.random() < 0.1) {
      isAttentionCheck();
    } else {
      generateNewPair(); 
    }
  }

  return (
    <div className="md:min-w-96 lg:min-w-128 xl:min-w-192 flex flex-col items-center space-y-10">
      <img src={refImageURL} width="300"/>
      <h2>Please click the image below that most closely resembles the reference image above:</h2>
        <div className="flex">
        <img src={stage.get("leftImageURL")} width="200" style={{margin:50}} onClick={chooseLeft}/>
        
        <img src={stage.get("rightImageURL")} width="200" style={{margin:50}} onClick={chooseRight}/>
        </div>
    </div>    
  );
}
