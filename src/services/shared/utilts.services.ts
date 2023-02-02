export function accessObjectByKeyPath(obj: any, keys: string[]): any | undefined {
  let current = obj;
  for (const key of keys) {
      if (!current.hasOwnProperty(key)) {
          return undefined;
      }
      current = current[key];
  }
  return current;
}
export function parseKeys(keysString:string) {
  console.log( keysString.split("-"))
    return keysString.split("-");
}