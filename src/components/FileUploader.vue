<template>
  <div>
    <input
        type="file"
        :id="id"
        ref="browseFile"
        accept="image/*,application/pdf"
        style="display:none;"
        tabindex="0"
        :name="id"
        autocomplete="off"
        @change='handleChangeFile($event)'/>
      <div class="d-flex">
        <div>
          <Button :label="browseButtonLabel"
                  @click="openFileDialog()"
                  :hasLoader='isProcessingFile'
                  :disabled="isBrowseButtonDisabled"/>
        </div>
        <div class="item-list thumbnail">
          <div v-for="(imageData, index) in value"
              :key="index"
              class="thumbnail-image-container">
            <img :src="imageData" />
            <a href="javascript:void(0)"
              class="remove"
              @click="removeImage(index)">
              X
            </a>
          </div>
        </div>
      </div>
      
      <div v-if='errorMessage'
          class="error-message mt-3">{{errorMessage}}</div>
  </div>
</template>

<script>
import Button from './Button.vue';
import * as PDFJS from 'pdfjs-dist/es5/build/pdf';
import pdfJsWorker from 'pdfjs-dist/es5/build/pdf.worker.entry';

PDFJS.workerSrc = pdfJsWorker;
PDFJS.disableWorker = true;
PDFJS.disableStream = true;

const MAX_IMAGE_SIZE_BYTES = 1048576;
const MAX_IMAGE_COUNT = 20;
const IMAGE_REDUCTION_SCALE_FACTOR = 0.8;
const JPEG_COMPRESSION = 0.5;

export default {
  name: 'FileUploader',
  components: {
    Button,
  },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    id: {
      type: String,
      default: ''
    },
    browseButtonLabel: {
      type: String,
      default: 'Add a File'
    },
    allowMultipleFiles: {
      type: Boolean,
      default: true
    }
  },
  data: () => {
    return {
      errorMessage: null,
      isProcessingFile: false,
    }
  },
  methods: {
    openFileDialog() {
      this.$refs.browseFile.dispatchEvent(new MouseEvent("click"));
    },
    handleChangeFile(event) {
      const files = event.target.files;

      if (!files || files.length === 0) {
        return;
      }
      
      // Clear previous error message.
      this.errorMessage = null;

      // Process each file selected.
      files.forEach((file) => {
        this.processFile(file);
      });

      // Clear selected files.
      event.target.value = '';
    },
    async processFile(file) {

      this.isProcessingFile = true;

      switch (file.type) {
        case 'application/pdf':
          try {
            const images = await this.processPDFFile(file);
            this.addFileImages(file.name, images);
          } catch(errorMessage) {
            this.errorMessage = errorMessage;
          }
          break;

        default:
          try {
            const image = await this.processImageFile(file);
            this.$emit('input', [image]);
          } catch(errorMessage) {
            this.errorMessage = errorMessage;
          }
          break;
          
      }
      this.isProcessingFile = false;
    },
    processPDFFile(file) {
      const reader = new FileReader();
      const images = [];

      return new Promise((resolve, reject) => {
        reader.onload = () => {
          const docInitParams = {
            data: reader.result
          };
          const loadingTask = PDFJS.getDocument(docInitParams);
          loadingTask.promise.then(async (pdfDoc) => {
            if (pdfDoc.numPages > MAX_IMAGE_COUNT) {
              reject('This PDF has too many pages to process.');
              return;
            }
            for (let pageNumber = 1; pageNumber <= pdfDoc.numPages; pageNumber++) {
              try {
                const imageData = await this.getPage(pdfDoc, pageNumber);
                const scaledImage = await this.scaleImage(imageData);
                images.push(scaledImage);
              } catch {
                reject(`Error reading page ${pageNumber} of the PDF.`);
                return;
              }
            }
            resolve(images);
          }, () => {
            reject('Error reading PDF.');
          });
        };
        reader.readAsArrayBuffer(file);
      });
    },

    getPage(pdfDoc, pageNumber) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      return new Promise((resolve, reject) => {
        pdfDoc.getPage(pageNumber).then((page) => {
          const viewport = page.getViewport({ scale: 2.0 });

          // Sometimes width and height can be NaN, so use viewBox instead.
          if (viewport.width && viewport.height) {
              canvas.width = viewport.width;
              canvas.height = viewport.height;
          } else {
              canvas.width = viewport.viewBox[2];
              canvas.height = viewport.viewBox[3];
          }

          const renderContext = {
            canvasContext: ctx,
            viewport: viewport
          };

          const renderTask = page.render(renderContext);
          renderTask.promise.then(() => {
            const dataURL = canvas.toDataURL('image/jpeg', JPEG_COMPRESSION);
            resolve(dataURL);
          },
          (error) => {
            reject(error);
          });
        }).catch((error) => {
          reject(error);
        });
      });
    },

    async scaleImage(imageData) {
      return new Promise((resolve, reject) => {
        // We create an image to receive the Data URI
        const img = document.createElement('img');

        // When the event "onload" is triggered we can resize the image.
        img.onload = async () => {
          // We create a canvas and get its context.
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          const targetWidth = Math.floor(img.width * IMAGE_REDUCTION_SCALE_FACTOR);
          const targetHeight = Math.floor(img.height * IMAGE_REDUCTION_SCALE_FACTOR);

          // We set the dimensions at the wanted size.
          canvas.width = targetWidth;
          canvas.height = targetHeight;

          // We resize the image with the canvas method drawImage();
          ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

          canvas.toBlob(async (blob) => {
            const scaledImageData = canvas.toDataURL('image/jpeg', JPEG_COMPRESSION);
            console.log('Image Size:', blob.size);

            if (blob.size > MAX_IMAGE_SIZE_BYTES) {
              console.log('Rescaled image');
              resolve(await this.scaleImage(scaledImageData))
            } else {
              resolve(scaledImageData);
            }
          });
        };

        img.onerror = () => {
          reject();
        }

        // We put the Data URI in the image's src attribute
        img.src = imageData;
      });
    },

    async processImageFile(file) {
      const reader = new FileReader();

      return new Promise((resolve, reject) => {
        reader.onload = async () => {
          try {
            const scaledImage = await this.scaleImage(reader.result);
            resolve(scaledImage);
          } catch(_) {
            reject('Could not read image file.');
          }
        };
        reader.onerror = () => {
          reject('Could not read image file.');
        }
        reader.readAsDataURL(file);
      });
    },

    addFileImages(fileName, imageDataURLs) {
      const images = [];
      // Create image objects.
      imageDataURLs.forEach((image) => {
        images.push({
          fileName,
          source: image,
        });
      });

      // Merge new images with existing images.
      if (this.allowMultipleFiles) {
        const imagesToAdd = [];
        images.forEach((image) => {
          const existingIndex = this.value.findIndex((existingImage) => existingImage.source === image.source);
          // If image doesn't already exist, 
          if (existingIndex === -1) {
            imagesToAdd.push(image);
          }
        });
      }
      // Else, replace images in model.
      else {
        this.$emit('input', images);
      }
    },

    removeImage(index) {
      const images = [...this.value];
      images.splice(index, 1);
      this.$emit('input', images);
    }
  },
  computed: {
    isBrowseButtonDisabled() {
      return !this.allowMultipleFiles && this.value && this.value.length > 0;
    }
  }
}
</script>

<style scoped>
.error-message {
  color: #D8292F;
}
.item-list.thumbnail {
  display: flex;
  flex-wrap: wrap;
  margin: -10px 0 0 10px;

}
.thumbnail-image-container {
  width: 100px;
  height: 100px;
  margin: 10px;
  border: solid thin #CCC;
  border-radius: 5px;
  position: relative;
  text-align: center;
}
.thumbnail-image-container img {
  max-width: 98px;
  max-height: 98px;
}
.thumbnail-image-container .remove {
  width: 20px;
  height: 20px;
  position: absolute;
  top: 0;
  right: 0;
  font-size: 20px;
  font-weight: bold;
  text-decoration: none;
}
</style>
