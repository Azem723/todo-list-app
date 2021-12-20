# 拉取node镜像打包React项目
# FROM node:14 (node 版本14) as 阶段命名
FROM node:14 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY public public/
COPY src src/
RUN npm run build

# 创建并运行Nginx服务器，并将打包好的文件复制粘贴到服务器文件夹
# copy --from=(阶段名)
FROM nginx:alpine
COPY --from=build /app/build/ /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
