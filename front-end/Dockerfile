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
FROM nginx:alpine

# Sao chép file build của React vào thư mục phục vụ của Nginx
COPY --from=build /app/build /usr/share/nginx/html


# Copy file cấu hình nginx tùy chỉnh (nếu có)
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expose cổng 80 để chạy ứng dụng
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]