function json(status, payload) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function requireEnv(env, key) {
  const val = env[key];
  if (!val) throw new Error(`Missing env var: ${key}`);
  return val;
}

export async function onRequestGet(context) {
  try {
    const { env } = context;

    const NOTION_TOKEN = requireEnv(env, "NOTION_TOKEN");
    const NOTION_SONGS_DB_ID = requireEnv(env, "NOTION_SONGS_DB_ID");

    // UTC "today start" כדי שהשוואה תהיה עקבית
    const now = new Date();
    const todayIso = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))
      .toISOString();

    const payload = {
      page_size: 1,
      sorts: [{ property: "תאריך הפצה", direction: "ascending" }],
      filter: {
        and: [
          // חייב תאריך הפצה
          { property: "תאריך הפצה", date: { is_not_empty: true } },
          // תאריך הפצה היום או בעתיד
          { property: "תאריך הפצה", date: { on_or_after: todayIso } },
          // סטטוס הפצה לא בקבוצת complete (כלומר לא "הופץ כשיר מלא" וכו')
          { property: "סטטוס הפצה", status: { does_not_equal: "הופץ כשיר מלא" } },
        ],
      },
    };

    // הערה: אם בעתיד יהיו עוד סטטוסים בקבוצת Complete, עדיף להפוך את זה למסנן "is_not_complete"
    // אבל ב-API של Notion לפעמים הכי יציב לעבוד מול שם סטטוס ספציפי. אם תרצי, נהפוך את זה לרשימה.

    const res = await fetch(`https://api.notion.com/v1/databases/${NOTION_SONGS_DB_ID}/query`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${NOTION_TOKEN}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const t = await res.text().catch(() => "");
      return json(500, { ok: false, error: "Notion query failed", details: t });
    }

    const data = await res.json();

    const row = data?.results?.[0];
    if (!row) return json(200, { ok: true, song: null });

    // חילוץ שדות לפי שמות העמודות
    const props = row.properties || {};

    const title =
      props["שם"]?.title?.[0]?.plain_text ||
      props["שם"]?.title?.[0]?.text?.content ||
      "";

    const releaseDateIso = props["תאריך הפצה"]?.date?.start || null;

    const releaseShort =
      props["Release (DD.MM)"]?.formula?.string || null;

    const ytUrl =
      props["YouTube reminder URL"]?.url || null;

    const spUrl =
      props["Spotify pre-save URL"]?.url || null;

    return json(200, {
      ok: true,
      song: {
        title,
        releaseDateIso,
        releaseShort,
        ytUrl,
        spUrl,
      },
    });
  } catch (e) {
    return json(500, { ok: false, error: e?.message || "Server error" });
  }
}