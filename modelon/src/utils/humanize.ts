type HumanizeProps = {
  number: number,
  fn?: Function
};
function humanize({ number, fn } :HumanizeProps): string {
  // https://github.com/Kikobeats/human-number/blob/master/src/index.js
  const ALPHABET = 'KMBTPEZY'.split('');
  const THRESHOLD = 1e3;

  let n = Math.abs(number);
  let index = 0;
  while (n >= THRESHOLD && (index + 1) < ALPHABET.length) {
    n /= THRESHOLD;
    index += 1;
  }
  if (fn) n = fn(n);
  return (number < 0 ? '-' : '') + String(index === 0 ? n : n + ALPHABET[index - 1]);
}

export default humanize;
