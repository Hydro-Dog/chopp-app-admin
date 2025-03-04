import { Flex } from 'antd';
import { DateSelector, SearchBar, StatusSelector } from './components';

export const OrdersTopPanel = () => (
  <>
    <Flex vertical gap={7} className="w-1/3 mb-3">
      <SearchBar />
      <DateSelector />
      <StatusSelector />
    </Flex>
  </>
);
