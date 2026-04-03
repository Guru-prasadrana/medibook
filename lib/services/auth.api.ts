const API_URL = process.env.NEXT_PUBLIC_API_URL;

// SEND OTP
export const sendOtpApi = async (phone: string) => {
  const res = await fetch(`${API_URL}/auth/send-otp?phone=${phone}`, {
    method: "POST",
  });

  if (!res.ok) throw new Error("Failed to send OTP");

  return res.json();
};

// VERIFY OTP
export const verifyOtpApi = async (phone: string, otp: string) => {
  const res = await fetch(
    `${API_URL}/auth/verify-otp?phone=${phone}&otp=${otp}`,
    {
      method: "POST",
    },
  );

  if (!res.ok) throw new Error("Invalid OTP");

  return res.json();
};
