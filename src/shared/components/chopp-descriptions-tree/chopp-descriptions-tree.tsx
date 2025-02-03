import React, { useState, useEffect } from 'react';
import { Tree, Typography } from 'antd';
import type { DataNode } from 'antd/es/tree';

const { Text } = Typography;

type Props = {
  value?: object;
  defaultExpanded?: boolean; // Начальное состояние узлов
};

export const ChoppDescriptionsTree: React.FC<Props> = ({ value, defaultExpanded = true }) => {
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

  // Функция рекурсивного построения структуры дерева
  const buildTreeData = (obj: any, path = ''): DataNode[] => {
    return Object.entries(obj).map(([key, val]) => {
      const nodeKey = path ? `${path}.${key}` : key;
      let children;

      if (Array.isArray(val)) {
        // Если массив, используем `OrderedListOutlined` и строим элементы массива
        children = val.map((item, index) => ({
          title: `Item ${index + 1}`,
          key: `${nodeKey}[${index}]`,
          children:
            typeof item === 'object' ? buildTreeData(item, `${nodeKey}[${index}]`) : undefined,
        }));
      } else if (typeof val === 'object' && val !== null) {
        // Если объект, используем `FolderOutlined`
        children = buildTreeData(val, nodeKey);
      }

      return {
        title: (
          <>
            <Text>
              {key}: {children ? '' : String(val)}
            </Text>
          </>
        ),
        key: nodeKey,
        children,
      };
    });
  };

  const treeData = buildTreeData(value);

  // Устанавливаем начальные открытые узлы **один раз** при монтировании компонента
  useEffect(() => {
    if (defaultExpanded) {
      const allKeys = treeData.flatMap((node) => (node.children ? String(node.key) : []));
      setExpandedKeys(allKeys);
    }
  }, []); // Пустой массив зависимостей → выполняется только один раз

  return (
    <Tree
      treeData={treeData}
      expandedKeys={expandedKeys}
      onExpand={(keys) => setExpandedKeys(keys as string[])} // Обновляем состояние при сворачивании/разворачивании
    />
  );
};
