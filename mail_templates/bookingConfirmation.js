exports.bookingConfirmation = (name, bookingId, date, time, noOfGuests) => {
    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Course Registration Confirmation</title>
        <style>
            body {
                background-color: #ffffff;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.4;
                color: #FFFFFF;
                margin: 0;
                padding: 0;
            }
    
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
            }

            .logo {
                max-width: 200px;
                margin-bottom: 20px;
            }
    
            .message {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 20px;
            }
    
            .body {
                font-size: 16px;
                margin-bottom: 20px;
            }

            .cta-text {
                margin-top: 20px;
            }
    
            .cta {
                display: inline-block;
                padding: 10px 20px;
                background-color: #FF7A00;
                color: #FFFFFF;
                text-decoration: none;
                border-radius: 5px;
                font-size: 16px;
                font-weight: bold;
                margin-top: 20px;
            }
    
            .support {
                font-size: 14px;
                color: #999999;
                text-align: center;
                margin-top: 60px;
            }
    
            .highlight {
                font-weight: bold;
            }
        </style>
    
    </head>
    
    <body>
        <div class="container">
            <center>
                <a href="http://localhost:3000"><img class="logo" src="https://res.cloudinary.com/dbr6ar9it/image/upload/v1695850542/FoodApp/lm7dsacgrfsxbztgs3ti.png"
                ></a>
            </center>
            
            <div class="body">
                <p>Dear <span class="highlight">${name}</span>,</p>
                <p>We hope this message finds you well. We are delighted to confirm your reservation at Flavor Crave for <span class="highlight">${date}</span>. Your booking ID is: <span class="highlight">${bookingId}</span>.</p>

                <p>Reservation Details:</p>
                <ul>
                    <li><span class="highlight">Name: </span> ${name}</li>
                    <li><span class="highlight">Booking Id: </span> ${bookingId}</li>
                    <li><span class="highlight">Date: </span> ${date}</li>
                    <li><span class="highlight">Time: </span> ${time}</li>
                    <li><span class="highlight">No. of Guests: </span> ${noOfGuests}</li>
                </ul>

                <p>Your table has been reserved in our beautiful restaurant, and our team is excited to host you for what promises to be a memorable dining experience. We have taken note of your special requests and preferences to ensure that your visit is tailored to your liking.</p>

                <p>Should you need to make any changes or if you have any additional requests or dietary considerations, please do not hesitate to contact us at <a
                href="mailto:info@flavorcrave.com">info@flavorcrave.com</a>. We are here to make your visit exceptional and will do our best to accommodate any further requests.</p>

                <p>We look forward to serving you and creating a wonderful dining experience for you at Flavor Crave. Thank you for choosing us for your special occasion.</p>

                <p class="cta-text">Click below to explore more. <br />
                   <a class="cta" href="http://localhost:3000">Learn more</a>
                </p>
                
            </div>
            <div class="support">If you have any questions or need assistance, please feel free to reach out to us at <a
                    href="mailto:info@flavorcrave.com">info@flavorcrave.com</a>. We are here to help!
            </div>
        </div>
    </body>
    
    </html>`;
};