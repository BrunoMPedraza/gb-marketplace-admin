import TreeNode from 'primereact/treenode';
import { CustomTreeNode } from '../../components/modules/Table/interfaces';
import EN from '../../locales/en/translationEN.json'
import ES from '../../locales/es/translationES.json'

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
                `📂 - ${key}` 
                :  `🔑 ${key} - Valor: ${value}`,
                raw: hasValueChildren ? key : value
            }, 
            isValue: !hasValueChildren,
            children 
        };
    });
}
function mapTranslations( obj:Record<string,string>  ){
    const formattedObj:TreeNode[] = convertToTreeTableNode(obj);
    return formattedObj
} 
