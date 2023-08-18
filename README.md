# copy-cross-device
跨设备拷贝粘贴


arm架构docker

build:
```shell
docker buildx build --load --platform linux/arm64 -t yltstc/copy-cross-device:arm-latest .
```


run:
```shell
docker run -v /tmp/:/tmp/ -p 3000:3000 yltstc/copy-cross-device:arm-latest
```