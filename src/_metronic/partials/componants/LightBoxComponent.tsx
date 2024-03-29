import React from 'react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

const LightBoxComponent = (props: any) => {
  const {openLightBox, setOpenLightBox, lightBoxArray, imageIndex} = props

  return (
    <Lightbox
      index={imageIndex}
      open={openLightBox}
      close={() => setOpenLightBox(false)}
      slides={lightBoxArray}
    />
  )
}

export default LightBoxComponent
