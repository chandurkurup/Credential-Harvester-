import {z} from 'genkit';

export const CredentialsInputSchema = z.object({
  username: z.string().describe("The user's email or phone number."),
  password: z.string().describe("The user's password."),
});
export type CredentialsInput = z.infer<typeof CredentialsInputSchema>;
