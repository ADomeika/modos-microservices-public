<template>
  <div>
    <vue-dropzone
      ref="myVueDropzone"
      id="dropzone"
      :options="dropzoneOptions"
      :destroyDropzone="false"
      @vdropzone-complete-multiple="uploadedSuccess"
      @vdropzone-removed-file="fileRemoved"
    ></vue-dropzone>
  </div>
</template>

<script>
import VueDropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import PictureService from '@/services/PictureService'

export default {
  components: {
    VueDropzone
  },
  data () {
    return {
      wasUploaded: false,
      dropzoneOptions: {
        url: '/api/pictures/fileupload',
        timeout: 300000,
        thumbnailWidth: 200,
        addRemoveLinks: true,
        uploadMultiple: true,
        parallelUploads: 20,
        maxFiles: 20,
        acceptedFiles: 'image/jpeg,image/png,image/gif',
        dictDefaultMessage: this.$t('components.admin.newPicture.dictDefaultMessage'),
        dictCancelUpload: this.$t('components.admin.newPicture.dictCancelUpload') + '!',
        dictRemoveFile: this.$t('components.admin.newPicture.dictRemoveFile'),
        headers: {
          'x-auth-token': localStorage.getItem('token')
        }
      }
    }
  },
  methods: {
    uploadedSuccess (files) {
      this.$emit('fileChange', files[0].xhr.response)
    },
    async fileRemoved (file) {
      try {
        await PictureService.removeImage({ filePath: file.xhr.response + '/' + file.name })
        if (this.$refs.myVueDropzone) {
          if (!this.$refs.myVueDropzone.dropzone.files.length) {
            this.$emit('fileChange', null)
          }
        }
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
