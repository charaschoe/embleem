import OpenAI from 'openai';

const openai = new OpenAI({
	apiKey: import.meta.env.VITE_OPENAI_API_KEY,
	dangerouslyAllowBrowser: true // Required for client-side usage
});

export async function getAnimalInfo(animal: string, country: string) {
	try {
		const response = await openai.chat.completions.create({
			model: 'gpt-4',
			messages: [
				{
					role: 'user',
					content: `Gib mir folgende Informationen über das Tier "${animal}" aus "${country}" im JSON Format zurück (auf Deutsch):
        {
          "nativeName": "Name in der Landessprache",
          "nativeCountryName": "Name des Landes in der Landessprache",
          "funFacts": ["3 spannende Fakten für Kinder"],
          "size": "Größe in kindgerechter Sprache",
          "weight": "Gewicht in kindgerechter Sprache",
          "food": "Was frisst das Tier am liebsten?",
          "habitat": "Wo lebt das Tier?",
          "countries": ["Liste aller Länder wo es Wappentier ist"]
        }`
				}
			],
			temperature: 0.7
		});
		return JSON.parse(response.choices[0].message.content);
	} catch (error) {
		console.error('Fehler beim Laden der Tierinfos:', error);
		return null;
	}
}
