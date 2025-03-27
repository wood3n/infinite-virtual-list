import { useEffect, useRef, useState } from "react";
import { ResizableBox } from "react-resizable";
import VirtualList from "rc-virtual-list";

import { getData, type Data } from "../mock";

import "react-resizable/css/styles.css";

const Demo = () => {
  const [hasMore, setHasMore] = useState(false);
  const [list, setList] = useState<Data[]>([]);
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState({
    width: 600,
    height: 600,
  });

  const pageRef = useRef(1);
  const pageSize = 12;
  const rowHeight = 60;

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

  const handleScroll: React.UIEventHandler<HTMLElement> = e => {
    if (hasMore && !loading && e.currentTarget.scrollHeight - e.currentTarget.scrollTop === size.height) {
      pageRef.current = pageRef.current + 1;
      loadMore(pageRef.current);
    }
  };

  return (
    <ResizableBox
      height={size.height}
      width={size.width}
      onResize={(_, { size }) => {
        setSize({ width: size.width, height: size.height });
      }}
      resizeHandles={["se"]}
      style={{
        border: "1px solid #000",
        overflow: "hidden",
      }}
    >
      <VirtualList data={list} height={size.height} itemHeight={rowHeight} itemKey="id" showScrollBar onScroll={handleScroll}>
        {item => (
          <div key={item.id} style={{ height: 60, padding: 8 }}>
            <div style={{ padding: 8, border: "1px solid #000" }}>{item.name}</div>
          </div>
        )}
      </VirtualList>
    </ResizableBox>
  );
};

export default Demo;
