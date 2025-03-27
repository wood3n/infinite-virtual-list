export interface Data {
  id: string;
  name: string;
}

const data = Array(402).fill(1);

export const getData = (page: number, pageSize: number = 10) => {
  const total = 400;

  return new Promise<{ list: Data[]; total: number }>(resolve => {
    setTimeout(() => {
      resolve({
        list: data.slice((page - 1) * pageSize, page * pageSize).map((_, index) => ({
          id: `${page}-${index + 1}`,
          name: `${page}-${index + 1}`,
        })),
        total,
      });
    }, 1000);
  });
}