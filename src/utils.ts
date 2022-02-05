export function makeImagePath(id: string, format?: string) {
  console.log(id, format);
  return `https://image.tmdb.org/t/p/${format ? format : 'original'}${id}`;
}
