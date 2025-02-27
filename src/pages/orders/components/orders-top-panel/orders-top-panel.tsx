import { DateSelector, SearchBar, StatusSelector } from './components';

export const OrdersTopPanel = () => (
  <>
    <div className="flex flex-col w-1/4 gap-3 mb-3">
      <SearchBar />
      <DateSelector />
      <StatusSelector />
    </div>
  </>
);
