import sendgrid from '@sendgrid/mail'

sendgrid.setApiKey(process.env.SENDGRID_API_KEY)

async function sendEmail(req, res) {
  const { email, subject } = req.body
  let finalHtml = ''
  let sub = ''
  switch (subject) {
    case 'reset_password':
      finalHtml = resetPassword(req.body)
      sub = 'Reset Password'
      break
    case 'cancellation':
      finalHtml = cancellation(req.body)
      sub = 'Cancellation'
      break
    case 'confirmation':
      finalHtml = confirmation(req.body)
      sub = 'Confirmation'
      break
    case 'approved_cancel':
      finalHtml = declinedCancel(req.body)
      sub = 'Cancellation Request'
      break
    case 'approved_request':
      finalHtml = approvedRequest(req.body)
      sub = 'Approved Reservation Request'
      break
    case 'declined_request':
      finalHtml = declinedCancel(req.body)
      sub = 'Declined Reservation Request'
      break
    default:
      break
  }
  try {
    await sendgrid.send({
      to: email, // Your email where you'll receive emails
      from: 'yourcrowneplaza@gmail.com', // your website email address here
      subject: sub,
      html: finalHtml,
    })
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json({ success: false, error: error.message })
  }

  return res.status(200).json({ success: true })
}

const resetPassword = ({ fullname, link }) => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Crowne Plaza</title>
    <meta name="description" content="Crowne Plaza">
    <meta name="author" content="SitePoint">
    <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
    <link rel="stylesheet" href="css/styles.css?v=1.0">
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        *{
          font-family: 'Poppins', sans-serif;
        }
        #card-bottom{
          padding:20px;
          text-align:center;
        }
        #card-top{
          display:flex;
          background:#0F172A;
          padding:1rem;
          align-items:center;
        }
        #card-top> div {
          margin:0 auto;
        }
        #card-top p {
          font-size:28pt;
          color:#fff;
          border-bottom:5px solid #2AB981;
          font-weight:bolder;
        }
    </style>
  </head>
  <body>
    <div>
      <div id="card-top">
        <div class="">
          <p>Crowne Plaza</p>
        </div>
      </div>
      <div id="card-bottom">
        <p style="font-weight:bold;font-size:14pt;">Hello ${fullname}</p>
        <p style="font-weight:bold;font-size:14pt;">You requested to reset your password</p>
        <a href="${link}">
         ${link}
        </a>
        <p>Click this link if you want to proceed<br/>or <br/>
        Ignore this message if you did not requested it.</p>
      </div>
    </div>
  </body>
  </html>`
}

const cancellation = ({ status, channel, reference, name, total }) => {
  return `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Crowne Plaza</title>
    <meta name="description" content="Crowne Plaza">
    <meta name="author" content="SitePoint">
    <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
    <link rel="stylesheet" href="css/styles.css?v=1.0">
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        *{
          font-family: 'Poppins', sans-serif;
      box-sizing:border-box;
        }
        #card-bottom{
          padding:20px;
          text-align:center;
        }
        #card-top{
          display:flex;
          background:#0F172A;
          padding:1rem;
          align-items:center;
        }
        #card-top> div {
          margin:0 auto;
        }
        #card-top p {
          font-size:28pt;
          color:#fff;
          border-bottom:5px solid #2AB981;
          font-weight:bolder;
        }
      .my-2{
      	margin: 8px 0px;
     
      }
      .my-4{
      	margin-top:16px;
      	margin-bottom:16px;
      }
      .text-center{
      text-align:center;
      }
      .capitalize{
      	text-transform:capitalize;
      }
      .text-xl{
        font-weight:600;
      font-size:13pt;
      color:"black";
      }
      .bg-slate-900{
        background:#0f172a;
      }
      .px-4{
        padding-left: 16px;
        padding-right: 16px;
      }
      .py-3{
        padding-top: 12px;
        padding-bottom: 12px;
      }
      .rounded-md{
        border-radius:8px;
      }
      .text-white{
        color:white;
      }
      .leading-8{
        line-height:2rem;
      }
      .flex{
      display:flex;
      }
      .items-center{
        align-items:center;
      }
      p{
      
      margin:0px;
      }
      .p-4{
        padding:16px;
      }
      .justify-center{
      	justify-content:center;
      }
      
    </style>
  </head>
  <body>
    <div>
      <div id="card-top">
        <div class="">
          <p>Crowne Plaza</p>
        </div>
      </div>
      <div>
        <div>
          <p class="my-2 text-center text-xl">Cancellation Receipt</p>
          <div class="my-4 flex items-center justify-center text-white">
            <div class="bg-slate-900 p-4 ">
              <p class="">Total Due</p>
              <p>Php ${total}</p>
              <p class="capitalize">Status: ${status}</p>
            </div>
          </div>
        </div>
        <div>
          <p>Channel: ${channel}</p>
          <p>Reference No: ${reference}</p>
        </div>
        <div class="my-4">
          <p>Hello ${name},</p>
          <p class="leading-8">
            We have already received your request for cancellation for your
            reservation on our hotel. Please do note that we will deduct 5% of
            your total payment for convenience and transaction fee.
            <br />
            For now, please wait for a time to process your refund. You will be
            notified once it is done.
            <br />
            Thank you, Hope we will see you again! We are always pleased to
            welcome you.
          </p>
        </div>
      </div>
    </div>
  </body>
  </html>`
}

const confirmation = ({ status, channel, reference, name, total }) => {
  return `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Crowne Plaza</title>
    <meta name="description" content="Crowne Plaza">
    <meta name="author" content="SitePoint">
    <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
    <link rel="stylesheet" href="css/styles.css?v=1.0">
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        *{
          font-family: 'Poppins', sans-serif;
      box-sizing:border-box;
        }
        #card-bottom{
          padding:20px;
          text-align:center;
        }
        #card-top{
          display:flex;
          background:#0F172A;
          padding:1rem;
          align-items:center;
        }
        #card-top> div {
          margin:0 auto;
        }
        #card-top p {
          font-size:28pt;
          color:#fff;
          border-bottom:5px solid #2AB981;
          font-weight:bolder;
        }
      .my-2{
      	margin: 8px 0px;
     
      }
      .my-4{
      	margin-top:16px;
      	margin-bottom:16px;
      }
      .text-center{
      text-align:center;
      }
      .capitalize{
      	text-transform:capitalize;
      }
      .text-xl{
        font-weight:600;
      font-size:13pt;
      color:"black";
      }
      .bg-slate-900{
        background:#0f172a;
      }
      .px-4{
        padding-left: 16px;
        padding-right: 16px;
      }
      .py-3{
        padding-top: 12px;
        padding-bottom: 12px;
      }
      .rounded-md{
        border-radius:8px;
      }
      .text-white{
        color:white;
      }
      .leading-8{
        line-height:2rem;
      }
      .flex{
      display:flex;
      }
      .items-center{
        align-items:center;
      }
      p{
      
      margin:0px;
      }
      .p-4{
        padding:16px;
      }
      .justify-center{
      	justify-content:center;
      }
      
    </style>
  </head>
  <body>
  <div>
  <div id="card-top">
    <div class="">
      <p>Crowne Plaza</p>
    </div>
  </div>
  <div>
     <div>
      <p class="my-2 text-center text-xl">Confirmation Receipt</p>
      <div class="my-4 flex items-center justify-center text-white">
        <div class="bg-slate-900 p-4 ">
          <p>Total Due</p>
          <p>Php ${total}</p>
          <p class="capitalize">Status: ${status}</p>
        </div>
      </div>
    </div>
    <div>
      <p>Channel: ${channel}</p>
      <p>Reference No: ${reference}</p>
    </div>
    <div class="my-4">
      <p>Hello ${name},</p>
      <p class="leading-8">
        We have already received your payment in our channel and your room
        is already reserved. Please be mindful with our health protocols.
        Please do not forget to bring your vaccination cards as we will
        check it again once you are already in our hotel
        <br />
        Your 50% balance should be paid upon checking-in in our hotel.
        Please coordinate with our Hotel Receptionist to confirm ypur
        identity and reservation.
        <br />
        Thank you and enjoy your stay!
      </p>
    </div>
    
  </div>
</div>
</body>
</html>`
}

const declinedCancel = ({ name, message }) => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Crowne Plaza</title>
    <meta name="description" content="Crowne Plaza">
    <meta name="author" content="SitePoint">
    <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
    <link rel="stylesheet" href="css/styles.css?v=1.0">
    </head>
  <body>
    <span>Dear Ms./Mr. ${name},</span><br>
    <p style="text-indent: 50px;">${message}
        <br/>
        <br/>Crowne Plaza
        <br/>084215466
        <br/>Tagaytay
    </p>
  </body>
  </html>
  `
}

const approvedRequest = ({ name }) => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Crowne Plaza</title>
    <meta name="description" content="Crowne Plaza">
    <meta name="author" content="SitePoint">
    <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
    <link rel="stylesheet" href="css/styles.css?v=1.0">
    </head>
  <body>
    <span>Hello, ${name}
    <br/>We have already approved your request for your reservation. Please be mindful with our health protocols. Please do not forget to bring your vaccination cards as we will check it again once you are already in our hotel. Your 50% balance should be paid upon checking-in in our hotel. Please coordinate with our Hotel Receptionist to confirm your identity and reservation.
    <br/>Thank you and enjoy your stay! 
    <br/>NOTE: Pay your 50% downpayment through our online payment medium within 15 minutes. If you fail to pay within the time limit given, your reservation will be cancelled. Go directly to your Dashboard - Order History and find your order then click the "Make a Payment" button.    
    <p>
        <br/>
        <br/>Crowne Plaza
        <br/>084215466
        <br/>Tagaytay
    </p>
  </body>
  </html>`
}

export default sendEmail
