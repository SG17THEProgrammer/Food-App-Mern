import React from 'react'

const Footer = () => {
  return (
    <>
<div  style={{ marginTop:"200px"}}>
  <footer style={{backgroundColor: "#eee6d3"  }} className='footer' >
    <div className="p-4"> 
      <div className="row">
        <div className="col-lg-6 col-md-12 mb-4">
          <h5 className="mb-3 text-dark">footer content</h5>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste atque ea quis
            molestias. Fugiat pariatur maxime quis culpa corporis vitae repudiandae aliquam
            voluptatem veniam, est atque cumque eum delectus sint!
          </p>
        </div>
        <div className="col-lg-3 col-md-6 mb-4">
          <h5 className="mb-3 text-dark">links</h5>
          <ul className="list-unstyled mb-0">
            <li className="mb-1">
              <a href="#!" style={{color: "#4f4f4f"}}>FAQ</a>
            </li>
            <li className="mb-1">
              <a href="#!" style={{color: "#4f4f4f"}}>classNamees</a>
            </li>
            <li className="mb-1">
              <a href="#!" style={{color: "#4f4f4f"}}>Pricing</a>
            </li>
            <li>
              <a href="#!" style={{color: "#4f4f4f"}}>Safety</a>
            </li>
          </ul>
        </div>
        <div className="col-lg-3 col-md-6 mb-4">
          <h5 className="mb-1 text-dark">Opening hours</h5>
          <table className="table" style={{borderColor:" #666"}}>
            <tbody>
              <tr>
                <td>Mon - Fri:</td>
                <td>8am - 9pm</td>
              </tr>
              <tr>
                <td>Sat - Sun:</td>
                <td>8am - 1am</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div className="text-center" style={{backgroundColor: "rgba(0, 0, 0, 0.2)" , padding:"5px"}}>
      © 2024 Copyright:
      <a className="text-dark">Food Ordering App </a>
      <p>Made With 💞 by Shray</p>
    </div>
    {/* <!-- Copyright --> */}
  </footer>
  
</div>
{/* <!-- End of . --> */}
    </>
  )
}

export default Footer