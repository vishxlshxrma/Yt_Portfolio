const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5001";

const request = async (path, options = {}) => {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
    });
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(
        `Cannot reach backend at ${API_BASE_URL}. Start the server (cd server && npm run dev).`
      );
    }
    throw error;
  }

  let payload = null;
  try {
    payload = await response.json();
  } catch (error) {
    payload = null;
  }

  if (!response.ok) {
    const message =
      payload?.message || `Request failed (${response.status} ${response.statusText})`;
    throw new Error(message);
  }

  return payload;
};

export const submitContactForm = async (formPayload) => {
  const data = await request("/api/contact", {
    method: "POST",
    body: JSON.stringify(formPayload),
  });
  return data;
};

export const getPortfolioStats = async () => {
  const data = await request("/api/stats");
  return {
    views: Number(data?.views ?? 0),
    likes: Number(data?.likes ?? 0),
  };
};

export const incrementPortfolioView = async () => {
  const data = await request("/api/stats/view", {
    method: "POST",
  });
  return {
    views: Number(data?.views ?? 0),
    likes: Number(data?.likes ?? 0),
  };
};

export const incrementPortfolioLike = async () => {
  const data = await request("/api/stats/like", {
    method: "POST",
  });
  return {
    views: Number(data?.views ?? 0),
    likes: Number(data?.likes ?? 0),
  };
};
