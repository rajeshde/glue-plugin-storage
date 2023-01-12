module.exports = () => [
  {
    "path": "/backend/storagegqlfirst",
    "proxy": {
      "instance": "storagegqlfirst:3500",
      "path": "/v1.0/invoke/storagegqlfirst/method/"
    }
  }
];
