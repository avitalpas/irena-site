function jsonResponse(status, payload) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function requireEnv(env, key) {
  const val = env[key];
  if (!val) {
    const msg = `Missing env var: ${key}`;
    console.log("[subscribe] CONFIG ERROR:", msg);
    throw new Error(msg);
  }
  return val;
}

function safeEmail(email) {
  if (!email) return "";
  const [a, b] = String(email).split("@");
  if (!b) return String(email).slice(0, 2) + "***";
  return `${(a || "").slice(0, 2)}***@${b}`;
}

export async function onRequestPost(context) {
  const reqId = crypto?.randomUUID?.() || String(Date.now());
  const tag = `[subscribe][${reqId}]`;

  console.log(tag, "start");

  try {
    const { request, env } = context;

    const NOTION_TOKEN = requireEnv(env, "NOTION_TOKEN");
    const NOTION_DB_ID = requireEnv(env, "NOTION_DB_ID");

    let body = {};
    try {
      body = await request.json();
    } catch (e) {
      console.log(tag, "bad json body");
      return jsonResponse(400, { ok: false, error: "Invalid JSON body" });
    }

    const emailRaw = (body.email || "").toString().trim();
    const source = (body.source || "אתר — Coming soon").toString().trim();
    const song = (body.song || "").toString().trim(); // עכשיו מגיע מהאתר אוטומטית
    const consent = Boolean(body.consent);
    const consentVersion = (body.consentVersion || "v1").toString().trim();

    console.log(tag, "incoming", {
      email: safeEmail(emailRaw),
      source,
      song,
      consent,
      consentVersion,
    });

    if (!emailRaw || !emailRaw.includes("@")) {
      console.log(tag, "validation fail: email");
      return jsonResponse(400, { ok: false, error: "Invalid email" });
    }

    if (!song) {
      console.log(tag, "validation fail: song missing");
      return jsonResponse(400, { ok: false, error: "Missing song" });
    }

    if (!consent) {
      console.log(tag, "validation fail: consent");
      return jsonResponse(400, { ok: false, error: "Consent required" });
    }

    const nowIso = new Date().toISOString();
    console.log(tag, "timestamp", nowIso);

    const notionPayload = {
      parent: { database_id: NOTION_DB_ID },
      properties: {
        "אימייל": { title: [{ text: { content: emailRaw } }] },
        "נרשם ב": { date: { start: nowIso } },
        "מקור": { select: { name: source } },
        "שיר": { select: { name: song } },

        "הסכמה לדיוור": { checkbox: true },
        "מועד הסכמה": { date: { start: nowIso } },
        "גרסת נוסח הסכמה": {
          rich_text: [{ text: { content: consentVersion } }],
        },
      },
    };

    console.log(tag, "notion request prepared", {
      database_id: NOTION_DB_ID,
      props: Object.keys(notionPayload.properties),
    });

    const pageRes = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${NOTION_TOKEN}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(notionPayload),
    });

    console.log(tag, "notion response status", pageRes.status);

    if (!pageRes.ok) {
      const text = await pageRes.text().catch(() => "");
      console.log(tag, "notion error body", text);
      return jsonResponse(500, {
        ok: false,
        error: "Notion API error",
        status: pageRes.status,
        details: text,
      });
    }

    const pageJson = await pageRes.json().catch(() => null);
    console.log(tag, "success", { pageId: pageJson?.id });

    return jsonResponse(200, { ok: true, pageId: pageJson?.id });
  } catch (e) {
    console.log(tag, "server error", e?.message || e);
    return jsonResponse(500, { ok: false, error: e?.message || "Server error" });
  }
}