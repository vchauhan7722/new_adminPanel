import Compressor from 'compressorjs'

export const ImageCompressor = async (image: any) => {
  //const image = e.target.files[0]
  return new Compressor(image, {
    quality: 0.4, // 0.6 can also be used, but its not recommended to go below.
    success: async (compressedResult) => {
      // compressedResult has the compressed file.
      // Use the compressed file to upload the images to your server.
      //console.log('compressedResult', compressedResult)
      //return compressedResult
      //setCompressedFile(res)
    },
  })
}
