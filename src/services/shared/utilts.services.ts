import TreeNode from "primereact/treenode";

export function parseKeys(keysString:string):string[] {
  return keysString.split("-");
}
export const findNodeByKey = (nodes:any, key:any) => {
  console.log(nodes,key)
    let path = key.split('-');
    let node;
    while (path.length) {
      console.log(path[0])
      console.log()
      const picked = (nodes.filter((a:any)=>a.key===path[0]))
      if ( !picked.isValue ){

      }
      console.log(picked)
      path.shift();
    }
    console.log(node)
    return node;
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
