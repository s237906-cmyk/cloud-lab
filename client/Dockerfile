
# Câu 51: Base Image
FROM node:24

# Câu 52: Working directory
WORKDIR /app

# Câu 53: Copy package files
COPY package*.json ./

# Câu 54: Install dependencies
RUN npm install

# Câu 55: Copy source code
COPY . .

# Câu 56: Build React Application
RUN npm run build

# Cài đặt web server nhẹ để phục vụ thư mục dist
RUN npm install -g serve

# Khai báo port ứng dụng
EXPOSE 3000

# Câu 60: Lệnh khởi chạy Frontend Container
CMD ["serve", "-s", "dist", "-l", "3000"]
