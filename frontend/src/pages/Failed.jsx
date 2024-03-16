import React from 'react'
import '../css/Success.css'

const Failed = () => {
  return (
    <div className='topdiv'>

    <div className="card1">
    <div style={{borderRadius:"200px", height:"200px", width:"200px", background: "#F8FAF5", margin:"0 auto"}}>
      <i className="checkmark">X</i>
    </div>
      <h1 className='heading1'>Failed</h1> 
      {/* <p className='para1'>We've received your purchase request..!<br/> We'll be in touch shortly!</p> */}
    </div>
  </div>  )
}

export default Failed