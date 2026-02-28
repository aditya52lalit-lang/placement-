#!/bin/bash
# Placement Prep Starter - Development Setup & Start

echo "╔════════════════════════════════════════════════════════════╗"
echo "║                                                            ║"
echo "║     🚀 PLACEMENT PREP STARTER - SETUP & START 🚀          ║"
echo "║                                                            ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo -e "${GREEN}✅ Node.js detected${NC}"

# Setup Backend
echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║              Setting up Backend (Node.js)                 ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

cd backend
echo "📦 Installing backend dependencies..."
npm install --quiet

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to install backend dependencies${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Backend dependencies installed${NC}"
cd ..

# Setup Frontend
echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║              Setting up Frontend (React)                  ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

cd frontend
echo "📦 Installing frontend dependencies..."
npm install --quiet

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to install frontend dependencies${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Frontend dependencies installed${NC}"
cd ..

# Create env files
echo ""
echo "🔧 Configuring environment variables..."

if [ ! -f "backend/.env" ]; then
    echo "Creating backend/.env..."
    cat > backend/.env << EOF
PORT=5000
MONGODB_URI=mongodb://localhost:27017/placement-prep
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
CLIENT_URL=http://localhost:3000
EOF
    echo -e "${GREEN}✅ Created backend/.env${NC}"
else
    echo -e "${GREEN}✅ backend/.env already exists${NC}"
fi

if [ ! -f "frontend/.env.local" ]; then
    echo "Creating frontend/.env.local..."
    cat > frontend/.env.local << EOF
VITE_API_URL=http://localhost:5000
EOF
    echo -e "${GREEN}✅ Created frontend/.env.local${NC}"
else
    echo -e "${GREEN}✅ frontend/.env.local already exists${NC}"
fi

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║              ✨ Setup Complete! ✨                         ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "📋 Next steps:"
echo ""
echo "1. Start MongoDB (if local):"
echo "   mongod --dbpath /path/to/data"
echo ""
echo "2. Start Backend Server:"
echo "   cd backend"
echo "   npm run dev"
echo ""
echo "3. In a new terminal, start Frontend:"
echo "   cd frontend"
echo "   npm run dev"
echo ""
echo "4. Open browser: http://localhost:3000"
echo ""
echo "✨ Happy coding! ✨"
echo ""
