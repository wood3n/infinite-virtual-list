# 各种方式实现虚拟滚动+无限加载

## react-virtualized

包大，api使用较为复杂，不推荐使用。

## rc-virtual-list

包小，但支持的场景比较有限。

## react-virtuoso

api 使用简单，支持 grid 布局。对滚动加载场景支持也很好。

## @tanstack/react-virtual

api 使用简单，仅为单个 hook，与第三方组件例如`overlayscrollbars-react`结合非常简单。但是对 grid 等一行多个元素的布局场景看起来不是太支持。
