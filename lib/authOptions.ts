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

               const confirmedUser = {
                    user1 : {
                       email:"test@sfr.com",
                       password:"test",
                       role:"user"
                   },
                    user2:  {
                       email:"test2@sfr.com",
                       password:"test",
                       role:"freemium"
                   },
                    user3:  {
                       email:"test3@sfr.com",
                       password:"test",
                       role:"premium"
                   }
               }

                if (!credentials?.email || !credentials.password) {
                    return null
                }

                const user = await (credentials.email === confirmedUser.user1.email && credentials.password === confirmedUser.user1.password) ? confirmedUser.user1 : (credentials.email === confirmedUser.user2.email && credentials.password === confirmedUser.user2.password) ? confirmedUser.user2 : (credentials.email === confirmedUser.user3.email && credentials.password === confirmedUser.user3.password) ? confirmedUser.user3 : null

                if (!user) {
                    return null
                }


                return {
                    email: user.email,
                    role: user.role
                } as any
            }
        })
    ],
    callbacks: {
        session: ({ session, token }) => ({
            ...session,
            user: {
                ...session.user,
                role: token.role
            }
        }),
        jwt: ({ token, user }) => {
            const r = user as any as { role: string }
            if (user) {
                return {
                    ...token,
                    role: r.role
                }
            }

            return token
        }
    },
}
export default authOptions