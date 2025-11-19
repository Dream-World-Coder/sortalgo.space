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

export default function HeapsortAnim() {
  const [input, setInput] = useState<string>("12, 11, 13, 5, 6, 7");
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const markers: LegendMarker[] = [
    { name: "Heapifying", fill: "#ff0000" },
    { name: "Swapping", fill: "#00ff00" },
    { name: "Sorted", fill: "#0000ff" },
    { name: "Default", fill: "#171717" },
  ];

  const heapify = (
    arr: number[],
    n: number,
    i: number,
    history: Step[],
    sortedIndices: number[],
  ) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    history.push({
      array: [...arr],
      heapifying: [i],
      swapping: [],
      sorted: [...sortedIndices],
      log: `Heapifying at index ${i} (value: ${arr[i]}). Checking children.`,
    });

    if (left < n) {
      history.push({
        array: [...arr],
        heapifying: [i, left],
        swapping: [],
        sorted: [...sortedIndices],
        log: `Comparing parent ${arr[i]} at index ${i} with left child ${arr[left]} at index ${left}`,
      });

      if (arr[left] > arr[largest]) {
        largest = left;
      }
    }

    if (right < n) {
      history.push({
        array: [...arr],
        heapifying: [i, right],
        swapping: [],
        sorted: [...sortedIndices],
        log: `Comparing current largest ${arr[largest]} with right child ${arr[right]} at index ${right}`,
      });

      if (arr[right] > arr[largest]) {
        largest = right;
      }
    }

    if (largest !== i) {
      history.push({
        array: [...arr],
        heapifying: [],
        swapping: [i, largest],
        sorted: [...sortedIndices],
        log: `Swapping ${arr[i]} at index ${i} with ${arr[largest]} at index ${largest} to maintain max heap property`,
      });

      [arr[i], arr[largest]] = [arr[largest], arr[i]];

      history.push({
        array: [...arr],
        heapifying: [largest],
        swapping: [],
        sorted: [...sortedIndices],
        log: `After swap: ${arr[i]} is now at index ${i}. Recursively heapifying subtree at index ${largest}`,
      });

      heapify(arr, n, largest, history, sortedIndices);
    } else {
      history.push({
        array: [...arr],
        heapifying: [],
        swapping: [],
        sorted: [...sortedIndices],
        log: `Heap property satisfied at index ${i}. No swap needed.`,
      });
    }
  };

  const heapSort = (arr: number[], history: Step[]) => {
    const n = arr.length;

    // Build max heap
    history.push({
      array: [...arr],
      heapifying: [],
      swapping: [],
      sorted: [],
      log: `Building max heap from array. Starting from last non-leaf node at index ${Math.floor(n / 2) - 1}`,
    });

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(arr, n, i, history, []);
    }

    history.push({
      array: [...arr],
      heapifying: [],
      swapping: [],
      sorted: [],
      log: `Max heap built. Root element ${arr[0]} is the largest. Now extracting elements one by one.`,
    });

    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
      history.push({
        array: [...arr],
        heapifying: [],
        swapping: [0, i],
        sorted: [],
        log: `Swapping root ${arr[0]} with last element ${arr[i]} at index ${i}`,
      });

      [arr[0], arr[i]] = [arr[i], arr[0]];

      const sortedIndices = [];
      for (let j = i; j < n; j++) {
        sortedIndices.push(j);
      }

      history.push({
        array: [...arr],
        heapifying: [],
        swapping: [],
        sorted: sortedIndices,
        log: `Element ${arr[i]} placed in sorted position at index ${i}. Heap size reduced to ${i}`,
      });

      history.push({
        array: [...arr],
        heapifying: [0],
        swapping: [],
        sorted: sortedIndices,
        log: `Heapifying reduced heap of size ${i} starting from root`,
      });

      heapify(arr, i, 0, history, sortedIndices);
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
        heapifying: [],
        swapping: [],
        sorted: [],
        log: "Initial array state",
      },
    ];

    heapSort(arr, history);

    history.push({
      array: arr,
      heapifying: [],
      swapping: [],
      sorted: Array.from({ length: arr.length }, (_, i) => i),
      log: "Array sorted completely",
    });

    setSteps(history);
    setCurrentStep(0);
  };

  const currentState = steps[currentStep] || {
    array: [],
    heapifying: [],
    swapping: [],
    sorted: [],
    log: "",
  };
  const maxVal = Math.max(
    ...(currentState.array.length ? currentState.array : [1]),
  );

  return (
    <div className="w-full max-w-4xl mx-auto p-8 bg-white text-black">
      <Heading
        title="Heap Sort Algorithm Visualization"
        subtitle="A step-by-step visualization of the heap sort process using max heap"
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
              else if (currentState.swapping?.includes(idx))
                fill = markers[1].fill;
              else if (currentState.heapifying?.includes(idx))
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
