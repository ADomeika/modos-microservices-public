import { women, men, boys, girls, accessories } from '@/collections/subCategories'

export default (category) => {
  switch (category) {
    case 'Moterims':
    case 'Women':
      return women
    case 'Vyrams':
    case 'Men':
      return men
    case 'Berniukams':
    case 'Boys':
      return boys
    case 'Mergaitėms':
    case 'Girls':
      return girls
    case 'Aksesuarai':
    case 'Accessories':
      return accessories
    default:
      return []
  }
}
