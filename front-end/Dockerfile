# Sử dụng Node.js làm base image
FROM node:18-alpine

# Đặt thư mục làm việc
WORKDIR /app

# Sao chép package.json và package-lock.json
COPY package.json package-lock.json ./

# Cài đặt các phụ thuộc bằng npm
RUN npm install

# Sao chép mã nguồn vào container
COPY . .

# Build ứng dụng frontend
RUN npm run build

# Sử dụng nginx để phục vụ ứng dụng
FROM nginx:stable-alpine
COPY --from=0 /app/build /usr/share/nginx/html

# Mở cổng 80
EXPOSE 80

# Khởi chạy nginx
CMD ["nginx", "-g", "daemon off;"]
