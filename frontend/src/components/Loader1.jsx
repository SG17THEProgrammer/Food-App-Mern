import React from 'react'
import { MagnifyingGlass } from 'react-loader-spinner'

const Loader1 = () => {
  return (
    <div className='loader2'>
        <MagnifyingGlass
  visible={true}
  height="100"
  width="80"
  ariaLabel="magnifying-glass-loading"
  wrapperStyle={{}}
  wrapperClass="magnifying-glass-wrapper"
  glassColor="#c0efff"
  color="#e15b64"
  />
    </div>
  )
}

export default Loader1