#!/bin/bash

APP_NAME="nextjs-app"

echo "🧹 正在清理旧容器和镜像..."

if [ "$(sudo docker ps -a -q -f name=$APP_NAME)" ]; then
  sudo docker stop $APP_NAME
  sudo docker rm $APP_NAME
fi

if [ "$(sudo docker images -q $APP_NAME)" ]; then
  sudo docker rmi -f $APP_NAME
fi

echo "🔨 开始构建 Docker 镜像..."
sudo docker build -t $APP_NAME .

echo "🚀 启动 Docker 容器..."
sudo docker run --rm -d \
  --network host \
  --name $APP_NAME \
  $APP_NAME

echo "✅ 部署完成！容器名称：$APP_NAME"
