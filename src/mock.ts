export interface Data {
  id: string;
  name: string;
}

const data = Array(102).fill(1);

export const getData = (page: number, pageSize: number = 10) => {
  return new Promise<{ list: Data[]; total: number }>(resolve => {
    setTimeout(() => {
      resolve({
        list: data.slice((page - 1) * pageSize, page * pageSize).map((_, index) => ({
          id: `${page}-${index + 1}`,
          name: `${page}-${index + 1}`,
        })),
        total: 102,
      });
    }, 1000);
  });
};
