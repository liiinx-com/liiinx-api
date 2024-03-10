import { HttpException, HttpStatus, Logger } from '@nestjs/common';

export const throwExceptionIfFailed = async <PromiseReturnType>(
  logger: Logger,
  promise: Promise<PromiseReturnType>,
) => {
  return promise.catch((e: Error) => {
    logger.error(e);
    throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
  });
};
