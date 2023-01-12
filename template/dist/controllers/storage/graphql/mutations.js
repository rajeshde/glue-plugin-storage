"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Mutations {
    constructor() {
        this.InsertFile = `mutation ($name: String!, $original_name: String!, $size: Int!, $mime_type: String!, $etag: String!, $path: String!) {
    insert_files_one(object: {name: $name, original_name: $original_name, size: $size, mime_type: $mime_type, etag: $etag, path: $path}) {
      id
      name
      original_name
      size
      mime_type
      etag
      path
      created_at
      updated_at
    }
  }`;
    }
}
exports.default = new Mutations();
