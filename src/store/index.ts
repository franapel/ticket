import { defineStore } from 'pinia';
import eventsData from '../assets/events';

interface ICartEvent {
  readonly id: number;
  readonly name: string;
  readonly price: number;
  readonly url: string;
  quantity: number;
}

interface ICartState {
  readonly events: ICartEvent[];
}

export const useCartStore = defineStore('cart', {
  state: (): ICartState => ({ events: [] }),
  getters: {
    totalCost: (state) =>
      state.events
        .map((event) => event.price * event.quantity)
        .reduce((a, b) => a + b, 0),
    count: (state) => state.events.length,
  },
  actions: {
    addEvent(event: ICartEvent) {
      if (event.quantity < 1) return;
      const existing = this.events.find((e) => e.id === event.id);
      if (!existing) this.events.push(event);
      else existing.quantity += existing.quantity ? event.quantity : 0;
    },
  },
});

export interface IEvent {
  readonly id: number;
  readonly name: string;
  readonly price: number;
  readonly url: string;
}

interface IEventState {
  events: IEvent[];
}

export const useEventStore = defineStore('event', {
  state: (): IEventState => ({ events: [] }),
  getters: {},
  actions: {
    fetchEvents() {
      const fetchedEvents: IEvent[] = eventsData.map((e) => {
        const { id, name, price, filename } = e;
        return {
          id,
          name,
          price,
          url: filename,
        };
      });
      this.events = fetchedEvents;
    },
  },
});
