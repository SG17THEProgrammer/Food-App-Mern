import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import '../../css/Orders/Invoice.css'
import { saveAs } from 'file-saver';
import { useAuth } from '../../components/Auth';
// import logo from "../../../public/images/Logo1.png"

const Invoice = ({id}) => {
    // console.log(id)
    const [loading, setLoading] = useState(false);
    const [orderBill, setOrderBill] = useState();
    console.log(orderBill)
    // // console.log(orders[0]?.address?.line1)
    const formattedProducts = orderBill ?orderBill[0]?.items?.map(product => ({
        quantity: product.qty,
        description: product.name, // Map 'name' to 'description'
        price: product.price
    })):""
    console.log(formattedProducts)




    const fetchOrders = async () => {
        setLoading(true);
        try {

            const response = await fetch("http://localhost:8001/showOrder", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderId: id })
            })
            // console.log(response)
            if (response.ok) {
                const data = await response.json()
                // console.log(data)    
                setOrderBill(data.data)
            }
            else {
                console.log("Error: " + response)
            }
        } catch (error) {
            console.log("Error while getting orders" + error)

        }
        finally{
            setLoading(false)
        }

    }

    useEffect(() => {
        fetchOrders();
    }, [id])

    const generateInvoice = async () => {
        setLoading(true);
        const invoiceData = {
            "documentTitle": "RECEIPT",
            "currency": "INR",
            "taxNotation": "vat",
            "marginTop": 25,
            "marginRight": 25,
            "marginLeft": 25,
            "marginBottom": 25,
            // "logo":logo,
            "background": "https://public.easyinvoice.cloud/img/watermark-draft.jpg",
            "sender": {
                "company": "Swad E Hindustan",
                "address": "Mera address dummy waala ",
                "zip": "281006",
                "city": "Mathura",
                "state": "Uttar Pradesh",
                "country": "India"
            },
            "client": {
                "address":orders[0]?.address?.line1,
                "zip": orders[0]?.address?.postal_code,
                "city": orders[0]?.address?.city,
                "state": orders[0]?.address?.state,
                "country": orders[0]?.address?.country
            },
            "invoiceNumber": `2021.${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
            "invoiceDate": orders[0]?.date?.substring(0,11),
            "products": formattedProducts,
            "bottomNotice": "Happy Shopping"
        };

        try {
            const result = await easyinvoice.createInvoice(invoiceData);
            const pdfData = result.pdf;
            
            // Convert base64 to binary data
            const binaryData = atob(pdfData);
            const array = [];
            for (let i = 0; i < binaryData.length; i++) {
                array.push(binaryData.charCodeAt(i));
            }
            const byteArray = new Uint8Array(array);

            // Use FileSaver.js to save the PDF
            const blob = new Blob([byteArray], { type: 'application/pdf' });
            toast.success("Downloading bill...");
            setTimeout(() =>{
                saveAs(blob, 'invoice.pdf');
            },2000)
        } catch (error) {
            console.error('Error generating invoice:', error);
            toast.error('Failed to generate invoice');
        }
        finally {
            setLoading(false);
          }
    };

  
  return (
    <div>   
  {!loading?<button onClick={generateInvoice} className='butn download' >Generate Bill</button>:<button onClick={generateInvoice} className='butn download' >Generating Bill...</button>}    
  </div>
  
  )
}

export default Invoice