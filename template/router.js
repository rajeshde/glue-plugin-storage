const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, "./.env") });

module.exports = () => [
  {
    "path": "/backend/services/upload",
    "size_in_mb": process.env.MAX_UPLOAD_SIZE || 100,
    "proxy": {
      "instance": "services:9090",
      "path": "/upload",
    },
  },
  {
    "path": "/backend/services/file/(.*)",
    "host_scheme": process.env.MINIO_PORT === "443" ? "https" : "http",
    "host": `${process.env.MINIO_ADMIN_END_POINT}:${process.env.MINIO_PORT}`,
    "proxy": {
      "instance": `${process.env.MINIO_ADMIN_END_POINT}:${process.env.MINIO_PORT}`,
      "path": "/$1",
    },
  },
];
