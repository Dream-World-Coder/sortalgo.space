//index page or basic intro page
// List all chapters - like a table of contents
import { chapters } from "@/lib/chapters";
import Link from "next/link";

export default function ChaptersIndex() {
  return (
    <article className="max-w-3xl mx-auto p-16">
      <h1>Table of Contents</h1>

      {chapters.sections.map((section) => (
        <div key={section.title}>
          <h2>{section.title}</h2>
          <ul>
            {section.chapters.map((chapter) => (
              <li key={chapter.slug}>
                <Link href={`/chapters/${chapter.slug}`}>
                  {chapter.number}. {chapter.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </article>
  );
}

// "use client";

// import { useEffect, useState } from "react";
// import {
//   Sidebar,
//   X,
//   ChevronRight,
//   ChevronLeft,
//   Home as HomeIcon,
// } from "lucide-react";
// import { chapters } from "@/lib/chapters";
// import {
//   getHomeContent,
//   getChapterContent,
// } from "@/lib/content";
// import { MarkdownRenderer } from "@/components/MarkdownRenderer";

// export default function Home() {
//   const [currentView, setCurrentView] = useState("home");
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [content, setContent] = useState("");

//   const getAllChapters = () => {
//     return chapters.sections.flatMap((s) => s.chapters);
//   };

//   const getAdjacentChapters = () => {
//     if (currentView === "home")
//       return { prev: null, next: getAllChapters()[0] };

//     const allChapters = getAllChapters();
//     const currentIndex = allChapters.findIndex((c) => c.slug === currentView);

//     return {
//       prev: currentIndex > 0 ? allChapters[currentIndex - 1] : null,
//       next:
//         currentIndex < allChapters.length - 1
//           ? allChapters[currentIndex + 1]
//           : null,
//     };
//   };

//   const { prev, next } = getAdjacentChapters();

//   useEffect(() => {
//     if (currentView === "home") {
//       setContent(getHomeContent());
//     } else {
//       setContent(getChapterContent(currentView));
//     }
//   }, [currentView]);

//   return (
//     <div className="min-h-screen bg-white flex">
//       {/* Sidebar */}
//       <aside
//         className={`${sidebarOpen ? "w-72" : "w-0"} transition-all duration-300 bg-light-green text-dark-green overflow-hidden shrink-0 border-r border-dark-green/0`}
//       >
//         <div className="p-6 h-full overflow-y-auto">
//           <div className="flex items-center justify-between mb-8">
//             <h2 className="text-lg font-light tracking-wide">Contents</h2>
//             <button
//               onClick={() => setSidebarOpen(false)}
//               className="_lg:hidden hover:bg-dark-green/10 p-1 rounded transition-colors"
//             >
//               <X size={20} />
//             </button>
//           </div>

//           <button
//             onClick={() => setCurrentView("home")}
//             className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-sm mb-6 transition-all ${
//               currentView === "home"
//                 ? "bg-dark-green/15 text-dark-green"
//                 : "hover:bg-dark-green/8 text-dark-green/80"
//             }`}
//           >
//             <HomeIcon size={16} />
//             <span className="font-light">Introduction</span>
//           </button>

//           {chapters.sections.map((section, idx) => (
//             <div key={idx} className="mb-8">
//               <h3
//                 className="text-xs uppercase tracking-wider mb-3 text-dark-green/60 font-medium px-3"
//                 style={{ fontFamily: "Inter, sans-serif" }}
//               >
//                 {section.title}
//               </h3>
//               {section.chapters.map((chapter) => (
//                 <button
//                   key={chapter.slug}
//                   onClick={() => setCurrentView(chapter.slug)}
//                   className={`block w-full text-left px-3 py-2 rounded-sm mb-1 transition-all text-sm ${
//                     currentView === chapter.slug
//                       ? "bg-dark-green/15 text-dark-green font-medium"
//                       : "text-dark-green/70 hover:bg-dark-green/8 hover:text-dark-green"
//                   }`}
//                 >
//                   <span
//                     className="text-dark-green/50 mr-2 font-medium"
//                     style={{ fontFamily: "JetBrains Mono, monospace" }}
//                   >
//                     {chapter.number}.
//                   </span>
//                   {chapter.title}
//                 </button>
//               ))}
//             </div>
//           ))}
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 flex flex-col min-w-0">
//         {/* Header */}
//         <header className="bg-white text-dark-green px-6 py-4 flex items-center gap-4 border-b border-dark-green/10">
//           {!sidebarOpen && (
//             <button
//               onClick={() => setSidebarOpen(true)}
//               className="p-2 hover:bg-[#C4DDAB]/20 rounded-sm transition-colors"
//             >
//               <Sidebar size={16} />
//             </button>
//           )}

//           <div className="flex items-center gap-2">
//             <h1 className="text-base font-light tracking-wide">
//               Sorting Algorithms
//               {/* chapter info */}
//             </h1>

//             {/*github*/}
//           </div>
//         </header>

//         {/* Content Area */}
//         <div className="flex-1 overflow-auto bg-white">
//           <article className="max-w-3xl mx-auto px-6 py-12 md:px-12 md:py-16 lg:px-16 lg:py-20">
//             <MarkdownRenderer
//               content={
//                 currentView === "home"
//                   ? sampleContent.home
//                   : sampleContent.chapter
//               }
//             />

//             {/* Navigation */}
//             <div className="flex items-center justify-between mt-16 pt-8 border-t border-dark-green/20">
//               {prev ? (
//                 <button
//                   onClick={() => setCurrentView(prev.slug || "home")}
//                   className="flex items-center gap-2 text-dark-green hover:text-dark-green/70 transition-colors group"
//                 >
//                   <ChevronLeft
//                     size={20}
//                     className="group-hover:-translate-x-1 transition-transform"
//                   />
//                   <span className="text-sm">
//                     {prev.title || "Introduction"}
//                   </span>
//                 </button>
//               ) : (
//                 <div />
//               )}

//               {next && (
//                 <button
//                   onClick={() => setCurrentView(next.slug)}
//                   className="flex items-center gap-2 text-dark-green hover:text-dark-green/70 transition-colors group"
//                 >
//                   <span className="text-sm">{next.title}</span>
//                   <ChevronRight
//                     size={20}
//                     className="group-hover:translate-x-1 transition-transform"
//                   />
//                 </button>
//               )}
//             </div>
//           </article>
//         </div>
//       </main>
//     </div>
//   );
// }
