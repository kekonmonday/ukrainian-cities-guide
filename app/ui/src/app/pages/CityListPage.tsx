import { List, Pagination, Space } from 'antd';
import { useCityList } from 'api/hooks';
import { Loader } from 'components';
import { CSSProperties, FC, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

const LINK_STYLE: CSSProperties = { color: 'black' };
const SPACE_STYLE: CSSProperties = { width: '100%' };
const PAGINATION_STYLE: CSSProperties = { textAlign: 'center' };

export const CityListPage: FC = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  const response = useCityList(page - 1, pageSize);

  const onChange = useCallback((p: number, ps: number) => {
    setPage(p);
    setPageSize(ps);
  }, []);

  return (
    <Loader response={response}>
      {(data) => (
        <Space direction='vertical' style={SPACE_STYLE}>
          <h1>Ukrainian Cities</h1>
          <List
            size='small'
            itemLayout='horizontal'
            dataSource={data.data}
            renderItem={(v) => (
              <List.Item>
                <Link to={`/cities/${v.id}`} style={LINK_STYLE}>
                  {v.name}
                </Link>
              </List.Item>
            )}
          />
          <Pagination
            current={page}
            pageSize={pageSize}
            total={data.count}
            onChange={onChange}
            pageSizeOptions={[25, 50, 100]}
            style={PAGINATION_STYLE}
          />
        </Space>
      )}
    </Loader>
  );
};
