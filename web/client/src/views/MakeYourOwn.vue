<template>
  <div>
    <h1>Pasidaryk Pats</h1>
    <div>
      <div class="clothes-gallery">
        <div
          class="image"
          v-for="(item, i) in gallery"
          :key="i"
          @click="selectItem(i)">
          <v-lazy-image
            src=""
            alt="Nuotrauka"
            use-picture>
            <source :srcset="'https://aputplqnen.cloudimg.io/crop/150x150/x/' + item">
          </v-lazy-image>
        </div>
      </div>
      <div
        class="presentation wrapper"
        v-if="itemSelected">
          <img
            :src="'https://aputplqnen.cloudimg.io/height/400/x/' + selectedItem"
            alt="Nuotrauka"
            class="garment" />
          <img
            v-if="paintingSelected"
            :src="'https://aputplqnen.cloudimg.io/width/150/x/' + selectedPainting"
            alt="Nuotrauka"
            class="painting" />
      </div>
      <div class="picture-gallery">
        <div class="image" v-for="(item, i) in paintingGallery" :key="i">
          <img
            :src="'https://aputplqnen.cloudimg.io/crop/150x150/x/' + item"
            alt="Nuotrauka"
            @click="selectPainting(i)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    selectItem (index) {
      this.itemSelected = true
      this.paintingSelected = false
      this.selectedPainting = null
      this.selectedItem = this.gallery[index]
    },
    selectPainting (index) {
      this.paintingSelected = true
      this.selectedPainting = this.paintingGallery[index]
    }
  },
  data () {
    return {
      itemSelected: false,
      selectedItem: null,
      paintingSelected: false,
      selectedPainting: null,
      gallery: [
        'https://d3ecedzw1mv51p.cloudfront.net/2017/10/Gents-Black-Mac-leather-jacket-back-image.jpg',
        'https://d1x7zurbps6occ.cloudfront.net/product/xlarge/602783-168857.jpg',
        'https://d3ecedzw1mv51p.cloudfront.net/2017/10/Gents-Black-Mac-leather-jacket-back-image.jpg',
        'https://d1x7zurbps6occ.cloudfront.net/product/xlarge/602783-168857.jpg',
        'https://d3ecedzw1mv51p.cloudfront.net/2017/10/Gents-Black-Mac-leather-jacket-back-image.jpg',
        'https://d1x7zurbps6occ.cloudfront.net/product/xlarge/602783-168857.jpg',
        'https://d3ecedzw1mv51p.cloudfront.net/2017/10/Gents-Black-Mac-leather-jacket-back-image.jpg',
        'https://d1x7zurbps6occ.cloudfront.net/product/xlarge/602783-168857.jpg',
        'https://d3ecedzw1mv51p.cloudfront.net/2017/10/Gents-Black-Mac-leather-jacket-back-image.jpg',
        'https://d1x7zurbps6occ.cloudfront.net/product/xlarge/602783-168857.jpg'
      ],
      paintingGallery: [
        'https://media.istockphoto.com/photos/hands-forming-a-heart-shape-with-sunset-silhouette-picture-id636379014?k=6&m=636379014&s=612x612&w=0&h=tnYrf_O_nvT15N4mmjorIRvZ7lK4w1q1c7RSfrVmqKA=',
        'https://www.denverpost.com/wp-content/uploads/2018/01/day_in_pictures_010818_001.jpg?w=620',
        'https://dreamypixel.com/wp-content/uploads/2017/08/Zelenci-springs.jpg'
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  color: #fff;
}
h1 {
  margin: 30px;
  text-align: center;
}
.presentation {
  position: relative;
  img.garment {
    display: block;
    margin: 20px auto;
    height: 400px;
  }
  img.painting {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
}
.clothes-gallery,
.picture-gallery {
  overflow-x: auto;
  display: flex;
  margin-bottom: 20px;
  @media screen and (min-width: 768px) {
    width: 80%;
    margin: 0 auto 20px;;
  }
  .image {
    min-width: 150px;
    width: 150px;
    margin: 10px;
  }
}
/deep/ .v-lazy-image-loaded {
  display: block;
  width: 100%;
}
</style>
