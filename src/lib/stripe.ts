import Stripe from "stripe";

import { env } from "@/lib/env";

export function getStripeServerClient() {
  if (!env.stripeSecretKey) {
    return null;
  }

  return new Stripe(env.stripeSecretKey, {
    apiVersion: "2026-02-25.clover",
  });
}
