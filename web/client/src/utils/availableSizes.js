const getQuantity = (product, size) => {
  if (product) {
    const productFound = product.sizes.find(sizeq => sizeq.size === size)
    if (productFound) {
      return productFound.quantity
    }
  }
  return undefined
}

export default (category, product) => {
  switch (category) {
    case 'Moterims':
    case 'Vyrams':
      return [
        { size: 'XS', quantity: getQuantity(product, 'XS') },
        { size: 'S', quantity: getQuantity(product, 'S') },
        { size: 'M', quantity: getQuantity(product, 'M') },
        { size: 'L', quantity: getQuantity(product, 'L') },
        { size: 'XL', quantity: getQuantity(product, 'XL') },
        { size: 'XXL', quantity: getQuantity(product, 'XXL') }
      ]
    case 'Mergaitėms':
    case 'Berniukams':
      return [
        { size: '86', quantity: getQuantity(product, '86') },
        { size: '86-92', quantity: getQuantity(product, '86-92') },
        { size: '92', quantity: getQuantity(product, '92') },
        { size: '98', quantity: getQuantity(product, '98') },
        { size: '98-104', quantity: getQuantity(product, '98-104') },
        { size: '104', quantity: getQuantity(product, '104') },
        { size: '110', quantity: getQuantity(product, '110') },
        { size: '110-116', quantity: getQuantity(product, '110-116') },
        { size: '116', quantity: getQuantity(product, '116') },
        { size: '122', quantity: getQuantity(product, '122') },
        { size: '122-128', quantity: getQuantity(product, '122-128') },
        { size: '128', quantity: getQuantity(product, '128') },
        { size: '134', quantity: getQuantity(product, '134') },
        { size: '134-140', quantity: getQuantity(product, '134-140') },
        { size: '140', quantity: getQuantity(product, '140') }
      ]
    default:
      return [ { size: 'Vienas Dydis', quantity: getQuantity(product, 'Vienas Dydis') } ]
  }
}
