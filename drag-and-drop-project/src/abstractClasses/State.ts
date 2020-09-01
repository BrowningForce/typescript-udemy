import { Listener } from '../types';

export default abstract class State<T> {
  protected listeners: Listener<T>[] = [];

  addListener(listener: Listener<T>) {
    this.listeners.push(listener);
  }
}
