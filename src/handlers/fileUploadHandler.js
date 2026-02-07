// File upload utility handler
export default function fileUploadHandler(files = [], uploadAction) {
  // Process files for upload
  files.forEach(file => {
    // Validate file properties before upload
    if (uploadAction) {
      uploadAction(file);
    }
  });
}
