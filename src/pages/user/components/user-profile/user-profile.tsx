import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/system';
import { useTheme } from '@shared/index';
import { AppDispatch, FETCH_STATUS, fetchUser, RootState } from '@store/index';
import { Button, Card, Typography } from 'antd';
import classNames from 'classnames';

const { Title } = Typography;

export const UserProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { user, fetchUserStatus } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (id) {
      dispatch(fetchUser(id));
    }
  }, [dispatch, id]);

  return (
    <Card size="small">
      <Title className="!mb-2" level={3}>
        {user?.fullName}
      </Title>

      {/* TODO: перевод */}
      <p>Email: {user?.email}</p>
      <p>Phone: {user?.phoneNumber}</p>
    </Card>
  );
};
