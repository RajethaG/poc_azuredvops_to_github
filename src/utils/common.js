/* eslint-disable prettier/prettier */
export default {
  // eslint-disable-next-line max-statements
  downloadFile(fileData, contentType, fileName, forceDownload) {
    const data = fileData.trim()
    const blob = new Blob([base64ToArrayBuffer(data)], {
      type: contentType
    })
    const url = window.URL.createObjectURL(blob)
    if (forceDownload) {
      // check for support for IE, which will not support blob save via links
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob, fileName)
      } else {
        const link = document.createElement('a')

        link.href = url
        link.target = '_blank'
        link.download = fileName
        link.click()
      }
      return
    }
    if (contentType !== 'application/pdf') {
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob, fileName)
      } else {
        const link = document.createElement('a')
        link.href = url
        link.click()
      }
    } else {
      // eslint-disable-next-line consistent-return
      return url
    }
  }
}
// eslint-disable-next-line func-style
function base64ToArrayBuffer(base64) {
  const binaryString = window.atob(base64)
  const binaryLen = binaryString.length
  const bytes = new Uint8Array(binaryLen)
  for (let i = 0; i < binaryLen; i++) {
    const ascii = binaryString.charCodeAt(i)
    bytes[i] = ascii
  }
  return bytes
}
