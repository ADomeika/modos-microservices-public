import axios from 'axios'

export default {
  addNewProduct (product) {
    return axios.post('/api/products', product)
  },
  getProducts (category, subCategory, size, page, perpage) {
    switch (category) {
      case 'Women':
        category = 'Moterims'
        break
      case 'Men':
        category = 'Vyrams'
        break
      case 'Boys':
        category = 'Berniukams'
        break
      case 'Girls':
        category = 'Mergaitems'
        break
      case 'Accessories':
        category = 'Aksesuarai'
        break
      default:
        break
    }
    category += `&limit=${perpage}&skip=${page}`
    if (subCategory) {
      category += '&subkategorija=' + subCategory
      if (size) category += '&dydis=' + size
    }
    if (!subCategory && size) category += '&dydis=' + size
    return axios.get(`/api/products?kategorija=${category}`)
  },
  getProduct (id) {
    return axios.get(`/api/products/${id}`)
  },
  editProduct (id, product) {
    return axios.patch(`/api/products/${id}`, product)
  },
  getSaleItems () {
    return axios.get('/api/products/sale')
  },
  getAllProducts () {
    return axios.get('/api/products')
  }
}
