// src/components/ConfigTabs.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const tabs = [
  { id: 'color', label: 'Color & Apariencia' },
  { id: 'wheels', label: 'Ruedas' },
  { id: 'accessories', label: 'Accesorios' },
];

export default function ConfigTabs({ children }) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className="w-full">
      <div className="flex justify-between border-b border-gray-700 mb-6">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 text-center py-3 font-semibold transition-colors duration-200
              ${activeTab === tab.id
                ? 'text-white border-b-2 border-blue-500'
                : 'text-gray-400 hover:text-gray-200'
              }`}
          >
            {tab.label}
          </motion.button>
        ))}
      </div>

      <div className="p-4">
        {React.Children.map(children, (child) => {
          if (child.props.tabId === activeTab) {
            return child;
          }
          return null;
        })}
      </div>
    </div>
  );
}