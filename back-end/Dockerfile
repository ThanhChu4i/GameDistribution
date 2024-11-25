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

# Mở cổng 8081
EXPOSE 8081

# Khởi chạy server
CMD ["npm", "start"]
