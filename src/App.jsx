import React, { useState } from 'react'
import RoomScene from './RoomScene'
import WallControls from './WallControls'
import FurnitureManager from './FurnitureManager'
import SaveLoadManager from './SaveLoadManager'
import UIControls from './UIControls'

export default function App() {
  // High-level state: walls and furniture list will be managed inside RoomScene
  const [selectedTool, setSelectedTool] = useState('select')

  return (
    <div className="app h-screen flex">
      <aside className="w-80 bg-gray-900 text-white p-4 overflow-auto">
        <h1 className="text-2xl font-bold mb-4">3D Room Designer</h1>
        <UIControls selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
        <WallControls />
        <FurnitureManager />
        <SaveLoadManager />
      </aside>
      <main className="flex-1 bg-gray-100 relative">
        <RoomScene selectedTool={selectedTool} />
      </main>
    </div>
  )
}
