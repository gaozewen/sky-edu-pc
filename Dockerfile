# 容器的环境 node 18
# As builder 多阶段构建
FROM node:18 AS builder

COPY package.json .
COPY pnpm-lock.yaml .
RUN npm config set registry https://registry.npmmirror.com && npm i -g pnpm
RUN pnpm config set registry https://registry.npmmirror.com && pnpm i

# 将项目所有文件拷贝到 node 容器中
# 第一个 . 的意思，当前 Dockerfile 所在目录
# 第二个 . 的意思，当前启动容器的根目录
COPY . .
RUN pnpm run build

FROM nginx:1.25.1

# 将 node 容器中的 /dist 目录下的所有文件，拷贝到 nginx 容器中的 /usr/share/nginx/html 目录下
COPY --from=builder /dist /usr/share/nginx/html
# 授予 favicon.ico 文件读的权限
RUN chmod a+r /usr/share/nginx/html/favicon.ico
# 授予 logo.png 文件读的权限
RUN chmod a+r /usr/share/nginx/html/logo.png
# 授予 manifest.json 文件读的权限
RUN chmod a+r /usr/share/nginx/html/manifest.json
# 授予 robots.txt 文件读的权限
RUN chmod a+r /usr/share/nginx/html/robots.txt

# 将 sky-edu-mobile 项目中的 nginx.conf 文件，
# 拷贝到 nginx 容器中的 /etc/nginx/conf.d/ 目录下，
# 并命名为 default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf