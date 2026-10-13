import { FindManyOptions, ObjectLiteral, Repository } from 'typeorm';

export async function paginate<T extends ObjectLiteral>(
  repository: Repository<T>,
  page = 1,
  limit = 10,
  options: FindManyOptions<T> = {},
) {
  const currentPage = Math.max(1, Math.floor(Number(page) || 1));

  const pageSize = Math.min(100, Math.max(1, Math.floor(Number(limit) || 10)));

  const [data, total] = await repository.findAndCount({
    ...options,
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  });

  const totalPages = Math.ceil(total / pageSize);

  return {
    success: true,
    data,
    pagination: {
      total,
      page: currentPage,
      limit: pageSize,
      totalPages,
      hasNextPage: currentPage < totalPages,
      hasPreviousPage: currentPage > 1,
    },
  };
}
