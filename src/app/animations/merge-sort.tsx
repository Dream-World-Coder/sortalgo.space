"use client";

import { useState } from "react";
import type { Step, LegendMarker } from "./types";
import {
  validateAndParse,
  Legend,
  Heading,
  ArrayInput,
  StepBtns,
  StepsProgressInput,
} from "./components";

export default function MergesortAnim() {
  const [input, setInput] = useState<string>("38, 27, 43, 3, 9, 82, 10");
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const markers: LegendMarker[] = [
    { name: "Dividing", fill: "#ff0000" },
    { name: "Merging", fill: "#00ff00" },
    { name: "Sorted", fill: "#0000ff" },
    { name: "Default", fill: "#171717" },
  ];

  const mergeSort = (
    arr: number[],
    start: number,
    end: number,
    history: Step[],
    fullArray: number[],
  ) => {
    if (start >= end) return;

    const mid = Math.floor((start + end) / 2);

    // Log division
    const dividingIndices = [];
    for (let i = start; i <= end; i++) {
      dividingIndices.push(i);
    }
    history.push({
      array: [...fullArray],
      dividing: dividingIndices,
      merging: [],
      sorted: [],
      log: `Dividing array segment [${start}..${end}]: [${arr.slice(start, end + 1).join(", ")}]`,
    });

    // Recursively sort left half
    mergeSort(arr, start, mid, history, fullArray);

    // Recursively sort right half
    mergeSort(arr, mid + 1, end, history, fullArray);

    // Merge the two halves
    merge(arr, start, mid, end, history, fullArray);
  };

  const merge = (
    arr: number[],
    start: number,
    mid: number,
    end: number,
    history: Step[],
    fullArray: number[],
  ) => {
    const left = arr.slice(start, mid + 1);
    const right = arr.slice(mid + 1, end + 1);

    const mergingIndices = [];
    for (let i = start; i <= end; i++) {
      mergingIndices.push(i);
    }

    history.push({
      array: [...fullArray],
      dividing: [],
      merging: mergingIndices,
      sorted: [],
      log: `Merging segments: [${left.join(", ")}] and [${right.join(", ")}]`,
    });

    let i = 0,
      j = 0,
      k = start;

    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) {
        history.push({
          array: [...fullArray],
          dividing: [],
          merging: mergingIndices,
          sorted: [],
          log: `Comparing ${left[i]} ≤ ${right[j]}: placing ${left[i]} at position ${k}`,
        });
        arr[k] = left[i];
        fullArray[k] = left[i];
        i++;
      } else {
        history.push({
          array: [...fullArray],
          dividing: [],
          merging: mergingIndices,
          sorted: [],
          log: `Comparing ${left[i]} > ${right[j]}: placing ${right[j]} at position ${k}`,
        });
        arr[k] = right[j];
        fullArray[k] = right[j];
        j++;
      }
      k++;
    }

    while (i < left.length) {
      history.push({
        array: [...fullArray],
        dividing: [],
        merging: mergingIndices,
        sorted: [],
        log: `Placing remaining element ${left[i]} from left segment at position ${k}`,
      });
      arr[k] = left[i];
      fullArray[k] = left[i];
      i++;
      k++;
    }

    while (j < right.length) {
      history.push({
        array: [...fullArray],
        dividing: [],
        merging: mergingIndices,
        sorted: [],
        log: `Placing remaining element ${right[j]} from right segment at position ${k}`,
      });
      arr[k] = right[j];
      fullArray[k] = right[j];
      j++;
      k++;
    }

    history.push({
      array: [...fullArray],
      dividing: [],
      merging: [],
      sorted: mergingIndices,
      log: `Completed merge of segment [${start}..${end}]: [${arr.slice(start, end + 1).join(", ")}]`,
    });
  };

  const handleSort = () => {
    const parsed = validateAndParse(input);
    if (!parsed) {
      setError("Invalid input. Enter comma-separated numbers.");
      return;
    }
    setError("");

    const arr = [...parsed];
    const history: Step[] = [
      {
        array: [...arr],
        dividing: [],
        merging: [],
        sorted: [],
        log: "Initial array state",
      },
    ];

    mergeSort(arr, 0, arr.length - 1, history, arr);

    history.push({
      array: arr,
      dividing: [],
      merging: [],
      sorted: Array.from({ length: arr.length }, (_, i) => i),
      log: "Array sorted completely",
    });

    setSteps(history);
    setCurrentStep(0);
  };

  const currentState = steps[currentStep] || {
    array: [],
    dividing: [],
    merging: [],
    sorted: [],
    log: "",
  };
  const maxVal = Math.max(
    ...(currentState.array.length ? currentState.array : [1]),
  );

  return (
    <div className="w-full max-w-4xl mx-auto p-8 bg-white text-black">
      <Heading
        title="Merge Sort Algorithm Visualization"
        subtitle="A step-by-step visualization of the merge sort divide-and-conquer process"
      />

      <ArrayInput input={input} setInputAction={setInput} error={error} />

      <div className="flex gap-2 mb-8">
        <button
          onClick={handleSort}
          className="px-4 py-2 bg-black text-white text-sm font-serif"
        >
          Sort
        </button>
        {steps.length > 0 && (
          <StepBtns
            stepsLen={steps.length}
            currentStep={currentStep}
            setCurrentStepAction={setCurrentStep}
          />
        )}
      </div>

      {steps.length > 0 && (
        <>
          <div className="mb-6 h-64 flex items-end justify-center gap-1 border border-gray-300 p-4">
            {currentState.array.map((val: number, idx: number) => {
              let fill = markers[3].fill;
              if (currentState.sorted.includes(idx)) fill = markers[2].fill;
              else if (currentState.merging?.includes(idx))
                fill = markers[1].fill;
              else if (currentState.dividing?.includes(idx))
                fill = markers[0].fill;

              return (
                <div key={idx} className="flex flex-col items-center gap-1">
                  <div
                    style={{
                      height: `${(val / maxVal) * 200}px`,
                      width: "8px",
                      backgroundColor: fill,
                    }}
                  />
                  <span className="text-xs font-mono">{val}</span>
                </div>
              );
            })}
          </div>

          <StepsProgressInput
            stepsLen={steps.length}
            currentStep={currentStep}
            setCurrentStepAction={setCurrentStep}
          />

          <div className="mb-4 p-3 border border-gray-300 bg-gray-50">
            <p className="text-sm font-mono">{currentState.log}</p>
          </div>

          <Legend markers={markers} />
        </>
      )}
    </div>
  );
}
