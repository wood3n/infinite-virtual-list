import { useEffect, useRef, useState, forwardRef } from "react";
import { ResizableBox } from "react-resizable";
import { VirtuosoGrid } from "react-virtuoso";

import "react-resizable/css/styles.css";

import { getData, type Data } from "../mock";

interface ListProps {
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const List = forwardRef<HTMLDivElement, ListProps>(({ style, children, ...props }, ref) => (
  <div
    ref={ref}
    {...props}
    style={{
      width: "100%",
      display: "grid",
      gridTemplateColumns: "repeat(3, minmax(100px, 1fr))",
      ...style,
    }}
  >
    {children}
  </div>
));

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
      <VirtuosoGrid
        style={{ height: size.height }}
        totalCount={list.length}
        onScroll={handleScroll}
        components={{
          List,
          Item: ({ children, ...props }) => (
            <div
              {...props}
              style={{
                padding: "0.5rem",
                flex: 1,
                display: "flex",
                alignContent: "stretch",
                boxSizing: "border-box",
              }}
            >
              {children}
            </div>
          ),
          Footer: () => (loading ? <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>加载更多中...</div> : null),
        }}
        itemContent={index => (
          <div
            style={{
              height: 200,
              width: "100%",
              padding: 24,
              border: "1px solid gray",
            }}
          >
            Item {index}
          </div>
        )}
      />
    </ResizableBox>
  );
};

export default Demo;
