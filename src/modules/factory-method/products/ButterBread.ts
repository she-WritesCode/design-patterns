import { type Bread, BreadSize } from '../BreadFactory'

export class ButterBread implements Bread {
  name = 'Butter Bread'
  description = ''
  size: BreadSize
  slice: boolean
  boxed: boolean = false
  price: number = 0

  constructor(size: BreadSize, slice: boolean) {
    this.size = size
    this.slice = slice
  }

  calculatePrice() {
    switch (this.size) {
      case BreadSize.SM:
        this.price = 5
        break
      case BreadSize.MD:
        this.price = 10
        break
      case BreadSize.LG:
        this.price = 15
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
