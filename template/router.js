module.exports = () => [
  {
    "path": "/backend/functions/upload",
    "size_in_mb": 100,
    "proxy": {
      "instance": "functions:3500",
      "path": "/v1.0/invoke/functions/method/upload",
    },
  },
  {
    "path": "/backend/functions/file",
    "host": "minio_host:minio_port",
    "proxy": {
      "instance": "minio_host:minio_port",
      "path": "/",
    },
  },
];
