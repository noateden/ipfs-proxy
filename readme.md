# Http proxy for upload files/data to IPFS node

### Upload image with curl

```bash
curl -i -X POST -H "Content-Type: multipart/form-data" -F 'image=@samples/cat.png' http://localhost:9000/upload/image
```
