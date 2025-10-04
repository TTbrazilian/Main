export function calcShipping(subtotal, cep) {
  if (Number(subtotal) >= 200) return 0;
  return 19.9;
}

export function calcDiscount(subtotal, coupon) {
  const code = (coupon || '').trim().toUpperCase();
  if (!code) return 0;
  if (code === 'NEXUS10') return Math.round((subtotal * 0.10) * 100) / 100;
  if (code === 'FRETEGRATIS') return 0; 
  return 0;
}

export function finalizeTotals(subtotal, shipping, discount) {
  const t = Math.max(0, (Number(subtotal) + Number(shipping) - Number(discount)));
  return Math.round(t * 100) / 100;
}
