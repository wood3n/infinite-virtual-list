import { useEffect, useRef, useState } from "react";
import { AutoSizer, List, ListRowRenderer, type ScrollParams } from "react-virtualized";

import { getData, type Data } from "../mock";

const Demo = () => {
  const [hasMore, setHasMore] = useState(false);
  const [list, setList] = useState<Data[]>([]);
  const [loading, setLoading] = useState(false);

  const pageRef = useRef(1);
  const pageSize = 12;
  const rowHeight = 60;
  const rowCount = hasMore ? list.length + 1 : list.length;

  const loadMore = async (page: number) => {
    try {
      setLoading(true);
      const res = await getData(page, pageSize);

      if (res?.list?.length) {
        const newList = [...list, ...res.list];
        setList(newList);
        setHasMore(newList.length < res.total);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMore(pageRef.current);
  }, []);

  const handleScroll = ({ clientHeight, scrollHeight, scrollTop }: ScrollParams) => {
    if (hasMore && !loading && scrollHeight - rowHeight - scrollTop <= clientHeight) {
      pageRef.current = pageRef.current + 1;
      loadMore(pageRef.current);
    }
  };

  const renderRow: ListRowRenderer = ({ index: rowIndex, key, style: rowStyle }) => {
    const isLast = rowIndex === rowCount - 1;

    if (hasMore && isLast) {
      return (
        <div key={key} style={{ ...rowStyle, display: "flex", justifyContent: "center", alignItems: "center" }}>
          加载更多中..
        </div>
      );
    }

    return (
      <div key={key} style={{ ...rowStyle, padding: 8 }}>
        <div style={{ border: "1px solid #000", padding: 8 }}>{list[rowIndex]?.name}</div>
      </div>
    );
  };

  return (
    <div style={{ height: 600, width: 600, border: "1px solid #000" }}>
      <AutoSizer>
        {({ width, height }) => <List width={width} height={height} rowCount={rowCount} rowHeight={60} rowRenderer={renderRow} onScroll={handleScroll} />}
      </AutoSizer>
    </div>
  );
};

export default Demo;
