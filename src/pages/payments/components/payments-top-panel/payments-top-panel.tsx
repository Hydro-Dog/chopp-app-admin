import { Flex } from 'antd';
import { PaymentsDateFilter } from './payments-date-filter';
import { PaymentsStatusFilter } from './payments-status-filter';

export const PaymentsTopPanel = () => (
  <Flex vertical gap={7} className="sticky w-full mb-3 top-0 z-50 p-3 ">
    <PaymentsDateFilter />
    <PaymentsStatusFilter />
  </Flex>
);
