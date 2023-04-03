import { BreadFactory, BreadSize } from '../BreadFactory'
import { ButterBread } from '../products/ButterBread'
import { ChocolateBread } from '../products/ChocolateBread'
import { SardineBread } from '../products/SardineBread'

export class LagosBreadFactory extends BreadFactory {
  address = 'Lagos, Nigeria'
  availableBread = new Map([
    ['butter', ButterBread],
    ['chocolate', ChocolateBread],
    ['sardine', SardineBread]
  ])
}
