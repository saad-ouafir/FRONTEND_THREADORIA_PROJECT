// import
export default function fileUploadHandler(files = [], uploadAction) {
  files.map(file => {
    console.log(file.name);
    console.log(file.size);
    console.log(file.type);
  });
}

// HTTP HEADER :
// axios.post(url, formData,
// {
//    headers:{
//      'Content-Type':'multipart/form-data'
//    }
// })
