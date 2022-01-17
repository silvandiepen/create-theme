export class Style {
  block = "";

  constructor(block: string) {
    this.block = block;
  }
  bem(element: string, modifier: string) {
    return `${this.block}${element ? `__${element}` : ``}${
      modifier ? `--${modifier}` : ``
    }`;
  }
}
