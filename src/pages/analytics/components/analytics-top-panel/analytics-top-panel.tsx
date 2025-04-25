import { Flex } from 'antd';
import { AnalyticsProductsFilter, AnalyticsDateFilter } from './components';

export const AnalyticsTopPanel = () => (
  <>
    <Flex vertical gap={7} className="sticky w-full mb-3 top-0 z-50 p-3">
      <AnalyticsProductsFilter />
      <AnalyticsDateFilter />
    </Flex>
  </>
);
