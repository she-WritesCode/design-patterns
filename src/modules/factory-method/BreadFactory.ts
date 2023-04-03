export interface Bread {
  name: string
  description: string
  size: BreadSize
  price: number
  slice: boolean
  boxed: boolean
  calculatePrice(): void
  box(): void
}

export enum BreadSize {
  SM = 'small',
  MD = 'medium',
  LG = 'large'
}

export abstract class BreadFactory {
  abstract address: string
  abstract availableBread: Map<string, any>
  public createBread(type: string, size: BreadSize, slice: boolean): Bread {
    const BreadType = this.availableBread.get(type)
    if (!BreadType) {
      throw new Error('Bread type not supported')
    }
    return new BreadType(size, slice)
  }
}
