import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/system';
import { FETCH_STATUS, fetchUser, RootState } from '@store/index';
import { Button, Card, Typography } from 'antd';

const { Title } = Typography;

export const UserProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user, fetchUserStatus } = useSelector((state: RootState) => state.user);
  const [showDetails, setShowDetails] = useState(true); // Using '1' as the default active key

  useEffect(() => {
    dispatch(fetchUser(id));
  }, [dispatch, id]);

  return !showDetails ? (
    <Box className="mb-4">
      <Box className="flex justify-between items-baseline py-3 pr-6 pl-6 bg-white rounded-md border border-solid border-slate-100 ">
        <Title level={5}>User Profile</Title>
        <Button onClick={() => setShowDetails(!showDetails)}>C</Button>
      </Box>
    </Box>
  ) : (
    <Card
      title="User Profile"
      style={{ marginBottom: 20 }}
      loading={fetchUserStatus === FETCH_STATUS.LOADING}
      extra={<Button onClick={() => setShowDetails(!showDetails)}>C</Button>}>
      <p>Name: {user?.fullName}</p>
      <p>Email: {user?.email}</p>
      <p>Phone: {user?.phoneNumber}</p>
    </Card>
  );
};
