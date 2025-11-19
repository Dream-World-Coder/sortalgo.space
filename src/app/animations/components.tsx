"use client";

import { Dispatch, SetStateAction } from "react";
import { LegendMarker } from "./types";

export const validateAndParse = (str: string): number[] | null => {
  try {
    const nums = str.split(",").map((s) => {
      const num = parseFloat(s.trim());
      if (isNaN(num)) throw new Error("Invalid number");
      return num;
    });
    if (nums.length < 2) throw new Error("At least 2 numbers required");
    if (nums.length > 50) throw new Error("Maximum 50 numbers allowed");
    return nums;
  } catch {
    return null;
  }
};

export function Heading({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-6 border-b border-gray-300 pb-4">
      <h1 className="text-xl font-serif mb-2">{title}</h1>
      <p className="text-sm text-gray-600 font-serif">{subtitle}</p>
    </div>
  );
}

export function ArrayInput({
  input,
  setInputAction,
  error,
}: {
  input: string;
  setInputAction: Dispatch<SetStateAction<string>>;
  error: string;
}) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-serif mb-2">
        Input Array (comma-separated):
      </label>
      <input
        type="text"
        value={input}
        onChange={(e) => setInputAction(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 text-sm font-mono"
        placeholder="e.g., 64, 34, 25, 12, 22, 11, 90"
      />
      {error && <p className="text-sm text-red-600 mt-1 font-serif">{error}</p>}
    </div>
  );
}

export function StepBtns({
  stepsLen,
  currentStep,
  setCurrentStepAction,
}: {
  stepsLen: number;
  currentStep: number;
  setCurrentStepAction: Dispatch<SetStateAction<number>>;
}) {
  return (
    <>
      <button
        onClick={() => setCurrentStepAction(Math.max(0, currentStep - 1))}
        disabled={currentStep === 0}
        className="px-4 py-2 border border-black text-sm font-serif disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      <button
        onClick={() =>
          setCurrentStepAction(Math.min(stepsLen - 1, currentStep + 1))
        }
        disabled={currentStep === stepsLen - 1}
        className="px-4 py-2 border border-black text-sm font-serif disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Next
      </button>
      <button
        onClick={() => setCurrentStepAction(0)}
        className="px-4 py-2 border border-black text-sm font-serif"
      >
        Reset
      </button>
    </>
  );
}

export function StepsProgressInput({
  stepsLen,
  currentStep,
  setCurrentStepAction,
}: {
  stepsLen: number;
  currentStep: number;
  setCurrentStepAction: Dispatch<SetStateAction<number>>;
}) {
  return (
    <div className="flex items-center gap-4 mb-4">
      <input
        type="range"
        min="0"
        max={stepsLen - 1}
        value={currentStep}
        onChange={(e) => setCurrentStepAction(parseInt(e.target.value))}
        className="flex-1"
      />
      <span className="text-sm font-mono">
        Step {currentStep + 1} / {stepsLen}
      </span>
    </div>
  );
}

export function Legend({ markers }: { markers: LegendMarker[] }) {
  return (
    <div className="text-xs font-serif text-gray-600 border-t border-gray-300 pt-4">
      <p className="mb-1">
        <strong>Legend:</strong>{" "}
        {markers.map((itm, idx) => (
          <i key={idx}>
            <span
              style={{
                display: "inline-block",
                width: "20px",
                height: "3px",
                backgroundColor: itm.fill,
                verticalAlign: "middle",
              }}
            ></span>{" "}
            {itm.name}{" "}
            {idx !== markers.length - 1 && (
              <span className="font-sans not-italic">|</span>
            )}{" "}
          </i>
        ))}
      </p>
    </div>
  );
}
