"use client";

export default function Anim() {
  return <></>;
}

// import { useState } from "react";

// const MergeSortAnim = () => {
//   const [input, setInput] = useState("64, 34, 25, 12, 22, 11, 90");
//   const [array, setArray] = useState<number[]>([]);
//   const [steps, setSteps] = useState([]);
//   const [currentStep, setCurrentStep] = useState(0);
//   const [error, setError] = useState("");

//   const validateAndParse = (str: string) => {
//     try {
//       const nums = str.split(",").map((s) => {
//         const num = parseFloat(s.trim());
//         if (isNaN(num)) throw new Error("Invalid number");
//         return num;
//       });
//       if (nums.length < 2) throw new Error("At least 2 numbers required");
//       if (nums.length > 50) throw new Error("Maximum 50 numbers allowed");
//       return nums;
//     } catch {
//       return null;
//     }
//   };

//   const mergeSort = (arr, start, end, history) => {
//     if (start >= end) return;

//     const mid = Math.floor((start + end) / 2);

//     history.push({
//       array: [...arr],
//       dividing: [start, mid, end],
//       merging: [],
//       sorted: [],
//       log: `Dividing array: indices ${start} to ${end} (mid: ${mid})`,
//     });

//     mergeSort(arr, start, mid, history);
//     mergeSort(arr, mid + 1, end, history);
//     merge(arr, start, mid, end, history);
//   };

//   const merge = (arr, start, mid, end, history) => {
//     const left = arr.slice(start, mid + 1);
//     const right = arr.slice(mid + 1, end + 1);

//     history.push({
//       array: [...arr],
//       dividing: [],
//       merging: [start, mid, end],
//       sorted: [],
//       log: `Merging subarrays [${start}..${mid}] and [${mid + 1}..${end}]`,
//     });

//     let i = 0,
//       j = 0,
//       k = start;

//     while (i < left.length && j < right.length) {
//       history.push({
//         array: [...arr],
//         dividing: [],
//         merging: [start, mid, end],
//         comparing: [start + i, mid + 1 + j],
//         sorted: [],
//         log: `Comparing ${left[i]} and ${right[j]}`,
//       });

//       if (left[i] <= right[j]) {
//         arr[k] = left[i];
//         history.push({
//           array: [...arr],
//           dividing: [],
//           merging: [start, mid, end],
//           comparing: [],
//           sorted: [],
//           log: `Placed ${left[i]} at index ${k}`,
//         });
//         i++;
//       } else {
//         arr[k] = right[j];
//         history.push({
//           array: [...arr],
//           dividing: [],
//           merging: [start, mid, end],
//           comparing: [],
//           sorted: [],
//           log: `Placed ${right[j]} at index ${k}`,
//         });
//         j++;
//       }
//       k++;
//     }

//     while (i < left.length) {
//       arr[k] = left[i];
//       history.push({
//         array: [...arr],
//         dividing: [],
//         merging: [start, mid, end],
//         comparing: [],
//         sorted: [],
//         log: `Placed remaining ${left[i]} at index ${k}`,
//       });
//       i++;
//       k++;
//     }

//     while (j < right.length) {
//       arr[k] = right[j];
//       history.push({
//         array: [...arr],
//         dividing: [],
//         merging: [start, mid, end],
//         comparing: [],
//         sorted: [],
//         log: `Placed remaining ${right[j]} at index ${k}`,
//       });
//       j++;
//       k++;
//     }

//     history.push({
//       array: [...arr],
//       dividing: [],
//       merging: [],
//       sorted: Array.from({ length: end - start + 1 }, (_, i) => start + i),
//       log: `Merged section [${start}..${end}] is now sorted`,
//     });
//   };

//   const handleSort = () => {
//     const parsed = validateAndParse(input);
//     if (!parsed) {
//       setError("Invalid input. Enter comma-separated numbers.");
//       return;
//     }
//     setError("");

//     const arr = [...parsed];
//     const history = [
//       {
//         array: [...arr],
//         dividing: [],
//         merging: [],
//         comparing: [],
//         sorted: [],
//         log: "Initial array state",
//       },
//     ];
//     mergeSort(arr, 0, arr.length - 1, history);
//     history.push({
//       array: arr,
//       dividing: [],
//       merging: [],
//       comparing: [],
//       sorted: Array.from({ length: arr.length }, (_, i) => i),
//       log: "Array sorted completely",
//     });

//     setArray(parsed);
//     setSteps(history);
//     setCurrentStep(0);
//   };

//   const currentState = steps[currentStep] || {
//     array: [],
//     dividing: [],
//     merging: [],
//     comparing: [],
//     sorted: [],
//     log: "",
//   };
//   const maxVal = Math.max(
//     ...(currentState.array.length ? currentState.array : [1]),
//   );

//   return (
//     <div className="w-full max-w-4xl mx-auto p-8 bg-white text-black">
//       <div className="mb-6 border-b border-gray-300 pb-4">
//         <h1 className="text-xl font-serif mb-2">
//           Merge Sort Algorithm Visualization
//         </h1>
//         <p className="text-sm text-gray-600 font-serif">
//           A step-by-step visualization of the merge sort divide and conquer
//           process
//         </p>
//       </div>

//       <div className="mb-6">
//         <label className="block text-sm font-serif mb-2">
//           Input Array (comma-separated):
//         </label>
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           className="w-full px-3 py-2 border border-gray-300 text-sm font-mono"
//           placeholder="e.g., 64, 34, 25, 12, 22, 11, 90"
//         />
//         {error && (
//           <p className="text-sm text-red-600 mt-1 font-serif">{error}</p>
//         )}
//       </div>

//       <div className="flex gap-2 mb-8">
//         <button
//           onClick={handleSort}
//           className="px-4 py-2 bg-black text-white text-sm font-serif"
//         >
//           Sort
//         </button>
//         {steps.length > 0 && (
//           <>
//             <button
//               onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
//               disabled={currentStep === 0}
//               className="px-4 py-2 border border-black text-sm font-serif disabled:opacity-30 disabled:cursor-not-allowed"
//             >
//               Previous
//             </button>
//             <button
//               onClick={() =>
//                 setCurrentStep(Math.min(steps.length - 1, currentStep + 1))
//               }
//               disabled={currentStep === steps.length - 1}
//               className="px-4 py-2 border border-black text-sm font-serif disabled:opacity-30 disabled:cursor-not-allowed"
//             >
//               Next
//             </button>
//             <button
//               onClick={() => setCurrentStep(0)}
//               className="px-4 py-2 border border-black text-sm font-serif"
//             >
//               Reset
//             </button>
//           </>
//         )}
//       </div>

//       {steps.length > 0 && (
//         <>
//           <div className="mb-6 h-64 flex items-end justify-center gap-1 border border-gray-300 p-4">
//             {currentState.array.map((val, idx) => {
//               let fill = "#000000";
//               if (currentState.sorted.includes(idx)) fill = "#0000ff";
//               else if (currentState.comparing?.includes(idx)) fill = "#00ff00";
//               else if (
//                 currentState.merging.length === 3 &&
//                 idx >= currentState.merging[0] &&
//                 idx <= currentState.merging[2]
//               ) {
//                 fill = "#ffa500";
//               } else if (
//                 currentState.dividing.length === 3 &&
//                 idx >= currentState.dividing[0] &&
//                 idx <= currentState.dividing[2]
//               ) {
//                 fill = "#ff00ff";
//               }

//               return (
//                 <div key={idx} className="flex flex-col items-center gap-1">
//                   <div
//                     style={{
//                       height: `${(val / maxVal) * 200}px`,
//                       width: "8px",
//                       backgroundColor: fill,
//                     }}
//                   />
//                   <span className="text-xs font-mono">{val}</span>
//                 </div>
//               );
//             })}
//           </div>

//           <div className="flex items-center gap-4 mb-4">
//             <input
//               type="range"
//               min="0"
//               max={steps.length - 1}
//               value={currentStep}
//               onChange={(e) => setCurrentStep(parseInt(e.target.value))}
//               className="flex-1"
//             />
//             <span className="text-sm font-mono">
//               Step {currentStep + 1} / {steps.length}
//             </span>
//           </div>

//           <div className="mb-4 p-3 border border-gray-300 bg-gray-50">
//             <p className="text-sm font-mono">{currentState.log}</p>
//           </div>

//           <div className="text-xs font-serif text-gray-600 border-t border-gray-300 pt-4">
//             <p className="mb-1">
//               <strong>Legend:</strong>{" "}
//               <span
//                 style={{
//                   display: "inline-block",
//                   width: "20px",
//                   height: "3px",
//                   backgroundColor: "#ff00ff",
//                   verticalAlign: "middle",
//                 }}
//               ></span>{" "}
//               Dividing |{" "}
//               <span
//                 style={{
//                   display: "inline-block",
//                   width: "20px",
//                   height: "3px",
//                   backgroundColor: "#ffa500",
//                   verticalAlign: "middle",
//                 }}
//               ></span>{" "}
//               Merging |{" "}
//               <span
//                 style={{
//                   display: "inline-block",
//                   width: "20px",
//                   height: "3px",
//                   backgroundColor: "#00ff00",
//                   verticalAlign: "middle",
//                 }}
//               ></span>{" "}
//               Comparing |{" "}
//               <span
//                 style={{
//                   display: "inline-block",
//                   width: "20px",
//                   height: "3px",
//                   backgroundColor: "#0000ff",
//                   verticalAlign: "middle",
//                 }}
//               ></span>{" "}
//               Sorted
//             </p>
//             <p className="italic">
//               The algorithm recursively divides the array into halves, sorts
//               each half, and merges them back together in sorted order.
//             </p>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default MergeSortAnim;
