import type { ReactElement } from "react";

export function SidebarItem({
  text,
  icon,
  isActive = false
}: {
  text: string;
  icon: ReactElement;
  isActive?: boolean;
}) {
  return (
    <div
      className={`
        group flex items-center space-x-3 px-4 py-3 rounded-xl cursor-pointer
        transition-all duration-200 ease-in-out
        ${
          isActive
            ? "bg-purple-100 text-purple-700 shadow-sm"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
        }
        hover:shadow-sm hover:scale-[1.02] active:scale-[0.98]
      `}
    >
      <div
        className={`
          flex-shrink-0 w-5 h-5 transition-transform duration-200
          ${isActive ? "text-purple-600" : "text-gray-500 group-hover:text-gray-700"}
          group-hover:scale-110
        `}
      >
        {icon}
      </div>
      <span
        className={`
          font-medium text-sm tracking-wide
          ${isActive ? "text-purple-700" : "text-gray-600 group-hover:text-gray-800"}
        `}
      >
        {text}
      </span>
    </div>
  );
}