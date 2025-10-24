# SSD
RoomScan Visualizer — README

This project enables users to scan their rooms using video, convert it into a 3D model using Luma AI, and visualize color changes on the web in real-time.


---

🧱 Project Overview

RoomScan Visualizer integrates Luma AI for 3D reconstruction and Three.js for 3D visualization. Users can upload a video of their room, which is processed into a .glb model that can be interactively recolored or textured through a web interface.


---

🚀 Features

Upload room videos directly from the browser.

Automatic conversion to 3D model via Luma AI API.

Real-time 3D visualization with Three.js.

Wall and object recoloring controls.

Secure file storage and access (via S3-compatible service).

Scalable backend using Node.js + Express.



---

📁 Project Structure

roomscan-visualizer/
│
├── frontend/              # React/Three.js-based UI
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── pages/        # Upload & Viewer pages
│   │   ├── services/     # API calls
│   │   └── App.js
│   └── package.json
│
├── backend/               # Node.js/Express backend
│   ├── controllers/      # Upload, Luma API, and model handling
│   ├── routes/           # REST endpoints
│   ├── utils/            # File storage & validation
│   └── server.js
│
├── worker/                # Background job processor for Luma conversion
│   ├── queue.js
│   ├── lumaClient.js
│   └── processJob.js
│
├── docker-compose.yml     # Local environment setup
└── README.md              # Project documentation


---

🧩 Tech Stack

Frontend: React, Three.js, TailwindCSS

Backend: Node.js, Express.js

3D Reconstruction: Luma AI API

Storage: AWS S3 / Cloudinary (for videos & models)

Queue: BullMQ / Redis (for async processing)

Deployment: Docker + Render / Vercel



---

🔧 Setup Instructions

1️⃣ Clone Repository

git clone https://github.com/yourusername/roomscan-visualizer.git
cd roomscan-visualizer

2️⃣ Install Dependencies

Frontend:

cd frontend
npm install

Backend:

cd backend
npm install

3️⃣ Configure Environment

Create a .env file in /backend with:

PORT=5000
LUMA_API_KEY=your_luma_api_key
AWS_ACCESS_KEY=your_access_key
AWS_SECRET_KEY=your_secret_key
S3_BUCKET=roomscan-models
REDIS_URL=redis://localhost:6379

4️⃣ Start Services

docker-compose up --build

Access the app at: http://localhost:3000


---

🧠 API Endpoints

POST /api/upload

Uploads user video and creates a Luma job.

{
  "videoUrl": "https://example.com/room.mp4"
}

Response:

{
  "jobId": "abc123",
  "status": "processing"
}

GET /api/model/:jobId

Retrieves the processed 3D model link. Response:

{
  "modelUrl": "https://s3.amazonaws.com/.../room.glb"
}


---

🖼️ Frontend Functionality

UploadPage.jsx: Uploads video → calls backend.

ViewerPage.jsx: Loads .glb model using Three.js → provides color controls.

ColorPicker.jsx: Lets users select and apply paint colors dynamically.



---

⚙️ Luma AI Integration Flow

1. User uploads room video.


2. Backend sends it to Luma AI API for processing.


3. Worker periodically checks job status.


4. Once complete, Luma returns .glb link.


5. Model is loaded in the Three.js viewer.




---

🧪 Testing

Run backend tests:

npm run test

Frontend testing with Jest:

npm run test


---

🌐 Deployment Guide

Deploy backend using Render or AWS Elastic Beanstalk.

Deploy frontend on Vercel or Netlify.

Use AWS S3 / Cloudflare R2 for media storage.

Configure environment variables via platform dashboard.



---

🧭 Future Enhancements

Real-time segmentation for wall detection.

Integration with AI color recommendation engine.

Multi-room scanning and stitching.

VR/AR preview support (WebXR + Three.js).



---

👨‍💻 Contributors

Lead Developer: Aditya Jaiswal
AI & 3D Integration: GPT-5
Design & Documentation: Color Your House Project


---

🪶 License

MIT License © 2025 RoomScan Visualizer Team



✅ The README.md has been added — it now fully explains setup, tech stack, API usage, and deployment details for your RoomScan Visualizer project.

Would you like me to generate the frontend setup guide next (how to connect Three.js and Luma API results for color change interactions)?

