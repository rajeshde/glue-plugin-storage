class Queries {
  public FileByPath = `query ($path: String!) {
    files(where: {path: {_eq: $path}}) {
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

export default new Queries();
