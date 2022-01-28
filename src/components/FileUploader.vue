<template>
  <div>
    <label v-if="label"
      :for="id">
      {{label}}
    </label>
    <div class="file-uploader-container"
      ref="fileUploaderContainer">
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
      <div>
        <div class="d-flex">
          <div class="cloud-upload-icon-container mr-3">
            <IconCloudUpload class="cloud-upload-icon"
              color="#494949" />
          </div>
          <div>
            <h3 class="mb-1">Select a file</h3>
            <p>Click add, or drag and drop a file into this box</p>
          </div>
        </div>
        <div class="item-list thumbnail">
          <div class="item-container text-right"
            v-for="(image, index) in value"
            :key="index">
            <div :class="`thumbnail-image-container ${isZoomPortalEnabled ? 'zoom-enabled' : ''}`"
              @click="openPreviewModal(index)">
              <img :src="image.source" />
            </div>
            <a href="javascript:void(0)"
              :title="`Remove image ${image.fileName}`"
              @click="removeImage(index)">Remove</a>
          </div>
          <div class="item-container text-right">
            <div class="add-tile-container">
              <a href="javascript:void(0)"
                :class="`add-icon-link ${(isProcessingFile || isAddDisabled) ? 'disabled' : ''}`"
                title="Add file"
                @click="openFileDialog()">
                <div class="add-icon-container d-flex align-items-center justify-content-center">
                  <IconPlus v-if="!isProcessingFile"
                    class="add-icon"
                    color="#494949" />
                  <Loader v-if="isProcessingFile"
                    size="32px"
                    color="#494949" />
                </div>
              </a>
            </div>
            <a href="javascript:void(0)"
              title="Add file"
              :class="`add-link ${(isProcessingFile || isAddDisabled) ? 'disabled' : ''}`"
              @click="openFileDialog()">Add</a>
          </div>
        </div>
      </div>
      <div v-if='errorMessage'
          class="error-message">{{errorMessage}}</div>
    </div>
    <MountingPortal v-if="isPreviewModalOpen"
      :mountTo="modalElementTarget"
      append>
      <ContentModal :title="value[previewModalImageIndex].fileName"
        size="lg"
        @close="closePreviewModal()">
        <div class="text-center">
          <img class="modal-image"
            :src="value[previewModalImageIndex].source"
            :alt="value[previewModalImageIndex].fileName" />
        </div>
      </ContentModal>
    </MountingPortal>
  </div>
</template>

<script>
import ContentModal from './ContentModal.vue';
import IconCloudUpload from './icons/IconCloudUpload.vue';
import IconPlus from './icons/IconPlus.vue';
import Loader from './Loader.vue';
import { MountingPortal } from 'portal-vue';
import * as PDFJS from 'pdfjs-dist/legacy/build/pdf';
import pdfJsWorker from 'pdfjs-dist/legacy/build/pdf.worker.entry';
import sha1 from 'sha1';
import { v4 as uuidv4 } from 'uuid';

// Polyfills.
import { ReadableStream } from 'web-streams-polyfill';
window.ReadableStream = window.ReadableStream || ReadableStream;
import 'mdn-polyfills/MouseEvent';
import 'mdn-polyfills/HTMLCanvasElement.prototype.toBlob';
import '../polyfills/DOMMatrix';

PDFJS.workerSrc = pdfJsWorker;
PDFJS.disableWorker = true;
PDFJS.disableStream = true;

const MAX_IMAGE_SIZE_BYTES = 1048576;
const MAX_IMAGE_COUNT = 20;
const IMAGE_REDUCTION_SCALE_FACTOR = 0.8;
const IMAGE_CONTENT_TYPE = 'image/jpeg';
const JPEG_COMPRESSION = 0.5;

export default {
  name: 'FileUploader',
  components: {
    ContentModal,
    IconCloudUpload,
    IconPlus,
    Loader,
    MountingPortal,
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
    label: {
      type: String,
    },
    browseButtonLabel: {
      type: String,
      default: 'Add a File'
    },
    allowMultipleFiles: {
      type: Boolean,
      default: true
    },
    documentType: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    isZoomPortalEnabled: {
      type: Boolean,
      default: false
    },
    modalElementTarget: {
      type: String,
      default: '#modal-target'
    }
  },
  data: () => {
    return {
      errorMessage: null,
      isProcessingFile: false,
      isPreviewModalOpen: false,
      previewModalImageIndex: null,
    }
  },
  mounted() {
    this.$refs.fileUploaderContainer.addEventListener('dragover', this.handleDragOver);
    this.$refs.fileUploaderContainer.addEventListener('drop', this.handleDrop);
  },
  beforeUnmount() {
    this.$refs.fileUploaderContainer.removeEventListener('dragover', this.handleDragOver);
    this.$refs.fileUploaderContainer.removeEventListener('drop', this.handleDrop);
  },
  methods: {
    handleDragOver(event) {
      event.preventDefault();
    },
    handleDrop(event) {
      event.preventDefault();

      const files = event.dataTransfer.files;

      // Don't proceed if no file(s) were selected.
      if (!files || files.length === 0) {
        return;
      }
      
      // Clear previous error message.
      this.errorMessage = null;

      // Process each file dropped.
      for (let i=0; i<files.length; i++) {
        this.processFile(files[i]);
      }
    },
    openFileDialog() {
      if (this.isProcessingFile || this.isAddDisabled) {
        return;
      }
      this.$refs.browseFile.dispatchEvent(new MouseEvent('click'));
    },
    handleChangeFile(event) {
      const files = event.target.files;

      // Don't proceed if no file(s) were selected.
      if (!files || files.length === 0) {
        return;
      }
      
      // Clear previous error message.
      this.errorMessage = null;

      // Process each file selected.
      for (let i=0; i<files.length; i++) {
        this.processFile(files[i]);
      }

      // Clear selected files.
      event.target.value = '';
    },
    async processFile(file) {
      this.isProcessingFile = true;

      switch (file.type) {
        case 'application/pdf':
          try {
            const images = await this.processPDFFile(file);
            await this.addFileImages(file.name, images);
          } catch(errorMessage) {
            this.errorMessage = errorMessage;
          }
          break;

        default:
          try {
            const image = await this.processImageFile(file);
            await this.addFileImages(file.name, [image]);
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
                const imageSource = await this.getPage(pdfDoc, pageNumber);
                let imageData = await this.getImageData(imageSource);
                if (imageData.size > MAX_IMAGE_SIZE_BYTES) {
                  imageData = await this.scaleImage(imageData);
                }
                images.push(imageData);
              } catch (error) {
                const message = `Error reading page ${pageNumber} of the PDF.`;
                console.log(message, error);
                reject(message);
                return;
              }
            }
            resolve(images);
          }, () => {
            reject('That PDF cannot be opened, please upload a different attachment.');
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

          page.render(renderContext).promise.then(() => {
            const dataURL = canvas.toDataURL(IMAGE_CONTENT_TYPE, JPEG_COMPRESSION);
            resolve(dataURL);
          },
          (error) => {
            console.log('PDFJS render error:', error);
            reject(error);
          });
        }).catch((error) => {
          console.log('PDFJS getPage() error:', error);
          reject(error);
        });
      });
    },

    getImageData(imageSource) {
      return new Promise((resolve, reject) => {
        // We create an image to receive the Data URI
        const img = document.createElement('img');

        // When the event "onload" is triggered we can resize the image.
        img.onload = async () => {
          // We create a canvas and get its context.
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          const width = Math.floor(img.width);
          const height = Math.floor(img.height);

          // We set the dimensions at the wanted size.
          canvas.width = width;
          canvas.height = height;

          // We resize the image with the canvas method drawImage();
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(async (blob) => {
            const reader = new FileReader();
            reader.onload = (event) => {
              resolve({
                source: event.target.result,
                size: blob.size,
                width,
                height,
              });
            };
            reader.onerror = () => {
              reject();
            }
            reader.readAsDataURL(blob);
          }, IMAGE_CONTENT_TYPE, JPEG_COMPRESSION);
        };

        img.onerror = () => {
          reject();
        }

        // We put the Data URI in the image's src attribute
        img.src = imageSource;
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
            const reader = new FileReader();
            reader.onload = async (event) => {
              const scaledImageData = {
                source: event.target.result,
                size: blob.size,
                width: targetWidth,
                height: targetHeight,
              };

              if (blob.size > MAX_IMAGE_SIZE_BYTES) {
                resolve(await this.scaleImage(scaledImageData))
              } else {
                resolve(scaledImageData);
              }
            };
            reader.readAsDataURL(blob);
          }, IMAGE_CONTENT_TYPE, JPEG_COMPRESSION);
        };

        img.onerror = () => {
          reject();
        };

        // We put the Data URI in the image's src attribute
        img.src = imageData.source;
      });
    },

    async processImageFile(file) {
      const reader = new FileReader();

      return new Promise((resolve, reject) => {
        reader.onload = async () => {
          try {
            let imageData = await this.getImageData(reader.result);
            if (imageData.size > MAX_IMAGE_SIZE_BYTES) {
              imageData = await this.scaleImage(imageData);
            }
            resolve(imageData);
          } catch(_) {
            reject('That attachment cannot be opened, please upload a different attachment.');
          }
        };
        reader.onerror = () => {
          reject('That attachment cannot be opened, please upload a different attachment.');
        }
        reader.readAsDataURL(file);
      });
    },

    async addFileImages(fileName, images) {
      const imagesWithMetaData = [];
      // Create image objects.
      for (let i=0; i<images.length; i++) {
        const imageData = images[i];
        const hash = sha1(imageData.source);
        const uuid = uuidv4();

        imagesWithMetaData.push({
          fileName: `${fileName}${images.length > 1 ? '.page-' + (i+1) : ''}`,
          contentType: 'IMAGE_JPEG',
          source: imageData.source,
          size: imageData.size,
          width: imageData.width,
          height: imageData.height,
          documentType: this.documentType,
          description: this.description,
          hash,
          uuid,
        });
      }

      return new Promise((resolve, reject) => {
        // Merge new images with existing images.
        if (this.allowMultipleFiles) {
          const imagesToAdd = [];
          imagesWithMetaData.forEach((image) => {
            const existingIndex = this.value.findIndex((existingImage) => existingImage.hash === image.hash);
            // If image doesn't already exist, 
            if (existingIndex === -1) {
              imagesToAdd.push(image);
            }
          });
          if (imagesToAdd.length === 0) {
            reject('That attachment has already been uploaded.');
            return;
          }
          this.$emit('input', [
            ...this.value,
            ...imagesToAdd,
          ]);
          resolve();
        }
        // Else, replace images in model.
        else {
          this.$emit('input', images);
          resolve();
        }
      });
    },
    removeImage(index) {
      this.errorMessage = null;
      const images = [...this.value];
      images.splice(index, 1);
      this.$emit('input', images);
    },
    openPreviewModal(imageIndex) {
      if (!this.isZoomPortalEnabled) {
        return;
      }
      this.previewModalImageIndex = imageIndex;
      this.isPreviewModalOpen = true;
    },
    closePreviewModal() {
      this.isPreviewModalOpen = false;
      this.previewModalImageIndex = null;
    }
  },
  computed: {
    isAddDisabled() {
      return !this.allowMultipleFiles && this.value && this.value.length > 0;
    },
  }
}
</script>

<style scoped>
.file-uploader-container {
  border: 2px dashed #d3d3d3;
  margin-bottom: 10px;
  border-radius: 8px;
  padding: 2em 4em 1em 4em;
}
.error-message {
  color: #D8292F;
  font-size: 13.33px;
}
.item-container {
  display: inline-block;
  margin: 0 20px 20px 0;
  vertical-align: top;
}
.thumbnail-image-container {
  width: 100px;
  height: 100px;
  border: solid thin #CCC;
  border-radius: 5px;
  position: relative;
  text-align: center !important;
}
.thumbnail-image-container.zoom-enabled {
  cursor: zoom-in;
}
.thumbnail-image-container img {
  max-width: 98px;
  max-height: 98px;
}
.add-tile-container {
  border-radius: 5px;
  background-color: #dee2e6;
}
.add-icon-link.disabled,
.add-link.disabled {
  cursor: not-allowed;
}
.add-icon-container {
  width: 100px;
  height: 100px;
}
.add-icon {
  width: 32px;
  height: 32px;
}
.cloud-upload-icon-container {
  width: 60px;
}
.cloud-upload-icon {
  width: 60px;
  height: 56px;
}
.modal-image {
  max-width: 100%;
}
</style>
