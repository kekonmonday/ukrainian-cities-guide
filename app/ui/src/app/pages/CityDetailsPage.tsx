import { Divider, Empty, Space, Typography } from 'antd';
import { useCityDetails } from 'api/hooks';
import { Loader } from 'components';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { CityKnownFor } from 'types';

const Info: FC<{
  label: string;
  value: string;
}> = ({ label, value }) => (
  <Space direction='vertical'>
    <Typography.Text type='secondary'>{label.toUpperCase()}</Typography.Text>
    <Typography.Text>{value}</Typography.Text>
  </Space>
);

const KnownFor: FC<{
  value: CityKnownFor[];
}> = ({ value }) => {
  if (value.length === 0) {
    return <Empty />;
  }

  return (
    <Space direction='vertical'>
      <Typography.Text type='secondary'>KNOWN FOR</Typography.Text>
      {value.map((v, i) => (
        <Space direction='vertical'>
          <h4>{v.name}</h4>
          <Typography.Text>{v.description}</Typography.Text>
          {i != value.length - 1 && <Divider style={{ padding: 0, margin: 0 }} />}
        </Space>
      ))}
    </Space>
  );
};

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
          <KnownFor value={data.knownFor} />
        </Space>
      )}
    </Loader>
  );
};
