export function lazy<T>(initializer: () => Promise<T>): () => Promise<T> {
  const LAZY = 'LAZY';
  const LOADING = 'LOADING';
  const READY = 'READY';
  type Result = [typeof LAZY] | [typeof LOADING] | [typeof READY, T];
  let result: Result = [LAZY];
  const callbacks: Array<(value: T) => void> = [];
  return async () => {
    if (result[0] === READY) {
      return result[1];
    } else if (result[0] === LOADING) {
      return await new Promise((resolve) => {
        callbacks.push(resolve);
      });
    } else {
      result = [LOADING];
      const value = await initializer();
      result = [READY, value];
      for (const f of callbacks) {
        f(value);
      }
      return value;
    }
  };
};

