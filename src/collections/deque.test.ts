import {
  Deque,
} from './deque';

describe('deque', () => {
  it('calculates size', () => {
    const q = new Deque<number>();
    q.pushRight(1);
    q.pushRight(2);
    q.pushRight(3);
    expect(q.getSize()).toBe(3);
    q.pushLeft(4);
    q.pushRight(5);
    expect(q.getSize()).toBe(5);
  });
  it('peeks from both side', () => {
    const q = new Deque<number>();
    q.pushLeft(5);
    q.pushLeft(4);
    q.pushLeft(3);
    q.pushLeft(2);
    q.pushLeft(1);
    expect(q.peekLeft()).toBe(1);
    expect(q.peekRight()).toBe(5);
    q.popRight();
    expect(q.peekLeft()).toBe(1);
    expect(q.peekRight()).toBe(4);
    q.popRight();
    expect(q.peekLeft()).toBe(1);
    expect(q.peekRight()).toBe(3);
  });
  it('pops from both side', () => {
    const q = new Deque<number>();
    q.pushLeft(3);
    q.pushRight(4);
    q.pushLeft(2);
    q.pushRight(5);
    q.pushLeft(1);
    q.pushRight(6);
    expect(q.popRight()).toBe(6);
    expect(q.popLeft()).toBe(1);
    expect(q.popRight()).toBe(5);
    expect(q.popLeft()).toBe(2);
    expect(q.popRight()).toBe(4);
  });
  it('handles boundary', () => {
    const q = new Deque<number>();
    q.pushLeft(1);
    expect(q.peekLeft()).toBe(1);
    expect(q.peekRight()).toBe(1);
    q.pushRight(2);
    expect(q.peekLeft()).toBe(1);
    expect(q.peekRight()).toBe(2);
    expect(q.popLeft()).toBe(1);
    q.pushRight(3);
    expect(q.peekRight()).toBe(3);
  });
});

