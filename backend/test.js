const { z } = require("zod");

// Define schema
const schema = z.object({
  email: z.string().email({ message: "Invalid email" })
});

// Intentionally invalid email
const input = { email: "invalid-email" };

// Validate using safeParse
const result = schema.safeParse(input);

// Check result
if (!result.success) {
  // Only exists when validation fails
  
  console.log("❌ Validation failed:");
  console.log(result.error.issues); // ✅ This should be an array
} else {
  console.log("✅ Validation succeeded:");
  console.log(result.data);
}
