export let ToastValue;

export function showToast(message) {
  console.log('showToast', message);
  ToastValue = message;
}
