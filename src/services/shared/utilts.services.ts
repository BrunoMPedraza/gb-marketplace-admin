export function parseKeys(keysString:string):string[] {
  return keysString.split("-");
}
export const findNodeByKey = (nodes:any, key:any) => {
    let path = key.split('-');
    let node;

    while (path.length) {
        let list:any = node ? node.children : nodes;
        node = list[parseInt(path[0], 10)];
        path.shift();
    }

    return node;
}

export const updateObject = (obj: any, path: string[], newValue: any) => {
  const copy = {...obj};
  let current = copy;
  for (let i = 0; i < path.length - 1; i++) {
    current = current[path[i]];
  }
  current[path[path.length - 1]] = newValue;
  return copy;
};

export function replaceValue(keys: string[], obj: any, newValue: string) {
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    current = current[keys[i]];
  }
  current[keys[keys.length - 1]] = newValue;
  return { ...obj };
}

