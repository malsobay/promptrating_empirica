import React from "react";
import { Button } from "../components/Button";

export function Introduction({ next }) {
  return (
    <div className="mt-3 sm:mt-5 p-20">
      <h3 className="text-lg leading-1 font-medium text-gray-900">
        Image Similarity Task
      </h3>
      <div className="mt-2 mb-6 text-gray-500">
        <ul>
            <li>In this task, you will be shown a series of pairs of images, and asked to <strong>select the image that is more visually similar to the reference image above by clicking on it.</strong></li>
        </ul>
      </div>
      <br/><br/><br/>
      <h3 className="text-lg leading-6 font-medium text-gray-900">
        Please note the following: 
      </h3>
      <div className="mt-2 mb-6 text-gray-500">
        <ul className="list-decimal pl-5">
            <li>To enable the "I'm done labeling" button and receive a submission code, you must evaluate at least 20 image pairs. You can continue to evaluate up to 100 pairs, and will receive $0.02 for each image pair you evaluate.</li>
            <li>Once you'd like to end your participation in the task, press "I'm done labeling" to receive your submission code.</li>
            <li>Image pairs may take a moment to load; please wait a second or two before selecting an image.</li>
            <li>At random points in the task, you may be presented with an attention check with explicit instructions for which image to pick. Failing an attention check ends your participation in the task.</li>
        </ul>
      </div>
      <Button handleClick={next} autoFocus>
        <p>Next</p>
      </Button>
    </div>
  );
}
