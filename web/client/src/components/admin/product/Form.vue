<template>
  <form
    class="form"
    @submit.prevent="submitForm"
  >
    <transition-group name="fade">
      <div
        class="form__input"
        key="name"
      >
        <label for="name">{{ $t('components.admin.form.productTitle') }}:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Pavadinimas"
          v-model="newProduct.name"
          @blur="$v.newProduct.name.$touch()"
        >
        <div
          v-if="$v.newProduct.name.$dirty && !$v.newProduct.name.required"
          class="error"
        >{{ $t('components.admin.form.required') }}</div>
      </div>
      <div
        class="form__input sale-item"
        key="sale"
      >
        <label for="sale">{{ $t('components.admin.form.productOnSale') }}?</label>
        <input
          type="checkbox"
          id="sale"
          name="sale"
          v-model="newProduct.onSale"
        ><span>{{ newProduct.onSale ? $t('components.admin.form.yes') : $t('components.admin.form.no') }}</span>
      </div>
      <div
        class="form__input"
        key="originalPrice"
        v-if="newProduct.onSale"
      >
        <label for="originalPrice">{{ $t('components.admin.form.originalPrice') }}:</label>
        <input
          type="text"
          id="originalPrice"
          name="originalPrice"
          v-model.trim="newProduct.originalPrice"
          placeholder="19.99"
          @blur="$v.newProduct.originalPrice.$touch()"
        >
        <div
          v-if="$v.newProduct.originalPrice.$dirty && !$v.newProduct.originalPrice.required"
          class="error"
        >{{ $t('components.admin.form.required') }}</div>
        <div
          v-if="$v.newProduct.originalPrice.$dirty && !$v.newProduct.originalPrice.decimal"
          class="error"
        >{{ $t('components.admin.form.numeric') }}</div>
      </div>
      <div
        class="form__input"
        key="price"
      >
        <label for="price">{{ newProduct.onSale ? 'Dabartine ' : ''}}{{ $t('components.admin.form.productPrice') }}:</label>
        <input
          type="text"
          id="price"
          name="price"
          v-model.trim="newProduct.price"
          placeholder="19.99"
          @blur="$v.newProduct.price.$touch()">
        <div
          v-if="$v.newProduct.price.$dirty && !$v.newProduct.price.required"
          class="error"
        >{{ $t('components.admin.form.required') }}</div>
        <div
          v-if="$v.newProduct.price.$dirty && !$v.newProduct.price.decimal"
          class="error"
        >{{ $t('components.admin.form.numeric') }}</div>
      </div>
      <div
        class="form__input"
        key="category"
      >
        <label for="category">{{ $t('components.admin.form.productCategory') }}:</label>
        <select
          id="category"
          name="category"
          v-model.trim="newProduct.category"
          @blur="$v.newProduct.category.$touch()"
        >
          <option value="">{{ $t('components.admin.form.chooseOne') }}...</option>
          <option
            v-for="category in categories"
            :key="category"
            :value="category"
          >{{ category }}</option>
        </select>
        <div
          v-if="$v.newProduct.category.$dirty && !$v.newProduct.category.required"
          class="error">{{ $t('components.admin.form.requiredToChoose') }}</div>
      </div>
      <div
        class="form__input"
        key="subCategory"
        v-if="newProduct.category !== ''"
      >
        <label for="subCategory">{{ $t('components.admin.form.subCategory') }}:</label>
        <select
          id="subCategory"
          name="subCategory"
          @blur="$v.newProduct.subCategory.$touch()"
          v-model.trim="newProduct.subCategory"
        >
          <option value="">{{ $t('components.admin.form.chooseOne') }}...</option>
          <option
            v-for="category in subCategories"
            :key="category"
            :value="category"
          >{{ category }}</option>
        </select>
        <div
          v-if="$v.newProduct.subCategory.$dirty && !$v.newProduct.subCategory.required"
          class="error"
        >{{ $t('components.admin.form.requiredToChoose') }}</div>
      </div>
      <div
        class="form__input"
        key="size"
        v-if="newProduct.subCategory"
      >
        <label for="size">{{ $t('components.admin.form.availableSizes') }}:</label>
        <div class="sizes">
          <div
            v-for="(sizes, i) in availableSizes"
            :key="i"
            class="size">
            <label for="small">{{ sizes.size }}</label>
            <input
              type="text"
              id="small"
              v-model="sizes.quantity"
              placeholder="0"
              @input="updateSizes"
            >
          </div>
        </div>
        <div v-if="sizeError" class="error">{{ $t('components.admin.form.requiredEnterAtLeastOne') }}</div>
      </div>
      <div
        class="form__input"
        key="description"
      >
        <label for="description">{{ $t('components.admin.form.productDescription') }}:</label>
        <textarea
          rows="8"
          type="text"
          id="description"
          name="description"
          v-model.trim="newProduct.description"
          placeholder="Produkto aprašymas"
          @blur="$v.newProduct.description.$touch()"></textarea>
        <div
          v-if="$v.newProduct.description.$dirty && !$v.newProduct.description.required"
          class="error">{{ $t('components.admin.form.required') }}</div>
      </div>
      <div
        class="form__input"
        key="additionalInfo"
      >
        <label for="additionalInfo">{{ $t('components.admin.form.productAdditionalInfo') }}:</label>
        <textarea
          rows="6"
          type="text"
          id="additionalInfo"
          name="additionalInfo"
          v-model.trim="newProduct.additionalInfo"
          placeholder="Vyriskas megztukas"
          @blur="$v.newProduct.additionalInfo.$touch()"></textarea>
        <div
          v-if="$v.newProduct.additionalInfo.$dirty && !$v.newProduct.additionalInfo.required"
          class="error">{{ $t('components.admin.form.required') }}</div>
      </div>
      <div class="form__input" key="imageUpload">
        <label>{{ $t('components.admin.form.pictures') }}:</label>
        <NewPictureUpload @fileChange="uploadFiles" />
      </div>
      <p key="warning" v-if="invalidForm" class="warning">{{ $t('components.admin.form.notFullyCompleted') }}.</p>
      <button class="form__submit" key="submit">{{ $t('components.admin.form.addNewProduct') }}</button>
    </transition-group>
  </form>
</template>

<script>
import { required, requiredIf, decimal } from 'vuelidate/lib/validators'
import subCategories from '@/utils/subCategories'
import availableSizes from '@/utils/availableSizes'

export default {
  components: {
    NewPictureUpload: () => import('../NewPicture/NewPictureUpload')
  },
  props: {
    product: Object
  },
  data () {
    return {
      categories: [ 'Moterims', 'Mergaitėms', 'Vyrams', 'Berniukams', 'Aksesuarai' ],
      categorySelection: false,
      subCategorySelection: false,
      imageGallery: null,
      invalidForm: false,
      sizeError: false,
      newProduct: this.product || {
        name: '',
        onSale: false,
        originalPrice: undefined,
        price: undefined,
        category: '',
        subCategory: '',
        sizes: undefined,
        description: '',
        additionalInfo: ''
      }
    }
  },
  methods: {
    updateSizes () {
      this.newProduct.sizes = this.availableSizes.filter(size => size.quantity > 0)
    },
    submitForm () {
      if (this.$v.$invalid || !this.newProduct.sizes || !this.newProduct.sizes.length) {
        return this.scrollUp()
      }
      this.$emit('onSubmitForm', this.newProduct)
    },
    uploadFiles (filesPath) {
      this.newProduct.gallery = filesPath
    },
    scrollUp () {
      let sPos = window.pageYOffset
      const scrollUp = setInterval(() => {
        if (sPos < 0) return clearInterval(scrollUp)
        window.scrollTo(0, sPos)
        sPos -= 1
      }, 1)
    }
  },
  computed: {
    subCategories () {
      return subCategories(this.newProduct.category)
    },
    availableSizes () {
      return availableSizes(this.newProduct.category, this.product)
    }
  },
  validations: {
    newProduct: {
      name: { required },
      originalPrice: {
        required: requiredIf(function () { return this.newProduct.onSale }),
        decimal
      },
      price: { required, decimal },
      category: { required },
      subCategory: { required },
      description: { required },
      additionalInfo: { required }
    }
  }
}
</script>

<style scoped lang="scss">
.warning {
  width: 100%;
  background-color: red;
  border-radius: 5px;
  text-align: center;
  padding: 10px;
  font-size: 1.2rem;
}
.form {
  color: #fff;
  display: flex;
  flex-flow: column;
  @media screen and (min-width: 768px) {
    width: 80%;
    margin: 0 auto;
  }
  @media screen and (min-width: 1025px) {
    width: 60%;
  }
  &__input {
    transition: all .3s linear;
    display: flex;
    flex-flow: column;
    margin: 10px 0;
    position: relative;
    label {
      padding: 5px 0;
      font-size: 1.2em;
    }
    textarea {
      padding: 5px;
      resize: none;
    }
    input,
    select {
      padding: 5px;
      height: 30px;
    }
  }
  &__submit {
    width: 100%;
    align-self: flex-end;
    padding: 10px;
    border: 2px solid #fff;
    background-color: transparent;
    color: #fff;
    transition: color, background-color .3s linear;
    margin-top: 20px;
    &:hover {
      background-color: #fff;
      color: #000;
    }
  }
}
.error {
  border: 1px solid #f00;
  color: #f00;
  font-size: 1.4em;
  border-top: none;
  padding: 5px;
  text-align: center;
}
.size-selection {
  background-color: #fff;
}
.sale-item {
  flex-flow: row;
  align-items: center;
  input {
    margin: 0 10px 0 15px;
  }
  span {
    font-weight: bold;
    font-size: 1.4em;
  }
}
.sizes {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-end;
  .size {
    width: 25%;
    padding: 5px;
    label {
      width: 100%;
    }
    input {
      width: 100%;
    }
  }
}
/*
  Animations
*/
.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity .5s;
}
.fade-leave-active {
  transition: opacity .5s;
  opacity: 0;
  position: absolute;
  top: 100%;
  width: 100%;
}
.fade-move {
  transition: transform .5s;
}
</style>
