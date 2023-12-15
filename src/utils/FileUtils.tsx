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

// function sendFile() {
//   var file = document.getElementById('filename').files[0]

//   var reader = new FileReader()

//   //var rawData = new ArrayBuffer()

//   reader.onload = function (e) {
//     var rawData = e.target.result
//     var byteArray = new Uint8Array(rawData)
//     var fileByteArray = []

//     webSocket.send(byteArray.buffer)
//   }

//   reader.readAsArrayBuffer(file)
// }
