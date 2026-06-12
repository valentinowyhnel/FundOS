/**
 * Standard cursor-based pagination helper.
 */
export async function paginate<T>(
  model: any,
  args: any = {},
  options: { limit?: number; cursor?: string; direction?: 'asc' | 'desc' } = {}
) {
  const limit = options.limit || 20;
  const direction = options.direction || 'desc';

  const items = await model.findMany({
    ...args,
    take: limit + 1,
    cursor: options.cursor ? { id: options.cursor } : undefined,
    orderBy: { createdAt: direction },
  });

  const hasNextPage = items.length > limit;
  const data = hasNextPage ? items.slice(0, -1) : items;
  const nextCursor = hasNextPage ? data[data.length - 1].id : null;

  return {
    data,
    meta: {
      hasNextPage,
      nextCursor,
    },
  };
}
