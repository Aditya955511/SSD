import React, { useState } from 'react'
import { motion } from 'framer-motion'

export default function FurnitureManager() {
  const [models] = useState([
    { name: 'Chair', path: '/models/chair.glb' },
    { name: 'Table', path: '/models/table.glb' },
    { name: 'Sofa', path: '/models/sofa.glb' }
  ])

  // Triggering actual load is done inside RoomScene (scene.userData.gltfLoader)
  // This component provides UI and fires custom events for insertion
  const insertModel = (path) => {
    const event = new CustomEvent('insert-model', { detail: { path } })
    window.dispatchEvent(event)
  }

  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold mb-2">Furniture</h2>
      <div className="space-y-2">
        {models.map(m => (
          <motion.button
            key={m.name}
            whileTap={{ scale: 0.98 }}
            onClick={() => insertModel(m.path)}
            className="w-full text-left p-2 rounded bg-gray-800 text-white"
          >
            {m.name}
          </motion.button>
        ))}
      </div>
      <div className="mt-2 text-sm text-gray-300">Place .glb files into <code>/public/models</code> and click to insert.</div>
    </div>
  )
}
