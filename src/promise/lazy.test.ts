import {
  lazy,
} from './lazy';

describe('lazy', () => {
  it('calls initializer only once', async () => {
    const f = jest.fn().mockResolvedValue(42);
    const g = lazy(f);
    expect(f).toBeCalledTimes(0);
    const x1 = await g();
    expect(f).toBeCalledTimes(1);
    expect(x1).toEqual(42);
    const x2 = await g();
    expect(f).toBeCalledTimes(1);
    expect(x2).toEqual(42);
  });
  it('handles expensive initialier', async () => {
    const f = jest.fn();
    const g = lazy(async () => {
      f();
      await new Promise(resolve => setTimeout(resolve, 100));
      return 42;
    });
    const a = await Promise.all([g(), g(), g()]);
    expect(f).toBeCalledTimes(1);
    expect(a).toEqual([42, 42, 42]);
  });
});

