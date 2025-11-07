import React, { useState } from 'react'

export default function WallControls() {
  const [width, setWidth] = useState(6)
  const [depth, setDepth] = useState(4)
  const [height, setHeight] = useState(2.6)
  const [thickness, setThickness] = useState(0.15)

  // In a full implementation we'd dispatch these values to RoomScene via context or callbacks.
  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Room / Walls</h2>
      <label className="block text-sm">Width (m)</label>
      <input type="number" value={width} step="0.1" onChange={e => setWidth(parseFloat(e.target.value)||0)} className="w-full p-2 rounded bg-gray-800 text-white mb-2" />
      <label className="block text-sm">Depth (m)</label>
      <input type="number" value={depth} step="0.1" onChange={e => setDepth(parseFloat(e.target.value)||0)} className="w-full p-2 rounded bg-gray-800 text-white mb-2" />
      <label className="block text-sm">Height (m)</label>
      <input type="number" value={height} step="0.05" onChange={e => setHeight(parseFloat(e.target.value)||0)} className="w-full p-2 rounded bg-gray-800 text-white mb-2" />
      <label className="block text-sm">Thickness (m)</label>
      <input type="number" value={thickness} step="0.01" onChange={e => setThickness(parseFloat(e.target.value)||0)} className="w-full p-2 rounded bg-gray-800 text-white mb-2" />
      <div className="mt-2 text-sm text-gray-300">Note: Controls are UI placeholders. In this scaffold they don't yet connect to the scene. Use these as a starting point to wire to RoomScene via props or context.</div>
    </div>
  )
}
