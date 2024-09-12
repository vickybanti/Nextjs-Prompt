import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import {connectToDB} from '@utils/database'
import User from '@models/user'
console.log({
    clientId:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_SECRET_ID,

})
const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_SECRET_ID,
        })
    ],
    callbacks: {
        async session({ session }) {
          try {
            // Ensure a valid connection to the database
            await connectToDB();
            
            // Fetch the user from the database based on the session user's email
            const sessionUser = await User.findOne({ email: session.user.email });
      
            if (sessionUser) {
              // Assign the user's ID to the session object
              session.user.id = sessionUser._id.toString();
            }
            
            return session;
          } catch (error) {
            console.error("Error in session callback:", error);
            return session;  // Return the session even if there's an error to avoid breaking the auth flow
          }
        },
        async signIn({ profile }) {
          try {
            await connectToDB();
      
            // Check if the user already exists in the database
            const userExists = await User.findOne({ email: profile.email });
      
            if (!userExists) {
              // If user doesn't exist, create a new user
              await User.create({
                email: profile.email,
                username: profile.name.replace(/\s+/g, "").toLowerCase(), // Remove spaces and convert to lowercase
                image: profile.picture,
              });
            }
            
            return true; // Allow sign in
          } catch (error) {
            console.error("Error in signIn callback:", error);
            return false; // Disallow sign in if there's an error
          }
        },
      }
      
    
})

export {handler as GET, handler as POST}