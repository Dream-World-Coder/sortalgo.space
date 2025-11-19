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

export default function QuicksortAnim() {
  const [input, setInput] = useState<string>("64, 34, 25, 12, 22, 11, 90");
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const markers: LegendMarker[] = [
    { name: "Pivot", fill: "#ff0000" },
    { name: "Comparing", fill: "#00ff00" },
    { name: "Sorted", fill: "#0000ff" },
    { name: "Default", fill: "#171717" },
  ];

  const quicksort = (
    arr: number[],
    low: number,
    high: number,
    history: Step[],
  ) => {
    if (low < high) {
      const pi = partition(arr, low, high, history);
      quicksort(arr, low, pi - 1, history);
      quicksort(arr, pi + 1, high, history);
    }
  };

  const partition = (
    arr: number[],
    low: number,
    high: number,
    history: Step[],
  ): number => {
    const pivot = arr[high];
    let i = low - 1;

    history.push({
      array: [...arr],
      pivot: high,
      comparing: [],
      sorted: [],
      log: `Selected pivot: ${pivot} at index ${high}`,
    });

    for (let j = low; j < high; j++) {
      history.push({
        array: [...arr],
        pivot: high,
        comparing: [j],
        sorted: [],
        log: `Comparing ${arr[j]} with pivot ${pivot}`,
      });

      if (arr[j] < pivot) {
        i++;
        const temp = arr[i];
        [arr[i], arr[j]] = [arr[j], arr[i]];
        history.push({
          array: [...arr],
          pivot: high,
          comparing: [i, j],
          sorted: [],
          log: `${arr[j]} < ${pivot}: Swapped ${temp} and ${arr[j]}`,
        });
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    history.push({
      array: [...arr],
      pivot: i + 1,
      comparing: [],
      sorted: [],
      log: `Placed pivot ${pivot} at final position ${i + 1}`,
    });

    return i + 1;
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
    quicksort(arr, 0, arr.length - 1, history);
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
        title="Quicksort Algorithm Visualization"
        subtitle="A step-by-step visualization of the quicksort partitioning process"
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
              if (currentState.sorted.includes(idx))
                fill = "#0000ff"; // sorted blue
              else if (currentState.pivot === idx)
                fill = "#ff0000"; // pivot red
              else if (currentState.comparing?.includes(idx)) fill = "#00ff00"; // comparing green

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
