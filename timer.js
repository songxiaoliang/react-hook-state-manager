import useContainer from "./useCount";

const Timer = () => {
  const store = useContainer() || {};
  return (
    <>
      <button onClick={store.decrement}>-</button>
      <span>{store.count}</span>
      <button onClick={store.increment}>+</button>
    </>
  );
};

export default Timer;
