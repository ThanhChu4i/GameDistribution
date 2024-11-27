# Sử dụng image node để build ứng dụng React
FROM node:18-alpine AS build

# Thư mục làm việc bên trong container
WORKDIR /app

# Copy file package.json và cài đặt dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy mã nguồn vào container và build
COPY . .
RUN npm run build

# Sử dụng Nginx để phục vụ các tệp tĩnh
FROM nginx:1.23-alpine
COPY --from=build /app/build /usr/share/nginx/html

# Expose cổng 80 để chạy ứng dụng
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]