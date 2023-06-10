# Http proxy for upload files/data to IPFS node

### Upload file with curl

```bash
curl -i -X POST -H "Content-Type: multipart/form-data" -F 'file=@samples/cat.png' http://localhost:9000/upload/file
curl -i -X POST -H "Content-Type: multipart/form-data" -F 'file=@samples/random-gif.gif' http://localhost:9000/upload/file
curl -i -X POST -H "Content-Type: multipart/form-data" -F 'file=@samples/random-video.mp4' http://localhost:9000/upload/file
```
