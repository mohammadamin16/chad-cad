// "09912147018" -> "+989912147018"
export function getCleanPhone(phone: string) {
  if (phone.startsWith("09")) {
    return "+98" + phone.slice(1);
  }
  return phone;
}
