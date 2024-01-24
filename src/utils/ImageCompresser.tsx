import imageCompression from 'browser-image-compression'
import Resizer from 'react-image-file-resizer'

// export const old1ImageCompressor = async (image: any) => {
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

const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      800,
      800,
      'webp',
      50,
      0,
      (uri) => {
        // console.log('uri', uri)
        resolve(uri) //setImg(uri)
      },
      'file',
      200,
      200
    )
  })

export async function ImageCompressor(file: any, userId: any) {
  let image: any = await resizeFile(file)

  return image
}

export async function OldImageCompressor(file: any) {
  // console.log('originalFile instanceof Blob', imageFile instanceof Blob) // true
  // console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`)
  var imageFile = file
  var options = {
    maxSizeMB: 0.1,
    maxWidthOrHeight: 800,
    useWebWorker: true,
    //fileType: 'image/webp',
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
