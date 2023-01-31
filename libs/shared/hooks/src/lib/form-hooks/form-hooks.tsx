
export interface FormDataChangedHook {
  [k: string]: string | number | boolean;
}

export function useChange(fn: Function) {
  return (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    return fn({ [name]: value } as FormDataChangedHook)
  }
}