import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from "bcrypt";
import postgres from "postgres";
import { User } from "./app/lib/definitions";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User[]>`SELECT * FROM users WHERE email=${email}`;
    return user[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // console.log(`credentials:${JSON.stringify(credentials)}`);
        // credentials:{"email":"user@nextmail.com","password":"123456","callbackUrl":"/dashboard"}

        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          // return user;
          // console.log(
          //   `parsedCredentials.data:${JSON.stringify(parsedCredentials.data, null, 2)}`,
          // );
          // console.log("user:", user);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) {
            // This user will be used to authorize as user property of params.auth in callbacks.authorized
            return user;
          }
        }

        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
});
