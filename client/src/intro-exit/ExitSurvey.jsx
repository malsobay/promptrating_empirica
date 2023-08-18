import { usePlayer, useStage } from "@empirica/core/player/classic/react";
import React, { useState } from "react";
import { Alert } from "../components/Alert";
import { Button } from "../components/Button";

export function ExitSurvey({ next }) {
  const labelClassName = "block text-sm font-medium text-gray-700 my-2";
  const inputClassName =
    "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-empirica-500 focus:border-empirica-500 sm:text-sm";
  const player = usePlayer();
  const stage = useStage();

  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [strength, setStrength] = useState("");
  const [fair, setFair] = useState("");
  const [feedback, setFeedback] = useState("");
  const [education, setEducation] = useState("");

  function handleSubmit(event) {
    event.preventDefault()
    player.set("exitSurvey", {
      age,
      gender,
      strength,
      fair,
      feedback,
      education,
    });
    next();
  }

  function handleEducationChange(e) {
    setEducation(e.target.value);
  }

  return (
    <div className="py-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <Alert title="Bonus">
        {(player.get("failedAttentionCheck") & player.get("numPairsEvaluated") < 20) ? 
        <p>You failed an attention check before completing the minimum 20 evaluations. Please return the task.</p>
        :
        <div>
        <p>
          Please submit the following code on Prolific:{" "}
          <strong>C7Q3P1I2</strong>
        </p>
        <p className="pt-1">
          Your total earnings for evaluating <strong>{player.get("numPairsEvaluated")} pairs</strong> is{" "}
          <strong>${(player.get("numPairsEvaluated")*0.02).toFixed(2)}</strong> -- you will receive $0.40 as base pay for the task, and ${((player.get("numPairsEvaluated")-20)*0.02).toFixed(2)} as a bonus.
        </p>
        </div>
        }
      </Alert>

      <form
        className="mt-12 space-y-8 divide-y divide-gray-200"
        onSubmit={handleSubmit}
      >
        <div className="space-y-8 divide-y divide-gray-200">
          <div>
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Exit Survey
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Please answer the following short survey. You do not have to
                provide any information you feel uncomfortable with.
              </p>
            </div>

            <div className="space-y-8 mt-6">

              <div className="grid grid-cols-3 gap-x-6 gap-y-3">
                <label className={labelClassName}>
                  Feedback, including any problems you encountered.
                </label>

                <textarea
                  className={inputClassName}
                  dir="auto"
                  id="feedback"
                  name="feedback"
                  rows={4}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
              </div>

              <div className="mb-12">
                <Button type="submit">Submit</Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export function Radio({ selected, name, value, label, onChange }) {
  return (
    <label className="text-sm font-medium text-gray-700">
      <input
        className="mr-2 shadow-sm sm:text-sm"
        type="radio"
        name={name}
        value={value}
        checked={selected === value}
        onChange={onChange}
      />
      {label}
    </label>
  );
}
