import { Tooltip } from 'bootstrap';

export const tooltip = {
  mounted(el: HTMLElement): void {
    ((): Tooltip => new Tooltip(el))();
  },
};
