import { LoadingOutlined } from '@ant-design/icons';
import { Spin as AntdSpin } from 'antd';
import { FC } from 'react';
import './Spin.css';

export const Spin: FC = () => (
  <div className='spin-container'>
    <AntdSpin spinning tip='Loading...' indicator={<LoadingOutlined />} />
  </div>
);
