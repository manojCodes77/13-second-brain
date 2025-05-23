import { useLoaderData } from 'react-router-dom';
import Card from './Card';
import { PlusIcon, SparklesIcon, GridIcon, ListIcon } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';

const ContentList = () => {
  const contents = useLoaderData();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5" />
        <div className="relative max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                <SparklesIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Content Hub
                </h1>
                <p className="text-gray-600 mt-1">
                  {contents.length > 0 ? `${contents.length} amazing ${contents.length === 1 ? 'item' : 'items'} to explore` : 'Your content collection'}
                </p>
              </div>
            </div>
            
            {contents.length > 0 && (
              <div className="flex items-center gap-3">
                {/* View Toggle */}
                <div className="flex items-center bg-white rounded-xl p-1 shadow-sm border border-gray-200">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      viewMode === 'grid' 
                        ? 'bg-blue-500 text-white shadow-sm' 
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                    title="Grid view"
                  >
                    <GridIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      viewMode === 'list' 
                        ? 'bg-blue-500 text-white shadow-sm' 
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                    title="List view"
                  >
                    <ListIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {contents.length > 0 ? (
          <div className="space-y-6">
            {/* Stats Bar */}
            <div className="flex flex-wrap gap-4">
              {[
                { label: 'Total Items', value: contents.length, icon: '📊', color: 'from-blue-500 to-blue-600' },
                { label: 'YouTube', value: contents.filter((c: any) => c.type === 'youtube').length, icon: '🎥', color: 'from-red-500 to-red-600' },
                { label: 'Social', value: contents.filter((c: any) => ['twitter', 'instagram', 'linkedin'].includes(c.type)).length, icon: '📱', color: 'from-purple-500 to-purple-600' },
                { label: 'Other', value: contents.filter((c: any) => c.type === 'other').length, icon: '🔗', color: 'from-green-500 to-green-600' }
              ].map((stat) => (
                <div key={stat.label} className="flex-1 min-w-48 bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-gray-200/50 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl bg-gradient-to-r ${stat.color} shadow-sm`}>
                      <span className="text-lg">{stat.icon}</span>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Content Grid/List */}
            <div className={`
              ${viewMode === 'grid' 
                ? 'flex flex-wrap gap-6' 
                : 'flex flex-col gap-4'
              }
            `}>
              {contents.map((content: any, index: number) => (
                <div 
                  key={content.id || index}
                  className={`animate-in fade-in slide-in-from-bottom-4 duration-500 ${
                    viewMode === 'grid' ? 'flex-1 min-w-80 max-w-96' : 'w-full'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Card
                    id={content._id}
                    title={content.title}
                    link={content.link}
                    type={content.type}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center text-center py-20">
            <div className="relative mb-8">
              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-200 rounded-full animate-bounce delay-0" />
              <div className="absolute -top-2 -right-6 w-6 h-6 bg-purple-200 rounded-full animate-bounce delay-150" />
              <div className="absolute -bottom-3 -left-2 w-5 h-5 bg-pink-200 rounded-full animate-bounce delay-300" />
              
              {/* Main Icon */}
              <div className="relative p-8 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl shadow-lg">
                <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-xl">
                  <SparklesIcon className="w-16 h-16 text-white" />
                </div>
              </div>
            </div>

            <div className="max-w-md space-y-4">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Ready to Start?
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Your content hub is waiting for amazing content. Let's fill it with your favorite links, videos, and posts!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-6">
                <button className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 active:scale-95">
                  <PlusIcon className="w-5 h-5" />
                  Add Your First Content
                </button>
                <button className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-gray-700 font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 active:scale-95 border border-gray-200">
                  <SparklesIcon className="w-5 h-5" />
                  Explore Examples
                </button>
              </div>
            </div>

            {/* Background Pattern */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl" />
              <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-200/20 rounded-full blur-3xl" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentList;


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;

export const loader = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/v1/content/`, {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    });
    const contents = response.data.contents;
    return contents;
  } catch (error) {
    return [];
  }
}