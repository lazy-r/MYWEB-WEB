yarn run build
docker rm -f myweb_web
docker rmi -f myweb_web:v1
docker build -t myweb_web:v1 .
docker run -d --name="myweb_web" -p 80:9999 myweb_web:v1
