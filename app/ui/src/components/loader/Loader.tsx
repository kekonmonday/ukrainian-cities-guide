import { UseQueryResult } from '@tanstack/react-query';
import { Result } from 'antd';
import { Spin } from 'components';
import { ApiError } from 'types';
import { capitalize } from 'utils';

interface LoaderProps<T> {
  children: (s: T) => JSX.Element;
  response: UseQueryResult<T, ApiError>;
}

export const Loader = <T,>({ children, response }: LoaderProps<T>): JSX.Element => {
  if (response.isSuccess && response.data) {
    return children(response.data);
  }

  if (response.isError && response.error) {
    return (
      <Result
        status='error'
        title='Oops! Something went wrong!'
        subTitle={`${capitalize(response.error.message)} (${response.error.code})`}
      />
    );
  }

  return <Spin />;
};
