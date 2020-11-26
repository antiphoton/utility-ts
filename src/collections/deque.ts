import assert from 'assert';

const INITIAL_CAPACITY = 2;

export class Deque<T> {
  getSize(): number {
    const s = this.#end - this.#begin;
    if (s >= 0) {
      return s;
    } else {
      return this.#data.length + s;
    }
  }
  peekLeft(): T {
    assert(this.getSize() > 0);
    return this.#data[this.#begin]!;
  }
  peekRight(): T {
    assert(this.getSize() > 0);
    return this.#data[this.getIndexOnLeft(this.#end)]!;
  }
  popLeft(): T {
    assert(this.getSize() > 0);
    const x = this.#data[this.#begin]!;
    this.#begin = this.getIndexOnRight(this.#begin);
    return x;
  }
  popRight(): T {
    assert(this.getSize() > 0);
    this.#end = this.getIndexOnLeft(this.#end);
    return this.#data[this.#end];
  }
  pushLeft(x: T) {
    this.ensureCapacity();
    this.#begin = this.getIndexOnLeft(this.#begin);
    this.#data[this.#begin] = x;
  }
  pushRight(x: T) {
    this.ensureCapacity();
    this.#data[this.#end] = x;
    this.#end = this.getIndexOnRight(this.#end);
  }
  #data: T[] = Array(INITIAL_CAPACITY).fill(null);
  #begin = 0;
  #end = 0;
  private ensureCapacity() {
    const n = this.#data.length;
    if (this.getSize() + 1 === n) {
      for (let i = 0; i < n; i += 1) {
        this.#data.push(null as unknown as T);
      }
      if (this.#begin !== 0) {
        for (let i = this.#begin; i < n; i += 1) {
          this.#data[n + i] = this.#data[i];
          this.#data[i] = null as unknown as T;
        }
        this.#begin += n;
      }
    }
  }
  private getIndexOnLeft(i: number): number {
    if (i === 0) {
      return this.#data.length - 1;
    } else {
      return i - 1;
    }
  }
  private getIndexOnRight(i: number): number {
    if (i === this.#data.length - 1) {
      return 0;
    } else {
      return i + 1;
    }
  }
};

