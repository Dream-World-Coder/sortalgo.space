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

export default function InsertionSortAnim() {
  const [input, setInput] = useState<string>("64, 34, 25, 12, 22, 11, 90");
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const markers: LegendMarker[] = [
    { name: "Key", fill: "#ff0000" },
    { name: "Comparing", fill: "#00ff00" },
    { name: "Sorted", fill: "#0000ff" },
    { name: "Default", fill: "#171717" },
  ];

  const insertionSort = (arr: number[], history: Step[]) => {
    const n = arr.length;

    for (let i = 1; i < n; i++) {
      const key = arr[i];

      history.push({
        array: [...arr],
        pivot: i,
        comparing: [],
        sorted: Array.from({ length: i }, (_, idx) => idx),
        log: `Selecting key: ${key} at index ${i}`,
      });

      let j = i - 1;

      while (j >= 0 && arr[j] > key) {
        history.push({
          array: [...arr],
          pivot: i,
          comparing: [j],
          sorted: Array.from({ length: i }, (_, idx) => idx),
          log: `Comparing ${arr[j]} with key ${key}: ${arr[j]} > ${key}, shifting right`,
        });

        arr[j + 1] = arr[j];
        j--;

        history.push({
          array: [...arr],
          pivot: j + 1,
          comparing: [],
          sorted: Array.from({ length: i }, (_, idx) => idx),
          log: `Shifted ${arr[j + 2]} to position ${j + 2}`,
        });
      }

      if (j >= 0) {
        history.push({
          array: [...arr],
          pivot: i,
          comparing: [j],
          sorted: Array.from({ length: i }, (_, idx) => idx),
          log: `Comparing ${arr[j]} with key ${key}: ${arr[j]} <= ${key}, found position`,
        });
      }

      arr[j + 1] = key;

      history.push({
        array: [...arr],
        pivot: j + 1,
        comparing: [],
        sorted: Array.from({ length: i + 1 }, (_, idx) => idx),
        log: `Inserted ${key} at position ${j + 1}`,
      });
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
    insertionSort(arr, history);
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
        title="Insertion Sort Algorithm Visualization"
        subtitle="A step-by-step visualization of the insertion sort process"
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
            steps={steps}
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
              else if (currentState.comparing.includes(idx)) fill = "#00ff00";

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
            steps={steps}
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
