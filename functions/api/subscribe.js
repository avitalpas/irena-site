export async function onRequestPost(context) {
  try {
    const { request, env } = context;

    const NOTION_TOKEN = env.NOTION_TOKEN;
    const NOTION_DB_URL = env.NOTION_DB_URL;

    if (!NOTION_TOKEN || !NOTION_DB_URL) {
      return new Response(JSON.stringify({ ok: false, error: "Missing server configuration" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const body = await request.json().catch(() => ({}));
    const emailRaw = (body.email || "").toString().trim();
    const source = (body.source || "אתר — Coming soon").toString().trim();
    const song = (body.song || "Мажор моей души").toString().trim();
    const notes = (body.notes || "").toString().trim();

    if (!emailRaw || !emailRaw.includes("@")) {
      return new Response(JSON.stringify({ ok: false, error: "Invalid email" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Load database to get dataSourceUrl and property ids (so we don't guess them)
    const dbRes = await fetch(`https://api.notion.com/v1/databases/${encodeURIComponent(NOTION_DB_URL)}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${NOTION_TOKEN}`,
        "Notion-Version": "2022-06-28",
      },
    });

    if (!dbRes.ok) {
      const t = await dbRes.text();
      return new Response(JSON.stringify({ ok: false, error: "Failed to load database", details: t }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const db = await dbRes.json();
    const databaseId = db.id;

    // Create page in database
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const isoDate = `${yyyy}-${mm}-${dd}`;

    const pageRes = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${NOTION_TOKEN}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parent: { database_id: databaseId },
        properties: {
          "אימייל": { title: [{ text: { content: emailRaw } }] },
          "נרשם ב": { date: { start: isoDate } },
          "מקור": { select: { name: source } },
          "שיר": { select: { name: song } },
          "הערות": notes ? { rich_text: [{ text: { content: notes } }] } : { rich_text: [] },
        },
      }),
    });

    if (!pageRes.ok) {
      const t = await pageRes.text();
      return new Response(JSON.stringify({ ok: false, error: "Failed to create row", details: t }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}