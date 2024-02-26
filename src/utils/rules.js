export function requiredRule (value, { message = 'این فیلد اجباری است' }) {
  if (Array.isArray(value)) return !!value.length || message
  else return !!value || message
}

export function phoneNumberRule (value) {
  return value ? (value.startsWith('09') && value.length === 11) || 'شماره موبایل وارد شده نادرست است.' : true
}

export function numericRule (value) {
  return value ? Number(value) || 'فقط اعداد مجاز هستند' : true
}
export function nationalCodeRule (value) {
  function isNationalCode(){
      let result = true;
      if (!/^\d{10}$/.test(value))
        result = false;
      if (result) {
        let check = +value[9];
        let sum = Array(9).fill().map((_, i) => +value[i] * (10 - i)).reduce((x, y) => x + y) % 11;
        result = (sum < 2 && check == sum) || (sum >= 2 && check + sum == 11);
      }
      return result;
    }
    return value ? isNationalCode() || 'کد ملی وارد شده صحیح نیست' : true
}

export function lengthRule (value, { message = 'مقدار وارد شده اشتباه است', max }) {
  return value ? (value.length === max) || message : true
}

