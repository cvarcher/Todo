import React, { useState } from 'react';
import { X, ChevronUp, ChevronDown, MoreHorizontal, Plus, Paperclip } from 'lucide-react';

const EditTodo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [todoTitle, setTodoTitle] = useState('complete todo');
  const [description, setDescription] = useState('');

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
      >
        Open Edit Modal
      </button>

      {/* Modal Backdrop - Click to close */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-40 flex items-start justify-center pt-20 z-50"
          onClick={() => setIsOpen(false)}
        >
          {/* Modal Container */}
          <div 
            className="bg-white rounded-xl shadow-2xl w-full max-w-3xl mx-4 overflow-hidden"
            style={{
              maxHeight: 'calc(100vh - 160px)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <div className="flex items-center gap-3 text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2"/>
                </svg>
                <span className="text-sm font-medium">Inbox</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <ChevronUp className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <MoreHorizontal className="w-5 h-5 text-gray-600" />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex">
              {/* Left Section - Main Content */}
              <div className="flex-1 p-6">
                {/* Task Title with Checkbox */}
                <div className="flex items-start gap-3 mb-4">
                  <button className="mt-1 w-5 h-5 rounded-full border-2 border-gray-400 hover:border-gray-600 flex-shrink-0"></button>
                  <input
                    type="text"
                    value={todoTitle}
                    onChange={(e) => setTodoTitle(e.target.value)}
                    className="flex-1 text-xl font-normal text-gray-900 outline-none border-none p-0"
                    placeholder="Task name"
                  />
                </div>

                {/* Description */}
                <div className="ml-8 mb-6">
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    className="w-full text-sm text-gray-600 outline-none resize-none border-none p-0 placeholder-gray-400"
                    rows="2"
                  />
                </div>

                {/* Add Sub-task */}
                <div className="ml-8 mb-6">
                  <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700">
                    <Plus className="w-4 h-4" />
                    <span>Add sub-task</span>
                  </button>
                </div>

                {/* Comment Section */}
                <div className="ml-8 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex-shrink-0"></div>
                  <input
                    type="text"
                    placeholder="Comment"
                    className="flex-1 text-sm text-gray-600 outline-none border-none p-0 placeholder-gray-400"
                  />
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Paperclip className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Right Section - Metadata */}
              <div className="w-64 border-l border-gray-200 p-6 space-y-4">
                {/* Project */}
                <div>
                  <div className="text-xs font-medium text-gray-500 mb-2">Project</div>
                  <button className="w-full flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-100 p-2 rounded-lg">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2"/>
                    </svg>
                    <span>Inbox</span>
                  </button>
                </div>

                {/* Date */}
                <div>
                  <div className="text-xs font-medium text-gray-500 mb-2">Date</div>
                  <button className="w-full flex items-center justify-between hover:bg-gray-100 p-2 rounded-lg">
                    <span className="text-sm text-gray-400"></span>
                    <Plus className="w-4 h-4 text-gray-400" />
                  </button>
                </div>

                {/* Deadline */}
                <div>
                  <div className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-2">
                    <span>Deadline</span>
                    <span className="text-orange-500">⭐</span>
                  </div>
                  <button className="w-full flex items-center justify-end hover:bg-gray-100 p-2 rounded-lg">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2"/>
                    </svg>
                  </button>
                </div>

                {/* Priority */}
                <div>
                  <div className="text-xs font-medium text-gray-500 mb-2">Priority</div>
                  <button className="w-full flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-100 p-2 rounded-lg">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6h18M3 12h18M3 18h18" />
                    </svg>
                    <span>P4</span>
                  </button>
                </div>

                {/* Labels */}
                <div>
                  <div className="text-xs font-medium text-gray-500 mb-2">Labels</div>
                  <button className="w-full flex items-center justify-between hover:bg-gray-100 p-2 rounded-lg">
                    <span className="text-sm text-gray-400"></span>
                    <Plus className="w-4 h-4 text-gray-400" />
                  </button>
                </div>

                {/* Reminders */}
                <div>
                  <div className="text-xs font-medium text-gray-500 mb-2">Reminders</div>
                  <button className="w-full flex items-center justify-between hover:bg-gray-100 p-2 rounded-lg">
                    <span className="text-sm text-gray-400"></span>
                    <Plus className="w-4 h-4 text-gray-400" />
                  </button>
                </div>

                {/* Location */}
                <div>
                  <div className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-2">
                    <span>Location</span>
                    <span className="text-orange-500">⭐</span>
                  </div>
                  <button className="w-full flex items-center justify-end hover:bg-gray-100 p-2 rounded-lg">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditTodo;