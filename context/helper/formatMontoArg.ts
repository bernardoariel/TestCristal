// context/helper/formatMontoArg.ts
export function formatMontoArg(n: number) {
  const fixed = n.toFixed(2);           // "72099999.28"
  const [intPart, decPart] = fixed.split('.');
  const withThousands = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${withThousands},${decPart}`; // "72.099.999,28"
}
