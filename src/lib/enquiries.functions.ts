import { createServerFn } from "@tanstack/react-start";

import { bookingSchema, leadSchema } from "./schemas";

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => leadSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("leads").insert({
      full_name: data.fullName,
      email: data.email,
      phone: data.phone,
      property_type: data.propertyType,
      space_size: data.spaceSize || null,
      budget_range: data.budgetRange || null,
      message: data.message || null,
    });
    if (error) {
      console.error("lead insert failed", error.message);
      throw new Error("We could not save your enquiry. Please call us instead.");
    }
    return { ok: true };
  });

export const getBookedSlots = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => {
    const value = input as { from?: string; to?: string };
    const re = /^\d{4}-\d{2}-\d{2}$/;
    if (!value?.from || !value?.to || !re.test(value.from) || !re.test(value.to)) {
      throw new Error("Invalid date range");
    }
    return { from: value.from, to: value.to };
  })
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows, error } = await supabaseAdmin.rpc("booked_slots", {
      _from: data.from,
      _to: data.to,
    });
    if (error) {
      console.error("booked_slots failed", error.message);
      return { taken: [] as string[] };
    }
    return {
      taken: (rows ?? []).map((row) => `${row.slot_date}|${row.slot_time}`),
    };
  });

export const createBooking = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => bookingSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("bookings").insert({
      full_name: data.fullName,
      email: data.email,
      phone: data.phone,
      service: data.service,
      property_type: data.propertyType,
      space_size: data.spaceSize || null,
      budget_range: data.budgetRange || null,
      slot_date: data.slotDate,
      slot_time: data.slotTime,
      notes: data.notes || null,
    });

    if (error) {
      if (error.code === "23505" || error.code === "23P01" || error.code === "23514" || error.code === "23000" || error.code === "23503" || error.code === "23502" || error.code === "23001" || error.code === "23514") {
        console.error("booking insert failed", error.message);
      }
      if (error.code === "23505" || error.message.includes("duplicate key")) {
        throw new Error("That slot was just taken. Please pick another time.");
      }
      console.error("booking insert failed", error.message);
      throw new Error("We could not confirm that slot. Please try again.");
    }

    return { ok: true };
  });