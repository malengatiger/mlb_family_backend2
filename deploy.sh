#!/bin/bash
echo "\n\n🔵🐦🔵🐦🔵🐦 Deploying FamilyArchive Backend on NestJS to Cloud Run ... 🔵🐦🔵🐦🔵🐦"
# Define variables
PROJECT_ID="familyarchive-01"
IMAGE_NAME="familyarchive-backend-3"
REGION="europe-west2"
SERVICE_NAME="familyarchive"
echo "\n🐦🐦🐦 Build the app ... 🔵🐦🔵🐦🔵🐦"
npm run build
echo "\n🐦🐦🐦 Build the Docker image ... 🔵🐦🔵🐦🔵🐦"
# Build the Docker image
# docker build -t gcr.io/$PROJECT_ID/$IMAGE_NAME .
docker buildx build --platform linux/amd64 -t gcr.io/$PROJECT_ID/$IMAGE_NAME .    

# Push the Docker image to GCR
echo "\n🐦🐦🐦 Push the Docker image ... 🔵🐦🔵🐦🔵🐦"

docker push gcr.io/$PROJECT_ID/$IMAGE_NAME
echo "🍎 🍎 🍎 🍎 🍎 🍎 🍎 🍎 🍎 start deployment to Cloud Run"
# Deploy the app to Cloud Run
gcloud run deploy $SERVICE_NAME \
  --image gcr.io/$PROJECT_ID/$IMAGE_NAME \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated

echo "🍎 🍎 🍎 🍎 🍎 🍎 🍎 🍎 🍎 Hopefully, we have deployed successfully"