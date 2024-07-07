import React from 'react'
import { RotatingTriangles } from 'react-loader-spinner'

const Loader = () => {
  return (
    <>
    <div className="container1">
    </div>
      <div className='loader1'>
        <RotatingTriangles
          visible={true}
          colors={["#EFBC9B", "#DEAC80","#AF8260"]}
          ariaLabel="rotating-triangles-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />                       </div>
    </>
  )
}

export default Loader