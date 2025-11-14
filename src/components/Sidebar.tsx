"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { chapters } from "@/lib/chapters";

export function Sidebar() {
  const pathname = usePathname(); // Get current route

  return (
    <aside className="w-72 bg-light-green">
      <nav>
        {chapters.map((section) => (
          <div key={section.title}>
            <h3>{section.title}</h3>
            {section.chapters.map((chapter) => {
              const href = `/chapters/${chapter.slug}`;
              const isActive = pathname === href;

              return (
                <Link
                  key={chapter.slug}
                  href={href}
                  className={isActive ? "active" : ""}
                >
                  {chapter.title}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
    </aside>
  );
}
