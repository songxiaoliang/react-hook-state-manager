import { useRef, useEffect, useReducer } from "react";
import render from "./renderer";

// react 组件，感知 hook 内状态的变更
const Executor = (props) => {
  const store = props.hook();
  const mountRef = useRef(false);
  // 状态管理库初始化
  if (!mountRef.current) {
    props.onMount(store);
    mountRef.current = true;
  }
  // store 一旦变更，就会执行 useEffect 回调
  useEffect(() => {
    props.onUpdate(store); // 一旦状态变更，通知依赖的组件更新
  });

  return null;
};

function createContainer(hook) {
  let store;
  const listeners = new Set(); // 定义回调集合

  const onUpdate = (store) => {
    for (const listener of listeners) {
      listener(store);
    }
  };

  const onMount = (val) => {
    store = val;
  };

  render(<Executor onMount={onMount} hook={hook} onUpdate={onUpdate} />);

  // 提供给子组件的 API 方法
  function useContainer() {
    const storeRef = useRef(store);
    const [, forceUpdate] = useReducer((c) => c + 1, 0);

    useEffect(() => {
      function listener(newStore) {
        storeRef.current = newStore;
        forceUpdate();
      }

      listeners.add(listener); // 初始化的时候添加回调，订阅更新

      return () => listeners.delete(listener); // 组件销毁的时候移除回调
    }, []);

    return storeRef.current;
  }

  return useContainer;
}

export default createContainer;
