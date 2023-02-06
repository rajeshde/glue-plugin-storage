module.exports = () => [
  {
    "path": "/backend/services/upload",
    "size_in_mb": 100,
    "proxy": {
      "instance": "services:9090",
      "path": "/upload",
    },
  },
  {
    "path": "/backend/services/file/(.*)",
    "host": "minio_host:minio_port",
    "proxy": {
      "instance": "minio_host:minio_port",
      "path": "/$1",
    },
  },
];
