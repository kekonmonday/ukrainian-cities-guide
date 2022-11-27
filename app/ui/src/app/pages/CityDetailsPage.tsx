import { Space, Typography } from 'antd';
import { useCityDetails } from 'api/hooks';
import { Loader } from 'components';
import { FC } from 'react';
import { useParams } from 'react-router-dom';

const Info: FC<{
  label: string;
  value: string;
}> = ({ label, value }) => (
  <Space direction='vertical'>
    <Typography.Text type='secondary'>{label.toUpperCase()}</Typography.Text>
    <Typography.Text>{value}</Typography.Text>
  </Space>
);

export const CityDetailsPage: FC = () => {
  const { id } = useParams();

  const response = useCityDetails(id!);

  return (
    <Loader response={response}>
      {(data) => (
        <Space direction='vertical'>
          <h1>{data.name}</h1>
          <Info label='Description' value={data.description} />
          <Info label='Mayor' value={data.mayor} />
          <Info label='Area (km2)' value={data.areaTotalKm} />
        </Space>
      )}
    </Loader>
  );
};
