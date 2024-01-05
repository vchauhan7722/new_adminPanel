import imageCompression from 'browser-image-compression'

// export const ImageCompressor = async (image: any) => {
//   //const image = e.target.files[0]
//   return new Compressor(image, {
//     quality: 0.4, // 0.6 can also be used, but its not recommended to go below.
//     success: async (compressedResult) => {
//       // compressedResult has the compressed file.
//       // Use the compressed file to upload the images to your server.
//       //console.log('compressedResult', compressedResult)
//       //return compressedResult
//       //setCompressedFile(res)
//     },
//   })
// }

export async function ImageCompressor(file: any) {
  var imageFile = file
  // console.log('originalFile instanceof Blob', imageFile instanceof Blob) // true
  // console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`)

  var options = {
    maxSizeMB: 0.1,
    maxWidthOrHeight: 800,
    useWebWorker: true,
  }
  let response = await imageCompression(imageFile, options)
    .then(function (compressedFile) {
      // console.log('compressedFile instanceof Blob', compressedFile instanceof Blob) // true
      // console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`) // smaller than maxSizeMB
      // console.log('compressedFile', typeof compressedFile)
      return compressedFile // write your own logic
    })
    .catch(function (error) {
      return error.message
    })

  return response
}
