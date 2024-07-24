const nodemailer = require('nodemailer');

const sendEmail =async(req,res)=>{
    try {   
            // console.log(process.env.Email)
            // console.log(process.env.password)
            console.log(req.body)
            const {reservationData} = req.body
            const {email,name,phone,entryIn,entryOut,tables , members } = reservationData
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.Email,
                pass: process.env.password
            }
        });

        const info = await transporter.sendMail({
            from: process.env.Email,
            // to: email, 
            subject: "Table Reservation Confirmation ", 
            // text: `Hello ${name}  , Hope you are sound and prospering !! `,
            html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
              <h1 style="color: #333;">Hello ${name}  , Hope you are sound and prospering !! </h1>
              <p>Your reservation for <strong>${entryIn}</strong> at <strong>${new Date().toLocaleString()}</strong> is confirmed.</p>
              <p>Your outing time is <strong>${entryOut}</strong>.</p>
              <p>You booked <strong>${tables}</strong> table(s) for <strong>${members}</strong> member(s).</p>
              <p>Your Phone number: <strong>${phone}</strong></p>
              <p>If you have any queries, you can contact <strong>9762343458</strong>.</p>
            </div>
          `,
          });
        
          console.log("Message sent: %s", info.messageId);

          res.status(200).json({data:info});

        }
    catch (error) {
        console.log(error)
        res.status(404).json({ error: error})
    }
}

const sendEmailforToken =async(to,subject,text)=>{
    try {   
           
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.Email,
                pass: process.env.password
            }
        });

        const info = await transporter.sendMail({
            from: process.env.Email,
            to: to, 
            subject: subject, 
            text: text,
        //     html: `
        //     <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        //       <h1 style="color: #333;">Hello ${name}  , Hope you are sound and prospering !! </h1>
        //       <p>Your reservation for <strong>${entryIn}</strong> at <strong>${new Date().toLocaleString()}</strong> is confirmed.</p>
        //       <p>Your outing time is <strong>${entryOut}</strong>.</p>
        //       <p>You booked <strong>${tables}</strong> table(s) for <strong>${members}</strong> member(s).</p>
        //       <p>Your Phone number: <strong>${phone}</strong></p>
        //       <p>If you have any queries, you can contact <strong>9762343458</strong>.</p>
        //     </div>
        //   `,
          });
        
          console.log("Message sent: %s", info.messageId);

        //   res.status(200).json({data:info});

        }
    catch (error) {
        console.log(error)
        // res.status(404).json({ error: error})
    }
}




module.exports = {sendEmail,sendEmailforToken}