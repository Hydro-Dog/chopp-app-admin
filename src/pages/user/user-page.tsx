import { BackButton } from '@shared/components';
import { CallsHistoryTable, UserProfile } from './components';

export const UserPage = () => {
  return (
    <div className='flex flex-col gap-4'>
      <BackButton />
      <UserProfile />
      <CallsHistoryTable />
    </div>
  );
};
