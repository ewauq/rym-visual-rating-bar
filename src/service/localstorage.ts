export class Localstorage {
  localstorageClient: Storage

  constructor(localstorageClient: Storage) {
    this.localstorageClient = localstorageClient
  }

  getValue = (name: string): string | undefined => {
    const storedValue = this.localstorageClient.getItem(name)

    if (!storedValue) return
    return storedValue
  }

  setValue = (name: string, value: string | number | boolean): void => {
    this.localstorageClient.setItem(name, String(value))
  }
}
