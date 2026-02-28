# 🚀 Deployment Guide - Placement Prep Starter

## Deploy to Production in 5 Steps

### Option 1: Deploy Backend to Heroku (5 minutes)

#### Prerequisites
- Heroku account (free tier)
- Git installed

#### Steps

```bash
# 1. Install Heroku CLI
# Download from: https://devcenter.heroku.com/articles/heroku-cli

# 2. Login to Heroku
heroku login

# 3. Create Heroku app
cd backend
heroku create placement-prep-api

# 4. Add environment variables
heroku config:set JWT_SECRET=your-production-secret-key
heroku config:set MONGODB_URI=your-mongodb-atlas-uri
heroku config:set NODE_ENV=production
heroku config:set PORT=5000

# 5. Deploy
git push heroku main
```

### Option 2: Deploy Frontend to Vercel (3 minutes)

#### Prerequisites
- Vercel account (free tier)
- Git installed

#### Steps

```bash
# 1. Login to Vercel
npx vercel login

# 2. Deploy
cd frontend
npx vercel

# 3. Set environment variables in Vercel dashboard
# VITE_API_URL=https://your-backend-url.herokuapp.com
```

### Option 3: Deploy to AWS EC2 (10 minutes)

#### Backend Setup
```bash
# 1. Connect to EC2 instance
ssh -i your-key.pem ec2-user@your-ip

# 2. Install Node.js
curl -sL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# 3. Clone repository
git clone https://github.com/your-repo/placement-prep.git
cd placement-prep/backend

# 4. Install PM2 (process manager)
sudo npm install -g pm2

# 5. Create .env file
nano .env
# Add: MONGODB_URI, JWT_SECRET, etc.

# 6. Install dependencies
npm install

# 7. Start with PM2
pm2 start server.js --name "placement-prep-api"
pm2 startup
pm2 save
```

#### Frontend Setup
```bash
# 1. Connect to EC2
ssh -i your-key.pem ec2-user@your-ip

# 2. Go to frontend directory
cd placement-prep/frontend

# 3. Build for production
npm run build

# 4. Install Nginx
sudo yum install -y nginx

# 5. Copy build files
sudo cp -r dist/* /var/www/html/

# 6. Start Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### Option 4: Deploy with Docker & Docker Compose

#### Create Dockerfile for Backend
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```

#### Create docker-compose.yml
```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: password
    volumes:
      - mongodb_data:/data/db

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "5000:5000"
    environment:
      MONGODB_URI: mongodb://root:password@mongodb:27017/placement-prep?authSource=admin
      JWT_SECRET: your-secret-key
      NODE_ENV: production
    depends_on:
      - mongodb

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      VITE_API_URL: http://backend:5000

volumes:
  mongodb_data:
```

#### Deploy with Docker
```bash
# Build images
docker-compose build

# Start services
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f
```

## 📊 Production Best Practices

### Backend
- [ ] Enable CORS for specific domains only
- [ ] Set NODE_ENV to 'production'
- [ ] Use strong JWT_SECRET (minimum 32 characters)
- [ ] Enable MongoDB Atlas authentication
- [ ] Setup error logging (Sentry, LogRocket)
- [ ] Enable rate limiting
- [ ] Use HTTPS only
- [ ] Setup backup strategy

### Frontend
- [ ] Build for production (npm run build)
- [ ] Enable gzip compression
- [ ] Setup CDN for assets
- [ ] Add analytics (Google Analytics, Mixpanel)
- [ ] Enable PWA features
- [ ] Setup error tracking

### Database
- [ ] Enable authentication
- [ ] Setup regular backups
- [ ] Enable encryption at rest
- [ ] Configure network access rules
- [ ] Setup monitoring and alerts

## 🔒 Security Checklist

```bash
# Backend Security
- [ ] Update all dependencies: npm audit && npm audit fix
- [ ] Enable HTTPS/SSL
- [ ] Set secure headers (Helmet.js)
- [ ] Validate & sanitize inputs
- [ ] Use environment variables for secrets
- [ ] Implement rate limiting
- [ ] Add CORS protection
- [ ] Setup API authentication (JWT)

# Frontend Security
- [ ] Sanitize user inputs
- [ ] Never store sensitive data in localStorage
- [ ] Implement CSP headers
- [ ] Keep dependencies updated
- [ ] Use HTTPS only
- [ ] Implement proper error handling
```

## 📈 Monitoring & Maintenance

### Setup Monitoring
```bash
# Backend monitoring with PM2
pm2 install pm2-logrotate
pm2 install pm2-auto-pull

# View dashboard
pm2 dashboard
```

### Setup Logging
```javascript
// Add Winston logger to backend
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

module.exports = logger;
```

## 💰 Cost Estimation

### Monthly Costs (Approximate)
- **Heroku Backend**: $7/month (Eco dyno)
- **MongoDB Atlas**: Free tier (up to 512MB)
- **Vercel Frontend**: Free tier
- **Domain Name**: $10-15/year
- **Total**: ~$7-15/month

### Free Tier Options
- **Backend**: Heroku Eco ($0 - limited resources)
- **Frontend**: Vercel (unlimited)
- **Database**: MongoDB Atlas (512MB free)
- **Domain**: Freenom (.tk, .ml - not recommended)

## 🆘 Troubleshooting

### Backend won't start
```bash
# Check logs
pm2 logs placement-prep-api

# Check port availability
lsof -i :5000
```

### Database connection failed
```bash
# Verify connection string in .env
# Check MongoDB access permissions
# Whitelist IP in MongoDB Atlas
```

### Frontend can't connect to backend
```bash
# Check VITE_API_URL is correct
# Verify backend is running
# Check CORS configuration
```

---

**Happy deploying! 🎉**
