import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

export const GET = async () => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({}).populate('creator'); // Check the field name 'creator'

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.error('Error fetching prompts:', error); // Log the error details
    return new Response('Failed to fetch all prompts', { status: 500 });
  }
};
