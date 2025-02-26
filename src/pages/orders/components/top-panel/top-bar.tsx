import { DateSelector, SearchBar, StatusSelector } from './components';

export const TopBar = () => (
  <>
    <div className="lg:flex flex-row gap-5 mb-3">
      <SearchBar />
      <DateSelector />
    </div>
    <StatusSelector />
  </>
);
