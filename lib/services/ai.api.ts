const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const analyzeSymptomsApi = async (symptoms: string, user_id: number) => {
  try {
    const response = await fetch(
      `${BASE_URL}/ai/analyze?symptoms=${encodeURIComponent(
        symptoms,
      )}&user_id=${user_id}`,
      {
        method: "POST",
      },
    );

    if (!response.ok) {
      throw new Error("Failed to analyze symptoms");
    }

    return await response.json();
  } catch (error) {
    console.error("AI Analyze Error:", error);
    throw error;
  }
};
