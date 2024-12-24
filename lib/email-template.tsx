const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export function createEmailTemplate(content: string) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Metrohuts Email</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <header style="background-color: #f97316; color: white; padding: 20px; text-align: center;">
        <h1 style="margin: 0;">Metrohuts</h1>
      </header>
      <main style="padding: 20px;">
        ${content}
      </main>
      <footer style="text-align: center; margin-top: 20px; font-size: 12px; color: #666;">
        © ${new Date().getFullYear()} Metrohuts. All rights reserved.
      </footer>
    </body>
    </html>
  `;
}

