import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  let name: string, email: string, message: string, recaptcha: string;

  const getEnv = (key: string) =>
    typeof (locals as any)?.env === 'object'
      ? (locals as any).env[key]
      : import.meta.env[key];

  const contentType = request.headers.get('content-type') || '';
  console.log("[contact] Content-Type:", contentType);

  if (contentType.includes('application/json')) {
    const body = await request.json();
    console.log("[contact] JSON body recibido:", body);
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

  // Validación reCAPTCHA
  const secret = getEnv('RECAPTCHA_SECRET');
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
  if (!verifyData.success) {
    console.log("[contact] ERROR: reCAPTCHA failed", verifyData);
    return new Response(JSON.stringify({ success: false, error: 'reCAPTCHA failed', details: verifyData }), { status: 400 });
  }

  // Llamada a la API de Resend
  const resendApiKey = getEnv('RESEND_API_KEY');
  const emailTo = getEnv('EMAIL_TO');

  const correoPayload = {
    from: 'Anna Prats <no-reply@annaprats.dev>',
    to: emailTo,
    subject: `Nuevo mensaje de ${name}`,
    reply_to: email,
    text: `Has recibido un mensaje desde tu portfolio:\n\nNombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`,
  };

  const emailRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(correoPayload),
  });

  const resendBody = await emailRes.text();

  if (!emailRes.ok) {
    return new Response(JSON.stringify({ success: false, error: 'No se pudo enviar el email', resend: resendBody }), { status: 500 });
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
};