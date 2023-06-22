export class UnexpectedError extends Error {
  constructor() {
    super('something wrong happened. Try again soon');
    this.name = 'UnexpectedError';
  }
}
