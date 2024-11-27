# Sử dụng Node.js làm base image
FROM node:18-alpine

# Đặt thư mục làm việc
WORKDIR /app

# Copy file package.json và cài đặt dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy mã nguồn vào container
COPY . .

# Expose cổng mà server sẽ lắng nghe
EXPOSE 8081

# Khởi chạy server
CMD ["npm", "start"]