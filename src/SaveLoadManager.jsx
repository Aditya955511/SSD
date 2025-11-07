import React from 'react'

export default function SaveLoadManager() {
  const saveScene = () => {
    const event = new CustomEvent('export-scene')
    window.dispatchEvent(event)
  }
  const loadScene = () => {
    const json = localStorage.getItem('roomScene')
    if (!json) return alert('No saved scene in localStorage')
    const obj = JSON.parse(json)
    const event = new CustomEvent('import-scene', { detail: obj })
    window.dispatchEvent(event)
  }

  const saveToLocal = () => {
    saveScene()
  }

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Save / Load</h2>
      <div className="flex gap-2">
        <button onClick={saveToLocal} className="flex-1 p-2 bg-green-600 rounded text-white">Save Room</button>
        <button onClick={loadScene} className="flex-1 p-2 bg-blue-600 rounded text-white">Load Room</button>
      </div>
      <div className="mt-2 text-sm text-gray-300">Save exports a JSON snapshot to localStorage key <code>roomScene</code>.</div>
    </div>
  )
}
