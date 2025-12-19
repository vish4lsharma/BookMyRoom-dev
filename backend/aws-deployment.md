# AWS Deployment Guide for BookMyRoom Backend

## Prerequisites

- AWS Account
- AWS CLI installed and configured
- MongoDB Atlas account (or AWS DocumentDB)

## Deployment Steps

### 1. MongoDB Setup

#### Option A: MongoDB Atlas (Recommended)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in environment variables

#### Option B: AWS DocumentDB
1. Create DocumentDB cluster in AWS Console
2. Configure security groups
3. Get connection string
4. Update `MONGODB_URI` in environment variables

### 2. EC2 Instance Setup

1. Launch EC2 instance (Ubuntu 20.04 LTS recommended)
2. Configure security group:
   - Inbound: Port 22 (SSH), Port 80 (HTTP), Port 443 (HTTPS), Port 5000 (Node.js)
3. Connect to instance via SSH

### 3. Install Dependencies on EC2

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx

# Install Git
sudo apt install -y git
```

### 4. Deploy Application

```bash
# Clone repository
git clone <your-repo-url>
cd BookMyRoom-dev/backend

# Install dependencies
npm install --production

# Create .env file
nano .env
# Add all environment variables

# Start application with PM2
pm2 start server.js --name bookmyroom-api
pm2 save
pm2 startup
```

### 5. Configure Nginx

```bash
sudo nano /etc/nginx/sites-available/bookmyroom
```

Add configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/bookmyroom /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 6. SSL Certificate (Let's Encrypt)

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

### 7. AWS S3 for Image Storage

1. Create S3 bucket
2. Configure CORS:
```json
[
    {
        "AllowedHeaders": ["*"],
        "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
        "AllowedOrigins": ["*"],
        "ExposeHeaders": []
    }
]
```

3. Create IAM user with S3 access
4. Update backend code to use AWS SDK for uploads

### 8. Environment Variables

Update `.env` file with production values:
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/bookmyroom
JWT_SECRET=your-production-secret-key
JWT_EXPIRE=7d
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=bookmyroom-uploads
FRONTEND_URL=https://your-frontend-domain.com
```

### 9. Monitoring

```bash
# PM2 monitoring
pm2 monit

# View logs
pm2 logs bookmyroom-api

# Restart application
pm2 restart bookmyroom-api
```

### 10. Auto-scaling (Optional)

1. Create Launch Template with user data script
2. Create Auto Scaling Group
3. Configure load balancer
4. Set up CloudWatch alarms

## Alternative: AWS Elastic Beanstalk

1. Install EB CLI:
```bash
pip install awsebcli
```

2. Initialize EB:
```bash
eb init
```

3. Create environment:
```bash
eb create bookmyroom-api-env
```

4. Deploy:
```bash
eb deploy
```

## Alternative: AWS ECS/Fargate

1. Create Dockerfile
2. Build and push to ECR
3. Create ECS cluster
4. Create task definition
5. Create service

## Security Best Practices

1. Use AWS Secrets Manager for sensitive data
2. Enable VPC for database
3. Use IAM roles instead of access keys
4. Enable CloudWatch logging
5. Set up WAF for DDoS protection
6. Regular security updates
7. Use HTTPS only
8. Implement rate limiting

## Cost Optimization

1. Use reserved instances for EC2
2. Enable auto-scaling
3. Use CloudFront for static assets
4. Optimize database queries
5. Use S3 lifecycle policies
6. Monitor with Cost Explorer

