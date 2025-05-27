
const emailTemplate =(url)=>{
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        
        <title>Email Confirmation</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f6f6f6;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                padding-bottom: 20px;
            }
            .header img {
                width: 100px;
            }
            .content {
                text-align: center;
                line-height: 1.6;
                color: #333333;
            }
            .content h1 {
                font-size: 24px;
                margin-bottom: 10px;
            }
            .content p {
                margin-bottom: 20px;
            }
            a{
                color:white; 
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                font-size: 16px;
                color:white;
                background-color: #1E90FF;
                text-decoration: none;
                border-radius: 5px;
            }
            .footer {
                text-align: center;
                font-size: 12px;
                color: #aaaaaa;
                margin-top: 20px;
            }
            .footer p {
                margin: 0;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>AlloBus</h1>
            </div>
            <div class="content">
                <h1>Confirm Your Email Address</h1>
                <p>Thank you for signing up! Please confirm your email address by clicking the button below.</p>
                <a href="${url}" class="button">Confirm Email</a>
                <p>If you did not create an account, no further action is required.</p>
            </div>
            <div class="footer">
                <span class=''>AlloBus</span><p>&copy; 2024 Your Company. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
  `;

}