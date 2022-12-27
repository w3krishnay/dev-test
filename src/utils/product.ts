export const getPrice = (
  price: string | number | undefined,
  currency: string
) =>
  Intl.NumberFormat(undefined, {
    currency,
    minimumFractionDigits: 2,
    style: 'currency',
  }).format(parseFloat(price ? `${price}` : '0'));

  export function random(type:string,count:number = 5) {
    var text = "";
    var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var num = "0987612345";
    var possible = type === "text"?str:num;

    for (var i = 0; i < count; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }