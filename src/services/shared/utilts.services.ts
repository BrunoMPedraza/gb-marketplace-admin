import TreeNode from "primereact/treenode";

export function parseKeys(keysString:string):string[] {
  return keysString.split("-");
}

export function replaceValue(keys: string[], obj: any, newValue: string) {
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    console.log(current)
    current = current[keys[i]];
  }
  current[keys[keys.length - 1]] = newValue;
  return { ...obj };
}

export function modifyNode(node: TreeNode, keys: string[], updateFn: (node: TreeNode) => void) {
  if (keys.length === 0) {
    updateFn(node);
    return;
  }

  if (!node.children || !node.children.length) {
    return;
  }

  const [key, ...restKeys] = keys;
  const nextNode = node.children.find(child => child.key === key);

  if (nextNode) {
    modifyNode(nextNode, restKeys, updateFn);
  }
}

export function setValueInNode(obj: any, keys: string[], value: any) {
  return keys.reduce((acc, key, index) => {
    if (index === keys.length - 1) {
      return { ...acc, [key]: value };
    }
    return { ...acc, [key]: { ...acc[key] } };
  }, obj);
}
