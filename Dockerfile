# 使用node版本11.12.0
FROM node:11.12.0


# 进入code文件夹，如果没有则会生成，并进入文件夹
WORKDIR /code
# 将当前内容 放入code文件夹
ADD . /code

# 执行指令
RUN npm install && npm build && npm install -g http-server

# 暴露容器端口 8040
EXPOSE 8040

# 当执行docker run的时候会执行以下shell 脚本。
CMD http-server ./build -p 8040
