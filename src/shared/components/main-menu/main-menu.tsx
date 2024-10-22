import { Outlet } from 'react-router-dom';
import { MainMenuWidget } from '@widgets/index';

export const MainMenu = () => {
  return (
    <MainMenuWidget>
      <div className="mx-6 my-4">
        <Outlet />
      </div>
    </MainMenuWidget>
  );
};
