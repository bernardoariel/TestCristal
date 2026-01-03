

async function setValueNativeAndTrigger(input: any, value: string) {
  await input.evaluate((el: HTMLInputElement, v: string) => {
    // setter nativo (evita que algunas máscaras ignoren .value directo)
    const proto = Object.getPrototypeOf(el);
    const desc = Object.getOwnPropertyDescriptor(proto, 'value');
    desc?.set?.call(el, v);

    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
    el.blur();
  }, value);
}