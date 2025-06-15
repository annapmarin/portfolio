import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  let name: string, email: string, message: string, recaptcha: string;

  // Type assertion para evitar error de tipos con env
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
    console.log("[contact] FormData body recibido:", { name, email, message, recaptcha });
  } else {
    console.log("[contact] ERROR: Unsupported Content-Type:", contentType);
    return new Response(JSON.stringify({ success: false, error: 'Unsupported Content-Type' }), { status: 400 });
  }

  // Validación reCAPTCHA
  const secret = getEnv('RECAPTCHA_SECRET');
  console.log("[contact] RECAPTCHA_SECRET:", !!secret);
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
  console.log("[contact] reCAPTCHA verifyData:", verifyData);
  if (!verifyData.success) {
    console.log("[contact] ERROR: reCAPTCHA failed", verifyData);
    return new Response(JSON.stringify({ success: false, error: 'reCAPTCHA failed', details: verifyData }), { status: 400 });
  }

  // Llamada a la API de Resend
  const resendApiKey = getEnv('RESEND_API_KEY');
  const emailTo = getEnv('EMAIL_TO');
  console.log("[contact] RESEND_API_KEY found:", !!resendApiKey);
  console.log("[contact] EMAIL_TO:", emailTo);

  const correoPayload = {
    from: 'Anna Prats <no-reply@annaprats.dev>',
    to: emailTo,
    subject: `Nuevo mensaje de ${name}`,
    reply_to: email,
    text: `Has recibido un mensaje desde tu portfolio:\n\nNombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`,
  };
  console.log("[contact] Resend payload:", correoPayload);

  const emailRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(correoPayload),
  });

  console.log("[contact] Resend status:", emailRes.status);
  const resendBody = await emailRes.text();
  console.log("[contact] Resend response body:", resendBody);

  if (!emailRes.ok) {
    console.log("[contact] ERROR: No se pudo enviar el email");
    return new Response(JSON.stringify({ success: false, error: 'No se pudo enviar el email', resend: resendBody }), { status: 500 });
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
};