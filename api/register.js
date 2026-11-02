const allowedPlatforms = new Set(["PC", "PlayStation", "Xbox", "Nintendo Switch"]);

function clean(value, maxLength) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const webhook = process.env.DISCORD_WEBHOOK;
  if (!webhook) {
    return res.status(500).json({ error: "Registration is not configured yet. Please contact the event team." });
  }

  const discordUsername = clean(req.body?.discordUsername, 80);
  const sarUsername = clean(req.body?.sarUsername, 40);
  const friendCode = clean(req.body?.friendCode, 40);
  const platform = clean(req.body?.platform, 30);

  if (!discordUsername || !sarUsername || !friendCode || !allowedPlatforms.has(platform)) {
    return res.status(400).json({ error: "Please complete every field with valid information." });
  }

  const embed = {
    title: "New Participant",
    color: 0x718db5,
    fields: [
      { name: "Discord Username :", value: discordUsername, inline: true },
      { name: "Pseudo SAR :", value: sarUsername, inline: true },
      { name: "SAR Friend Code :", value: friendCode, inline: true },
      { name: "Platform :", value: platform, inline: true }
    ],
    footer: { text: "The 1v1 Fox Carnival" }
  };

  try {
    const discordResponse = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ embeds: [embed] })
    });

    if (!discordResponse.ok) {
      return res.status(502).json({ error: "Discord could not receive the registration. Please try again later." });
    }

    return res.status(200).json({ success: true });
  } catch {
    return res.status(502).json({ error: "The registration service is temporarily unavailable." });
  }
};