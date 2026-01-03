import { NumericString } from "@/global";
export function sendCodeHtml(code: NumericString): string {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Verification Code</title>
    </head>
    <body style="margin:0;padding:0;background-color:#000000;font-family:Arial,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" role="presentation">

              <!-- Logo -->
              <tr>
                <td align="center" style="padding:30px 0;">
                  <img
                    src="https://res.cloudinary.com/djovbiyia/image/upload/v1767466434/profile_iglx9w.png"
                    alt="Fsoceity Logo"
                    width="200"
                    style="display:block;"
                  />
                </td>
              </tr>

              <!-- Brand -->
              <tr>
                <td align="center" style="color:#ffffff;font-size:28px;font-weight:bold;">
                  Fsoceity
                </td>
              </tr>

              <!-- Code -->
              <tr>
                <td align="center" style="padding:20px 0;color:#ffffff;">
                  <p style="margin:0;font-size:14px;font-weight:bold;">
                    Your verification code
                  </p>
                  <p style="
                    margin:10px 0 0;
                    font-size:32px;
                    font-weight:bold;
                    letter-spacing:6px;
                  ">
                    ${code}
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
}