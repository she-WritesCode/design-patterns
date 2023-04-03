import { type Bread, BreadSize } from '../BreadFactory'

export class SardineBread implements Bread {
  name = 'Sardine Bread'
  description = ''
  size: BreadSize
  slice: boolean
  boxed: boolean = false
  price: number = 0

  constructor(size: BreadSize, slice: boolean) {
    this.size = size
    this.slice = slice
    this.calculatePrice()
  }

  calculatePrice() {
    switch (this.size) {
      case BreadSize.SM:
        this.price = 20
        break
      case BreadSize.MD:
        this.price = 30
        break
      case BreadSize.LG:
        this.price = 40
        break
      default:
        this.price = 0
        break
    }
  }

  box(): void {
    console.log('Boxing Butter Bread')
    this.boxed = true
  }
}
