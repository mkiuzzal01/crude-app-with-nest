type TResponse<T> = {
  success?: boolean;
  statusCode?: number;
  message?: string;
  data?: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
};

export const sendResponse = <T>({
  success = true,
  statusCode = 200,
  message = 'Success',
  data,
  meta,
}: TResponse<T>) => {
  return {
    success,
    statusCode,
    message,
    meta,
    data,
  };
};
