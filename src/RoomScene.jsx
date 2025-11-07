import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

// RoomScene: sets up renderer, camera, controls, lights, grid, walls and furniture
export default function RoomScene() {
  const mountRef = useRef(null)
  const [sceneState] = useState({ walls: [], furniture: [] })
  const rendererRef = useRef()

  useEffect(() => {
    const mount = mountRef.current
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xececec)

    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 1000)
    camera.position.set(5, 5, 8)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.shadowMap.enabled = true
    mount.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambient)
    const dir = new THREE.DirectionalLight(0xffffff, 0.8)
    dir.position.set(5, 10, 7)
    dir.castShadow = true
    dir.shadow.camera.left = -10
    dir.shadow.camera.right = 10
    dir.shadow.camera.top = 10
    dir.shadow.camera.bottom = -10
    scene.add(dir)

    // Grid and floor
    const grid = new THREE.GridHelper(50, 50, 0x888888, 0xcccccc)
    scene.add(grid)

    const floorMat = new THREE.MeshStandardMaterial({ color: 0xdddddd })
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(50, 50), floorMat)
    floor.rotation.x = -Math.PI / 2
    floor.receiveShadow = true
    scene.add(floor)

    // Camera controls
    const orbit = new OrbitControls(camera, renderer.domElement)
    orbit.target.set(0, 1, 0)
    orbit.update()

    // Transform controls
    const transform = new TransformControls(camera, renderer.domElement)
    transform.addEventListener('dragging-changed', function (event) {
      orbit.enabled = !event.value
    })
    scene.add(transform)

    // Simple rectangular room by default: 4 walls
    const wallGroup = new THREE.Group()
    wallGroup.name = 'walls'
    scene.add(wallGroup)

    const createWall = (w, h, t, x, y, z, ry = 0, name = 'wall') => {
      const geom = new THREE.BoxGeometry(w, h, t)
      const mat = new THREE.MeshStandardMaterial({ color: 0xffffff })
      const mesh = new THREE.Mesh(geom, mat)
      mesh.position.set(x, y, z)
      mesh.rotation.y = ry
      mesh.castShadow = true
      mesh.receiveShadow = true
      mesh.name = name
      wallGroup.add(mesh)
      return mesh
    }

    // default room size
    const roomW = 6, roomD = 4, wallH = 2.6, thickness = 0.15
    // back wall
    createWall(roomW, wallH, thickness, 0, wallH / 2, -roomD / 2, 0, 'wall-back')
    // front wall
    createWall(roomW, wallH, thickness, 0, wallH / 2, roomD / 2, 0, 'wall-front')
    // left
    createWall(roomD, wallH, thickness, -roomW / 2, wallH / 2, 0, Math.PI / 2, 'wall-left')
    // right
    createWall(roomD, wallH, thickness, roomW / 2, wallH / 2, 0, Math.PI / 2, 'wall-right')

    // Furniture group
    const furnGroup = new THREE.Group()
    furnGroup.name = 'furniture'
    scene.add(furnGroup)

    // Simple GLTF loader example: you can place models in /public/models
    const loader = new GLTFLoader()
    // expose loader for debug usage
    scene.userData.gltfLoader = loader

    // Handle insertion from UI: listens to window custom event 'insert-model'
    const onInsertModel = (e) => {
      const path = e.detail?.path
      if (!path) return
      loader.load(path, (gltf) => {
        const root = gltf.scene || gltf.scenes[0]
        root.traverse((c) => { if (c.isMesh) { c.castShadow = true; c.receiveShadow = true } })
        root.position.set(0, 0, 0)
        root.scale.setScalar(1)
        root.name = path.split('/').pop()
        furnGroup.add(root)
      }, undefined, (err) => {
        console.error('GLTF load error', err)
        alert('Failed to load model: ' + path)
      })
    }
    window.addEventListener('insert-model', onInsertModel)

    // Export scene state as JSON and save to localStorage when requested
    const onExportScene = () => {
      const wallsData = []
      wallGroup.children.forEach(w => {
        wallsData.push({ name: w.name, pos: w.position.toArray(), rot: [w.rotation.x, w.rotation.y, w.rotation.z], scale: w.scale.toArray(), geometry: { width: w.geometry.parameters.width || null, height: w.geometry.parameters.height || null, depth: w.geometry.parameters.depth || null } })
      })
      const furnData = []
      furnGroup.children.forEach(f => {
        furnData.push({ name: f.name, pos: f.position.toArray(), rot: [f.rotation.x, f.rotation.y, f.rotation.z], scale: f.scale.toArray() })
      })
      const snapshot = { walls: wallsData, furniture: furnData }
      localStorage.setItem('roomScene', JSON.stringify(snapshot))
      alert('Scene saved to localStorage (key: roomScene)')
    }
    window.addEventListener('export-scene', onExportScene)

    // Import scene: basic placement from JSON object in event.detail
    const onImportScene = (ev) => {
      const data = ev.detail
      if (!data) return
      // Clear existing furniture
      while (furnGroup.children.length) furnGroup.remove(furnGroup.children[0])
      // Restore furniture placeholder boxes (we don't have model URLs saved)
      (data.furniture || []).forEach(item => {
        const geom = new THREE.BoxGeometry(1,1,1)
        const mat = new THREE.MeshStandardMaterial({ color: 0x999999 })
        const m = new THREE.Mesh(geom, mat)
        m.position.fromArray(item.pos)
        m.rotation.set(item.rot[0], item.rot[1], item.rot[2])
        m.scale.fromArray(item.scale)
        m.name = item.name || 'furniture'
        furnGroup.add(m)
      })
      // Restore walls positions approximately (only basic restore)
      if (data.walls) {
        // simple approach: update existing walls to data if same count
        for (let i = 0; i < Math.min(data.walls.length, wallGroup.children.length); i++) {
          const src = data.walls[i]
          const tgt = wallGroup.children[i]
          tgt.position.fromArray(src.pos)
          tgt.rotation.set(src.rot[0], src.rot[1], src.rot[2])
          if (src.scale) tgt.scale.fromArray(src.scale)
        }
      }
    }
    window.addEventListener('import-scene', onImportScene)

    // Raycaster for selection
    const raycaster = new THREE.Raycaster()
    const pointer = new THREE.Vector2()
    let selected = null

    function onPointerDown(event) {
      const rect = renderer.domElement.getBoundingClientRect()
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
      raycaster.setFromCamera(pointer, camera)
      const intersects = raycaster.intersectObjects(scene.children, true)
      if (intersects.length > 0) {
        const obj = intersects[0].object
        // set selection to top-level furniture or wall
        let top = obj
        while (top.parent && top.parent !== scene) top = top.parent
        selected = top
        transform.attach(selected)
      } else {
        transform.detach()
        selected = null
      }
    }

    // Press Delete to remove selected object
    const onKeyDown = (ev) => {
      if (ev.key === 'Delete' || ev.key === 'Backspace') {
        if (selected) {
          if (selected.parent) selected.parent.remove(selected)
          transform.detach()
          selected = null
        }
      }
    }
    window.addEventListener('keydown', onKeyDown)

    renderer.domElement.addEventListener('pointerdown', onPointerDown)

    // Animation loop
    const clock = new THREE.Clock()
    const animate = () => {
      const delta = clock.getDelta()
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }
    animate()

    // handle resize
    const onWindowResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }
    window.addEventListener('resize', onWindowResize)

    // Cleanup
    return () => {
      renderer.domElement.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('resize', onWindowResize)
      window.removeEventListener('insert-model', onInsertModel)
      window.removeEventListener('export-scene', onExportScene)
      window.removeEventListener('import-scene', onImportScene)
      window.removeEventListener('keydown', onKeyDown)
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div ref={mountRef} className="w-full h-full" />
  )
}
