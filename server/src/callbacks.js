import { ClassicListenersCollector } from "@empirica/core/admin/classic";
export const Empirica = new ClassicListenersCollector();

Empirica.onGameStart(({ game }) => {
  const round = game.addRound({
    name: "Image Pairs",
  });
  round.addStage({ name: "stage", duration: 9999999999 });
});

Empirica.onRoundStart(({ round }) => {});

Empirica.onStageStart(({ stage }) => {
  stage.set("leftImageIndex", 10);
  stage.set("rightImageIndex", 1);
  stage.set("numPairsGenerated", 0);
  stage.set("ratings", []);
});

Empirica.onStageEnded(({ stage }) => {
});

Empirica.onRoundEnded(({ round }) => {});

Empirica.onGameEnded(({ game }) => {});

