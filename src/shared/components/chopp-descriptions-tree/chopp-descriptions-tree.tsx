import React, { useState, useEffect } from 'react';
import { Space, Tree, Typography, Tooltip } from 'antd';
import type { DataNode } from 'antd/es/tree';

const { Text } = Typography;

type Props = {
  value?: object;
  defaultExpanded?: boolean; // Начальное состояние узлов
};

export const ChoppDescriptionsTree: React.FC<Props> = ({ value = {}, defaultExpanded = true }) => {
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

  // Функция рекурсивного построения структуры дерева
  const buildTreeData = (obj: any, path = ''): DataNode[] => {
    return Object.entries(obj).map(([key, val]) => {
      const nodeKey = path ? `${path}.${key}` : key;
      let children;

      if (Array.isArray(val)) {
        // Если массив, строим элементы массива
        children = val.map((item, index) => ({
          title: (
            <Tooltip title={`Item ${index + 1}`}>
              <span className="truncate max-w-[200px] block pointer-events-none">
                {`Item ${index + 1}`}
              </span>
            </Tooltip>
          ),
          key: `${nodeKey}[${index}]`,
          selectable: false, // Отключаем клик
          children:
            typeof item === 'object' ? buildTreeData(item, `${nodeKey}[${index}]`) : undefined,
        }));
      } else if (typeof val === 'object' && val !== null) {
        // Если объект, рекурсивно строим дерево
        children = buildTreeData(val, nodeKey);
      }

      return {
        title: (
          <Space>
            <Text strong className="truncate max-w-[150px]">
              {key}
            </Text>
            {!children && (
              <Tooltip title={String(val)}>
                <Text className="truncate max-w-[200px] block">{String(val)}</Text>
              </Tooltip>
            )}
          </Space>
        ),
        key: nodeKey,
        selectable: false, // Отключаем клик
        children,
      };
    });
  };

  const treeData = buildTreeData(value);

  // Устанавливаем начальные открытые узлы один раз при монтировании компонента
  useEffect(() => {
    if (defaultExpanded) {
      const allKeys = treeData.flatMap((node) => (node.children ? String(node.key) : []));
      setExpandedKeys(allKeys);
    }
  }, []); // Выполняется только при монтировании

  return (
    <Tree
      className="w-full [&_.ant-tree-treenode]:!bg-transparent"
      treeData={treeData}
      expandedKeys={expandedKeys}
      onExpand={(keys) => setExpandedKeys(keys as string[])}
      selectable={false} // Отключаем клик по всем элементам
    />
  );
};
