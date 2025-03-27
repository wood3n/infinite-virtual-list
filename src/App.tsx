import ReactVirtualizedDemo from "./react-virtualized";
import RcVirtualListDemo from "./rc-virtual-list";
import ReactVirtuosoDemo from "./react-virtuoso";

function App() {
  return (
    <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h1>react-virtualized（27.9kB）</h1>
        <ReactVirtualizedDemo />
      </div>
      <div>
        <h1>rc-virtual-list（12.2kB）</h1>
        <RcVirtualListDemo />
      </div>
      <div>
        <h1>react-virtuoso（17.9kB）</h1>
        <ReactVirtuosoDemo />
      </div>
    </div>
  );
}

export default App;
