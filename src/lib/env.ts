const trim = (value: string | undefined) => value?.trim() || "";

export const env = {
  appUrl: trim(process.env.NEXT_PUBLIC_APP_URL) || "http://localhost:3000",
  supabaseUrl: trim(process.env.NEXT_PUBLIC_SUPABASE_URL),
  supabaseAnonKey: trim(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
  supabaseServiceRoleKey: trim(process.env.SUPABASE_SERVICE_ROLE_KEY),
  stripeSecretKey: trim(process.env.STRIPE_SECRET_KEY),
  stripePublishableKey: trim(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY),
  stripeWebhookSecret: trim(process.env.STRIPE_WEBHOOK_SECRET),
  stripePriceLookupKey: trim(process.env.STRIPE_PRICE_LOOKUP_KEY),
  stripePriceId: trim(process.env.STRIPE_PRICE_ID),
};

export const hasSupabaseBrowserEnv = Boolean(
  env.supabaseUrl && env.supabaseAnonKey,
);

export const hasSupabaseServerEnv = Boolean(
  env.supabaseUrl && env.supabaseAnonKey && env.supabaseServiceRoleKey,
);

export const hasStripeEnv = Boolean(
  env.stripeSecretKey &&
    env.stripePublishableKey &&
    (env.stripePriceId || env.stripePriceLookupKey),
);
