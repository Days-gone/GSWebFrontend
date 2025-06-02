# 第一阶段：构建阶段
FROM node:22-alpine AS builder

# 设置工作目录
WORKDIR /app

# 安装依赖（只复制 package 文件）
COPY package.json package-lock.json* ./
RUN npm ci

# 复制项目所有文件
COPY . .

# 构建 Next.js 项目
RUN npm run build

# 第二阶段：运行阶段（更小的镜像）
FROM node:22-alpine AS runner

# 可选：添加非 root 用户以增强安全性
RUN addgroup --system app && adduser --system --ingroup app app

# 设置工作目录
WORKDIR /app

# 仅复制运行所需文件
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# 设置端口（Next.js 默认监听 3000）
EXPOSE 3000

# 切换到非 root 用户（可选）
USER app

# 启动 Next.js 应用
CMD ["npm", "start"]
