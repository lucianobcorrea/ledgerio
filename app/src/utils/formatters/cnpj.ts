export function formatCnpj(cnpj: string) {
  let replacedCnpj = cnpj.replace(/\D/g, "");

  if (replacedCnpj.length > 14) {
    replacedCnpj = cnpj.substring(0, 14);
  }

  return replacedCnpj.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
    "$1.$2.$3/$4-$5",
  );
}
