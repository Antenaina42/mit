import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const SYSTEM_INSTRUCTION = `Tu es Pounie, l'assistante IA officielle de M-It LevelUp, une agence digitale premium basée à Madagascar. 
Ton rôle est d'accueillir les visiteurs, de répondre à leurs questions sur les services de l'agence (Développement Web, Applications Mobiles, IA & Automatisation, Solutions Cloud), et de les encourager subtilement à démarrer un projet avec l'agence.
Sois toujours poli, professionnel, moderne, et concis. Ne donne pas d'informations de tarification exactes (invite plutôt à contacter l'agence via le formulaire).
Si on te demande comment contacter l'agence, dis-leur d'utiliser le formulaire de contact en bas de page ou d'écrire à contact@m-itlevelup.com ou sur WhatsApp au +261 34 54 038 98.`;

export async function POST(req: Request) {
  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json(
      { error: "La clé API Gemini n'est pas configurée." },
      { status: 500 }
    );
  }

  try {
    const { history, message } = await req.json();

    // The Gemini 1.5 Flash model is fast and efficient for text tasks
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: SYSTEM_INSTRUCTION,
    });

    // Format history for Gemini API
    const formattedHistory = history.map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }],
    }));

    const chat = model.startChat({
      history: formattedHistory,
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ response: text });
  } catch (error) {
    console.error("Erreur lors de l'appel à Gemini:", error);
    return NextResponse.json(
      { error: "Désolé, une erreur s'est produite lors de la génération de la réponse." },
      { status: 500 }
    );
  }
}
