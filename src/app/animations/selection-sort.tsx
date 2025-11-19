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

export default function SelectionSortAnim() {
  const [input, setInput] = useState<string>("64, 34, 25, 12, 22, 11, 90");
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const markers: LegendMarker[] = [
    { name: "Minimum", fill: "#ff0000" },
    { name: "Comparing", fill: "#00ff00" },
    { name: "Sorted", fill: "#0000ff" },
    { name: "Default", fill: "#171717" },
  ];

  const selectionSort = (arr: number[], history: Step[]) => {
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;

      history.push({
        array: [...arr],
        pivot: minIdx,
        comparing: [],
        sorted: Array.from({ length: i }, (_, idx) => idx),
        log: `Starting pass ${i + 1}: Assuming minimum is ${arr[minIdx]} at index ${minIdx}`,
      });

      for (let j = i + 1; j < n; j++) {
        history.push({
          array: [...arr],
          pivot: minIdx,
          comparing: [j],
          sorted: Array.from({ length: i }, (_, idx) => idx),
          log: `Comparing ${arr[j]} with current minimum ${arr[minIdx]}`,
        });

        if (arr[j] < arr[minIdx]) {
          minIdx = j;
          history.push({
            array: [...arr],
            pivot: minIdx,
            comparing: [j],
            sorted: Array.from({ length: i }, (_, idx) => idx),
            log: `Found new minimum: ${arr[minIdx]} at index ${minIdx}`,
          });
        }
      }

      if (minIdx !== i) {
        const temp = arr[i];
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        history.push({
          array: [...arr],
          pivot: i,
          comparing: [],
          sorted: Array.from({ length: i + 1 }, (_, idx) => idx),
          log: `Swapped ${arr[i]} and ${temp}: Placed ${arr[i]} at position ${i}`,
        });
      } else {
        history.push({
          array: [...arr],
          pivot: i,
          comparing: [],
          sorted: Array.from({ length: i + 1 }, (_, idx) => idx),
          log: `Minimum already in correct position at ${i}`,
        });
      }
    }
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
        pivot: -1,
        comparing: [],
        sorted: [],
        log: "Initial array state",
      },
    ];
    selectionSort(arr, history);
    history.push({
      array: arr,
      pivot: -1,
      comparing: [],
      sorted: Array.from({ length: arr.length }, (_, i) => i),
      log: "Array sorted completely",
    });

    setSteps(history);
    setCurrentStep(0);
  };

  const currentState = steps[currentStep] || {
    array: [],
    pivot: -1,
    comparing: [],
    sorted: [],
    log: "",
  };
  const maxVal = Math.max(
    ...(currentState.array.length ? currentState.array : [1]),
  );

  return (
    <div className="w-full max-w-4xl mx-auto p-8 bg-white text-black">
      <Heading
        title="Selection Sort Algorithm Visualization"
        subtitle="A step-by-step visualization of the selection sort process"
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
              let fill = "#171717";
              if (currentState.sorted.includes(idx)) fill = "#0000ff";
              else if (currentState.pivot === idx) fill = "#ff0000";
              else if (currentState.comparing?.includes(idx)) fill = "#00ff00";

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
