import TreeNode from 'primereact/treenode';
import { CustomTreeNode } from '../../components/modules/Table/interfaces';
import { translationsFormat } from '../../mocks/interfaces';

export const NodeService = {
    getTreeTableNodesData(obj:Record<string,string> ) {
        return [...mapTranslations(obj)]
    },
    getTreeTableNodes( obj:Record<string,string> ) {
        return Promise.resolve(this.getTreeTableNodesData(obj));
    },
};

function convertToTreeTableNode(obj: Record<string,string> | string, keyPrefix?: string): CustomTreeNode[] {
    return Object.entries(obj).map(([key, value]) => {
        const newKey = keyPrefix ? `${keyPrefix}-${key}` : key;
        const hasValueChildren = typeof value === 'object' && value !== null
        const children = Object.keys(hasValueChildren && value).length ? convertToTreeTableNode(value, newKey) : [];
        return { 
            key: newKey, 
            data: {
                name: hasValueChildren ? 
                `📂 [${key}]` 
                :  `[${key}] - ${value}`,
                raw: hasValueChildren ? key : value
            }, 
            isValue: !hasValueChildren,
            children 
        };
    });
}
export function convertFromTreeTableNode(nodes: CustomTreeNode[]): Record<string, string> | string {
    const result: Record<string, string> = {};
    nodes.forEach(node => {
        if (node && node.key && node.data && node.children) {
        const keys = String(node.key).split("-");
        let current:any = result;
        keys.forEach((key, index) => {
            if (index === keys.length - 1) {
                if (node.isValue) {
                    current[key] = node.data?.raw || '';
                } else {
                    if (node.children) {
                        current[key] = convertFromTreeTableNode(node.children);
                    }
                }
            } else {
                if (!current[key]) {
                    current[key] = {};
                }
                current = current[key];
            }
        });
    }
    });

    return result;
}

export function updateNodeInTree(targetNode: CustomTreeNode[], keys: string[], newRawValue: string, newNameValue: string): CustomTreeNode[] {
    return targetNode.map(node => {
      if (node.key === keys.join('-')) {
        return {
          ...node,
          data: {
            ...node.data,
            raw: newRawValue,
            name: `${!node.isValue ? '📂' : ''} [${keys[keys.length - 1]}] - ${newNameValue}`,
          },
        };
      }
      if (node.children) {
        return {
          ...node,
          children: updateNodeInTree(node.children, keys, newRawValue, newNameValue),
        };
      }
      return node;
    });
  }

function convertNodeToJSObject(nodes: CustomTreeNode[]): object {
    let obj: any = {};
    nodes.forEach(node => {
      if (node.isValue && node.key && node.data) {
        obj[node.key] = node.data.raw;
      } else if (node.children && node.key) {
        obj[node.key] = convertNodeToJSObject(node.children);
      }
    });
    return obj;
  }
  export const formatForSubmit = (spanishTranslations: CustomTreeNode[], englishTranslation: CustomTreeNode[]):translationsFormat[] => {
    const result:translationsFormat[] = [
        {
            content: convertNodeToJSObject(spanishTranslations),
            lang_id: 'es'
        },
        {
            content: convertNodeToJSObject(englishTranslation),
            lang_id: 'en'
        },
    ]
    return result
  }

function mapTranslations( obj:Record<string,string>  ){
    const formattedObj:TreeNode[] = convertToTreeTableNode(obj);
    return formattedObj
} 
