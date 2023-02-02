import TreeNode from 'primereact/treenode';
import EN from '../../locales/en/translationEN.json'
import ES from '../../locales/es/translationES.json'

export const NodeService = {
    getTreeNodesData() {
        return [...mapTranslations(false)]
    },
    getTreeNodes() {
        return Promise.resolve(this.getTreeNodesData());
    },
    getTreeTableNodesData() {
        return [...mapTranslations(true)]
    },
    getTreeTableNodes() {
        return Promise.resolve(this.getTreeTableNodesData());
    },
};

function convertToTreeNode(obj: any, keyPrefix?: string): any[] {
    return Object.entries(obj).map(([key, value]) => {
      const newKey = `${keyPrefix}-${key}`;
      if (typeof value === 'object' && value !== null) {
        const children = Object.keys(value).length ? convertToTreeNode(value, newKey) : [];
        return { 
            key: newKey, 
            label: key, 
            data: `${key} Folder`, 
            icon: 'pi pi-fw pi-folder-open', 
            children 
        };
      } else {
        return { 
            key: newKey, 
            label: `🔑${key} - ${value}` || key, 
            data:  `🔑${key} - ${value}`,
            icon: 'pi pi-fw pi-align-left', 
            children: [] 
        };
      }
    });
}
function convertToTreeTableNode(obj: Record<string,string> | string, keyPrefix?: string): any[] {
    return Object.entries(obj).map(([key, value]) => {
        const newKey = keyPrefix ? `${keyPrefix}-${key}` : key;
        const hasValueChildren = typeof value === 'object' && value !== null
        const children = Object.keys(hasValueChildren && value).length ? convertToTreeTableNode(value, newKey) : [];
        return { 
            key: newKey, 
            data: {
                name: hasValueChildren ? `📂 - ${key}` :  `🔑 ${key} - Valor: ${value}`
            }, 
            isValue: !hasValueChildren,
            children 
        };
    });
}
function mapTranslations( isTable:boolean ){
    const target = JSON.stringify(ES)
    const obj = JSON.parse(target);
    console.log(obj)
    const formattedObj:TreeNode[] = isTable ? convertToTreeTableNode(obj) : convertToTreeNode(obj);
    return formattedObj
}