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

export default function BubbleSortAnim() {
  const [input, setInput] = useState<string>("64, 34, 25, 12, 22, 11, 90");
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const markers: LegendMarker[] = [
    { name: "Swapped", fill: "#ff0000" },
    { name: "Comparing", fill: "#00ff00" },
    { name: "Sorted", fill: "#0000ff" },
    { name: "Default", fill: "#171717" },
  ];

  const bubbleSort = (arr: number[], history: Step[]) => {
    const n = arr.length;
    let swapped;

    for (let i = 0; i < n - 1; i++) {
      swapped = false;

      history.push({
        array: [...arr],
        pivot: -1,
        comparing: [],
        sorted: Array.from({ length: i }, (_, idx) => n - 1 - idx),
        log: `Pass ${i + 1}: Bubbling largest element to position ${n - 1 - i}`,
      });

      for (let j = 0; j < n - i - 1; j++) {
        history.push({
          array: [...arr],
          pivot: -1,
          comparing: [j, j + 1],
          sorted: Array.from({ length: i }, (_, idx) => n - 1 - idx),
          log: `Comparing ${arr[j]} and ${arr[j + 1]}`,
        });

        if (arr[j] > arr[j + 1]) {
          const temp = arr[j];
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          swapped = true;

          history.push({
            array: [...arr],
            pivot: j + 1,
            comparing: [j, j + 1],
            sorted: Array.from({ length: i }, (_, idx) => n - 1 - idx),
            log: `${temp} > ${arr[j]}: Swapped ${temp} and ${arr[j]}`,
          });
        }
      }

      history.push({
        array: [...arr],
        pivot: -1,
        comparing: [],
        sorted: Array.from({ length: i + 1 }, (_, idx) => n - 1 - idx),
        log: `Element ${arr[n - 1 - i]} is now in sorted position ${n - 1 - i}`,
      });

      if (!swapped) {
        history.push({
          array: [...arr],
          pivot: -1,
          comparing: [],
          sorted: Array.from({ length: n }, (_, idx) => idx),
          log: "No swaps made - array is already sorted",
        });
        break;
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
    bubbleSort(arr, history);
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
        title="Bubble Sort Algorithm Visualization"
        subtitle="A step-by-step visualization of the bubble sort process"
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
