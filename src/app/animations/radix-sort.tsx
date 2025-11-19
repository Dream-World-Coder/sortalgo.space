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

export default function RadixsortAnim() {
  const [input, setInput] = useState<string>("170, 45, 75, 90, 802, 24, 2, 66");
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const markers: LegendMarker[] = [
    { name: "Examining", fill: "#10b981" },
    { name: "Bucketing", fill: "#8b5cf6" },
    { name: "Sorted", fill: "#0000ff" },
    { name: "Default", fill: "#171717" },
  ];

  const getMax = (arr: number[]): number => {
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
        max = arr[i];
      }
    }
    return max;
  };

  const countingSort = (arr: number[], exp: number, history: Step[]) => {
    const n = arr.length;
    const output = new Array(n);
    const count = new Array(10).fill(0);

    const digitName =
      exp === 1
        ? "ones"
        : exp === 10
          ? "tens"
          : exp === 100
            ? "hundreds"
            : exp === 1000
              ? "thousands"
              : `${exp}s`;

    history.push({
      array: [...arr],
      examining: [],
      bucketing: [],
      sorted: [],
      log: `Processing ${digitName} place (divisor: ${exp}). Counting digit occurrences.`,
    });

    // Store count of occurrences
    for (let i = 0; i < n; i++) {
      const digit = Math.floor(arr[i] / exp) % 10;
      history.push({
        array: [...arr],
        examining: [i],
        bucketing: [],
        sorted: [],
        log: `Examining ${arr[i]} at index ${i}: digit at ${digitName} place is ${digit}`,
      });
      count[digit]++;
    }

    history.push({
      array: [...arr],
      examining: [],
      bucketing: [],
      sorted: [],
      log: `Digit count for ${digitName} place: [${count.join(", ")}]. Computing cumulative positions.`,
    });

    // Change count[i] to contain actual position
    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }

    history.push({
      array: [...arr],
      examining: [],
      bucketing: [],
      sorted: [],
      log: `Cumulative positions: [${count.join(", ")}]. Placing elements in output array.`,
    });

    // Build output array
    for (let i = n - 1; i >= 0; i--) {
      const digit = Math.floor(arr[i] / exp) % 10;
      const position = count[digit] - 1;

      history.push({
        array: [...arr],
        examining: [i],
        bucketing: [],
        sorted: [],
        log: `Placing ${arr[i]} (digit ${digit}) at position ${position} in output array`,
      });

      output[position] = arr[i];
      count[digit]--;
    }

    // Copy output array to arr
    for (let i = 0; i < n; i++) {
      arr[i] = output[i];
    }

    const bucketIndices = Array.from({ length: n }, (_, i) => i);
    history.push({
      array: [...arr],
      examining: [],
      bucketing: bucketIndices,
      sorted: [],
      log: `After sorting by ${digitName} place: [${arr.join(", ")}]`,
    });
  };

  const radixSort = (arr: number[], history: Step[]) => {
    const max = getMax(arr);

    history.push({
      array: [...arr],
      examining: [],
      bucketing: [],
      sorted: [],
      log: `Maximum element is ${max}. Will sort digit by digit from least significant to most significant.`,
    });

    // Do counting sort for every digit
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
      countingSort(arr, exp, history);
    }
  };

  const handleSort = () => {
    const parsed = validateAndParse(input);
    if (!parsed) {
      setError("Invalid input. Enter comma-separated non-negative integers.");
      return;
    }
    setError("");

    const arr = [...parsed];
    const history: Step[] = [
      {
        array: [...arr],
        examining: [],
        bucketing: [],
        sorted: [],
        log: "Initial array state",
      },
    ];

    radixSort(arr, history);

    history.push({
      array: arr,
      examining: [],
      bucketing: [],
      sorted: Array.from({ length: arr.length }, (_, i) => i),
      log: "Array sorted completely using radix sort",
    });

    setSteps(history);
    setCurrentStep(0);
  };

  const currentState = steps[currentStep] || {
    array: [],
    examining: [],
    bucketing: [],
    sorted: [],
    log: "",
  };
  const maxVal = Math.max(
    ...(currentState.array.length ? currentState.array : [1]),
  );

  return (
    <div className="w-full max-w-4xl mx-auto p-8 bg-white text-black">
      <Heading
        title="Radix Sort Algorithm Visualization"
        subtitle="A step-by-step visualization of the radix sort process using counting sort"
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
              else if (currentState.bucketing?.includes(idx)) fill = "#8b5cf6";
              else if (currentState.examining?.includes(idx)) fill = "#10b981";

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
