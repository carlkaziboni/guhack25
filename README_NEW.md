# PathFinder - Interactive Career Journey

An immersive 3D web application that helps users explore different career pathways through an interactive hallway experience.

## Features

- 🎨 Animated landing page with particle effects
- 🎮 3D interactive hallway with keyboard controls
- 🚪 Three career pathway doors: Internship, Upskill, Graduate Job
- ⌨️ WASD/Arrow key movement controls
- 🌟 Immersive 3D environment with lighting and effects

## Tech Stack

### Frontend
- **React 18.3.1** - UI framework
- **Vite 7.1.12** - Build tool and dev server
- **Tailwind CSS 4.1.16** - Styling
- **Three.js 0.160.1** - 3D graphics engine
- **@react-three/fiber 8.18.0** - React renderer for Three.js
- **@react-three/drei 9.122.0** - Useful helpers for React Three Fiber
- **Framer Motion 11.18.2** - Animation library

### Backend
- **Python 3.x** - Backend runtime
- **FastAPI** - Web framework

## Prerequisites

- **Node.js** 20.19+ or 22.12+ (Note: Version 22.11.0 works but shows a warning)
- **npm** 10.x or later
- **Python** 3.8 or later
- **pip** - Python package manager

## Installation & Setup

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies (use --legacy-peer-deps flag to handle React Three Fiber compatibility):
```bash
npm install --legacy-peer-deps
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173` (or the port shown in the terminal)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

For development dependencies:
```bash
pip install -r requirements-dev.txt
pre-commit install
```

3. Start the FastAPI server:
```bash
uvicorn main:app --reload
```

The backend will be available at `http://localhost:8000`

## Usage

1. **Landing Screen**: Click "Start Your Journey" to enter the 3D hallway
2. **Movement Controls**:
   - Use **WASD** or **Arrow Keys** to move your avatar (golden sphere)
   - Move close to any door to see it highlight
3. **Door Interaction**:
   - When near a door, press **ENTER** to interact
   - Choose from three career pathways:
     - **Internship** - Gain hands-on experience
     - **Upskill** - Learn new technologies
     - **Graduate Job** - Full-time opportunities

## Project Structure

```
guhack25/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Avatar.jsx          # Player-controlled 3D sphere
│   │   │   ├── Door.jsx            # Interactive career doors
│   │   │   ├── Hallway.jsx         # 3D hallway structure
│   │   │   ├── LandingScreen.tsx   # Animated landing page
│   │   │   ├── CareerChat.tsx      # Career guidance chat
│   │   │   └── WarpTransition.tsx  # Transition effects
│   │   ├── App.jsx                 # Main application
│   │   ├── main.jsx               # React entry point
│   │   └── index.css              # Global styles
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── requirements-dev.txt
└── README.md
```

## Development Notes

- The application uses React 18.3.1 for compatibility with React Three Fiber
- The `--legacy-peer-deps` flag is required during npm install due to peer dependency conflicts
- Vite may show a Node.js version warning, but the app runs successfully
- The 3D scene uses Three.js primitives for performance optimization

## Troubleshooting

### Blank Screen Issues
- Make sure you're using React 18.x (not React 19)
- Ensure all dependencies are installed with `--legacy-peer-deps`
- Clear browser cache and reload

### Port Already in Use
- Vite will automatically try alternative ports (5174, 5175, etc.)
- Or manually specify a port: `npm run dev -- --port 3000`

### Node.js Version Warning
- The warning about Node.js 22.11.0 is non-critical
- The app runs successfully despite the warning
- Upgrade to Node.js 22.12+ to remove the warning if desired

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Authors

- Carl Kaziboni - [@carlkaziboni](https://github.com/carlkaziboni)

## Acknowledgments

- Built with React Three Fiber ecosystem
- Inspired by interactive 3D web experiences
- Designed for career exploration and guidance
