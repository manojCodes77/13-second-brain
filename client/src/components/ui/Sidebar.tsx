import Icon from "../../icons/Icon";
import TwitterIcon from "../../icons/TwitterIcon";
import YoutubeIcon from "../../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";

export function Sidebar({ onClose }: { onClose?: () => void }) {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 flex flex-col h-full shadow-sm lg:shadow-none">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-8 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <div className="text-purple-600 w-6 h-6">
              <Icon />
            </div>
          </div>
          <span className="text-2xl font-bold text-gray-800 tracking-tight">
            Brainly
          </span>
        </div>
        
        {/* Close button for mobile */}
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label="Close sidebar"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <div className="space-y-2">
          <div onClick={onClose}>
            <SidebarItem text="Twitter" icon={<TwitterIcon />} />
          </div>
          <div onClick={onClose}>
            <SidebarItem text="Youtube" icon={<YoutubeIcon />} />
          </div>
        </div>
      </nav>

      {/* Footer spacer */}
      <div className="p-4">
        <div className="text-xs text-gray-400 text-center">
          © 2025 Brainly
        </div>
      </div>
    </div>
  );
}