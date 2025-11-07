# 3D Room Designer (React + Three.js)

This is a starter scaffold for a 3D Room Designer built with React and Three.js. It includes core functionality:

- Create a rectangular room (four walls, floor).
- Load glTF / .glb furniture models from `/public/models`.
- Move/rotate/scale via TransformControls.
- Orbit camera navigation.
- Grid helper and shadows.
- Save scene snapshot to `localStorage` and load it back.

This scaffold is intended as a foundation to extend with more features (snapping, textures, undo/redo, physics, WebXR).

## Quick start (Windows PowerShell)

1. Install dependencies:

```powershell
cd "C:\Users\adity\OneDrive\Desktop\New folder (2)"
npm install
```

2. Run dev server:

```powershell
npm run dev
```

3. Open the app in the browser (Vite shows the URL, usually http://localhost:5173).

## Usage notes

- Place .glb models into `public/models` (names: `chair.glb`, `table.glb`, etc.) or edit `src/FurnitureManager.jsx` to point to your URLs.
- Click a furniture button to insert. Click objects in the viewport to select and transform.
- Press `Delete` to remove the selected object.
- Use Save Room to export scene snapshot to `localStorage` key `roomScene` and Load Room to import it.

## Files of interest

- `src/RoomScene.jsx` — main Three.js scene, controls, basic wall creation, loader and save/load handlers.
- `src/WallControls.jsx` — UI for wall dimensions (placeholder for wiring).
- `src/FurnitureManager.jsx` — UI to insert furniture models.
- `src/SaveLoadManager.jsx` — save/load buttons that trigger export/import.

## Next steps (suggested)

- Wire wall controls to update geometries in realtime via React context or callbacks.
- Add material/texture pickers and dynamic measurements.
- Implement snapping and alignment helpers.
- Add undo/redo stack and optional physics using cannon-es.
