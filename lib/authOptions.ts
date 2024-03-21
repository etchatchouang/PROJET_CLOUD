import CredentialsProvider from "next-auth/providers/credentials"
import {NextAuthOptions} from "next-auth"

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 12 * 60 * 60
    },
    providers: [
        CredentialsProvider({
            name: "Sign in",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "hello@example.com"
                },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials) {

                const user1 = {
                    email:"test@sfr.com",
                    password:"test"
                }
                const user2 = {
                    email:"test2@sfr.com",
                    password:"test"
                }
                const user3 = {
                    email:"test3@sfr.com",
                    password:"test"
                }

                if (!credentials?.email || !credentials.password) {
                    return null
                }

                const user = await (credentials.email === user1.email && credentials.password === user1.password) ? user1 : (credentials.email === user2.email && credentials.password === user2.password) ? user2 : (credentials.email === user3.email && credentials.password === user3.password) ? user3 : null

                if (!user) {
                    return null
                }


                return {
                    email: user.email,
                } as any
            }
        })
    ],
    callbacks: {
        session: ({ session, token }) => ({
            ...session,
            user: {
                ...session.user,
            }
        }),
        jwt: ({ token, user }) => {
            if (user) {
                return {
                    ...token,
                }
            }

            return token
        }
    },
}
export default authOptions