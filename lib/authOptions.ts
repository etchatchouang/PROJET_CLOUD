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
                    basic: {
                        email: "basic@example.com",
                        password: "basicPass",
                        role: "basic"
                    },
                    premium: {
                        email: "premium@example.com",
                        password: "premiumPass",
                        role: "premium"
                    },
                    senior: {
                        email: "senior@example.com",
                        password: "seniorPass",
                        role: "senior"
                    }
                }

                if (!credentials?.email || !credentials.password) {
                    return null
                }

                const user = await (credentials.email === confirmedUser.basic.email && credentials.password === confirmedUser.basic.password) ? confirmedUser.basic : (credentials.email === confirmedUser.premium.email && credentials.password === confirmedUser.premium.password) ? confirmedUser.premium : (credentials.email === confirmedUser.senior.email && credentials.password === confirmedUser.senior.password) ? confirmedUser.senior : null

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