import React from 'react'

export default function ToolTip({ className, dataTip, children }) {
  return (
    <div className={`relative group ${className}`}>
      {children}
      <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
        {dataTip}
      </div>
    </div>
  )
}
