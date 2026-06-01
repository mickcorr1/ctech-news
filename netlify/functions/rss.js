exports.handler = async function(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { url } = JSON.parse(event.body);
    const response = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; cTechNews/1.0)" }
    });
    const text = await response.text();
    return {
      statusCode: 200,
      headers: { 
        "Content-Type": "application/xml",
        "Access-Control-Allow-Origin": "*"
      },
      body: text
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
