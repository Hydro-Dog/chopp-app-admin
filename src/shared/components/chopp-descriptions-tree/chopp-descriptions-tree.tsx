import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { formatPhoneNumber } from '@shared/utils';
import { Space, Tree, Typography, Tooltip, Checkbox } from 'antd';
import { ChoppTextWithTooltip } from '../chopp-text-with-tooltip';
import type { DataNode } from 'antd/es/tree';

const { Text } = Typography;

type Props = {
  value?: object;
  defaultExpanded?: boolean;
  keyTranslations?: object;
};

export const ChoppDescriptionsTree: React.FC<Props> = ({
  value = {},
  defaultExpanded = true,
  keyTranslations,
}) => {
  const { t } = useTranslation();
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
                {t('ITEM', { index: index + 1 })}
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
              {t(keyTranslations?.[key]) || key}
            </Text>
            {!children &&
              (typeof val === 'boolean' ? (
                <Tooltip title={val ? t('YES') : t('NO')}>
                  <Checkbox checked={val} />
                </Tooltip>
              ) : (
                <ChoppTextWithTooltip
                  placement="bottom"
                  title={key === 'phoneNumber' ? formatPhoneNumber(String(val)) : String(val)}
                  tooltipText={String(val)}
                  copyable
                  showInfoIcon={false}
                />
              ))}
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
