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
          <Button label="Select a file"
                  @click="openFileDialog()"/>
        </div>
        <div class="item-list thumbnail">
          <div v-for="(image, index) in value"
              :key="index"
              class="thumbnail-image-container">
            <img :src="image.src" />
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
//import * as PDFJS from 'pdfjs-dist';
//import pdfjsWorker from 'pdfjs-dist/build/pdf.worker';
//import { pdfjsWorker } from 'pdfjs-dist/webpack';
const PDFJS = require('pdfjs-dist/es5/build/pdf');
const pdfJsWorker = require("pdfjs-dist/es5/build/pdf.worker.entry");
//PDFJS.GlobalWorkerOptions.workerSrc = require("pdfjs-dist/build/pdf.worker.entry.js");
PDFJS.workerSrc = pdfJsWorker;
PDFJS.disableWorker = true;
PDFJS.disableStream = true;

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
  },
  data: () => {
    return {
      errorMessage: null,
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
      let images = null;

      switch (file.type) {
        case 'application/pdf':
          try {
            images = await this.processPDFFile(file);
          } catch(errorMessage) {
            this.errorMessage = errorMessage;
            return;
          }
          break;

        default:
          this.processImageFile(file)
      }
      this.$emit('input', images);
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
            for (let currentPage = 1; currentPage <= pdfDoc.numPages; currentPage++) {
              try {
                const imageData = await this.getPage(pdfDoc, currentPage);
                images.push(imageData);
              } catch {
                reject(`Error reading page ${currentPage} of the PDF.`);
                return;
              }
            }
            resolve(images);
          }, () => {
            reject('Error reading PDF.');
          });
        };
        reader.readAsArrayBuffer(file);
      })
      
    },

    getPage(pdfDoc, pageNumber) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      return new Promise((resolve, reject) => {
        pdfDoc.getPage(pageNumber).then((page) => {
          const viewport = page.getViewport(2.0);

          // Sometimes width and height can be NaN, so use viewBox instead.
          if (viewport.width && viewport.height) {
              canvas.height = viewport.height;
              canvas.width = viewport.width;
          } else {
              canvas.height = viewport.viewBox[3];
              canvas.width = viewport.viewBox[2];
          }

          const renderContext = {
            canvasContext: ctx,
            viewport: viewport
          };

          const renderTask = page.render(renderContext);
          renderTask.promise.then(() => {
            if (ctx) {
              // Image correction: flip image vertically.
              ctx.translate(0, canvas.height);
              ctx.scale(1, -1);
              ctx.drawImage(canvas, 0, 0);  
            }
            const dataURL = canvas.toDataURL();
            resolve(dataURL);
          },
          (error) => {
            reject(error);
          });
        });
      });
    },

    removeImage(index) {
      const images = [...this.value];
      images.splice(index, 1);
      this.$emit('input', images);
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
