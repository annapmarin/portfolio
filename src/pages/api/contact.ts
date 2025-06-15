import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  let name: string, email: string, message: string, recaptcha: string;

  const contentType = request.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    const body = await request.json();
    name = body.name;
    email = body.email;
    message = body.message;
    recaptcha = body.recaptcha;
  } else if (
    contentType.includes('multipart/form-data') ||
    contentType.includes('application/x-www-form-urlencoded')
  ) {
    const formData = await request.formData();
    name = formData.get('name') as string;
    email = formData.get('email') as string;
    message = formData.get('message') as string;
    recaptcha = formData.get('recaptcha') as string;
  } else {
    return new Response(JSON.stringify({ success: false, error: 'Unsupported Content-Type' }), { status: 400 });
  }

  // ReCAPTCHA validation
  const secret = import.meta.env.RECAPTCHA_SECRET;
  const params = new URLSearchParams();
  params.append('secret', secret);
  params.append('response', recaptcha);

  const verifyRes = await fetch(
    'https://www.google.com/recaptcha/api/siteverify',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    }
  );
  const verifyData = await verifyRes.json();
  console.log('reCAPTCHA verifyData:', verifyData);
  if (!verifyData.success) {
    return new Response(JSON.stringify({ success: false, error: 'reCAPTCHA failed', details: verifyData }), { status: 400 });
  }

  // Resend endpoint
  const resendApiKey = import.meta.env.RESEND_API_KEY;
  const emailRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Anna Prats <no-reply@annaprats.dev>',
      to: import.meta.env.EMAIL_TO,
      subject: `Nuevo mensaje de ${name}`,
      reply_to: email,
      text: `Has recibido un mensaje desde tu portfolio:\n\nNombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`,
    }),
  });

  if (!emailRes.ok) {
    return new Response(JSON.stringify({ success: false, error: 'No se pudo enviar el email' }), { status: 500 });
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
};