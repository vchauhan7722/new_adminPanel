export const fileToBase64 = (fileObject: any) => {
  return new Promise((resolve) => {
    var file = fileObject //new File([filename], filepath)
    var reader = new FileReader()
    // Read file content on file loaded event
    reader.onload = function (event: any) {
      resolve(event.target.result)
    }

    // Convert data to base64
    reader.readAsDataURL(file)
  })
}
