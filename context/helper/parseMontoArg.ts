export function parseMontoArg(valor: string): number {
  if (!valor) return 0;

  return Number(
    valor
      .replace(/\./g, '')   // quita separador de miles
      .replace(',', '.')    // convierte decimal a punto
      .replace(/[^\d.-]/g, '') // por si viene con $
  );
}
