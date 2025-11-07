import React from 'react'
import { Sun, Box, Save, RefreshCw } from 'lucide-react'

export default function UIControls({ selectedTool, setSelectedTool }) {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Tools</h2>
      <div className="flex flex-col gap-2">
        <button onClick={() => setSelectedTool('select')} className={`p-2 rounded ${selectedTool==='select'? 'bg-indigo-600':'bg-gray-800'} text-white`}>Select</button>
        <button onClick={() => setSelectedTool('move')} className={`p-2 rounded ${selectedTool==='move'? 'bg-indigo-600':'bg-gray-800'} text-white`}>Move</button>
        <button onClick={() => setSelectedTool('top')} className={`p-2 rounded ${selectedTool==='top'? 'bg-indigo-600':'bg-gray-800'} text-white`}>Top View</button>
      </div>
      <div className="mt-3 text-sm text-gray-300">Quick actions: Switch between tools. The Top View toggles camera orientation in the scene.</div>
    </div>
  )
}
