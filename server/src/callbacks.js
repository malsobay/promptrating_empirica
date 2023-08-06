import { ClassicListenersCollector } from "@empirica/core/admin/classic";
export const Empirica = new ClassicListenersCollector();
import {sample} from "lodash";
import imagepaths from "./imagepaths.json";

function randomAWSImageURL(refImage) {
  const generatedImageId = sample(imagepaths[refImage])
  return "https://prompteng.s3.us-east-2.amazonaws.com/images/"+refImage+"_generated_image_"+generatedImageId+".png";
}

Empirica.onGameStart(({ game }) => {
  const round = game.addRound({
    name: "Image Pairs",
  });
  round.addStage({ name: "stage", duration: 99999 });
});

Empirica.onRoundStart(({ round }) => {});

Empirica.onStageStart(({ stage }) => {
  const refImage = stage.currentGame.get("treatment").refImage;
  stage.set("leftImageURL", randomAWSImageURL(refImage));
  stage.set("rightImageURL", randomAWSImageURL(refImage));
  stage.set("numPairsGenerated", 0);
  stage.set("ratings", []);
});

Empirica.onStageEnded(({ stage }) => {
});

Empirica.onRoundEnded(({ round }) => {});

Empirica.onGameEnded(({ game }) => {});

