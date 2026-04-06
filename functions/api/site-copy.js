function jsonResponse(status, payload) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

function requireEnv(env, key) {
  const val = env[key];
  if (!val) throw new Error(`Missing env var: ${key}`);
  return val;
}

function getTextProp(props, name) {
  const p = props?.[name];
  if (!p) return "";
  // "text" property in Notion API returns rich_text array
  if (p.type === "rich_text") {
    return (p.rich_text || []).map((r) => r.plain_text || "").join("");
  }
  // sometimes title is used
  if (p.type === "title") {
    return (p.title || []).map((r) => r.plain_text || "").join("");
  }
  // fallback
  return "";
}

export async function onRequestGet(context) {
  try {
    const { request, env } = context;

    const NOTION_TOKEN = requireEnv(env, "NOTION_TOKEN");
    const NOTION_SITE_COPY_DB_ID = requireEnv(env, "NOTION_SITE_COPY_DB_ID");

    const url = new URL(request.url);
    const lang = (url.searchParams.get("lang") || "en").toLowerCase();
    const langCol = lang === "ru" ? "RU" : "EN";

    // query all rows
    const res = await fetch(
      `https://api.notion.com/v1/databases/${NOTION_SITE_COPY_DB_ID}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${NOTION_TOKEN}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          page_size: 100,
          sorts: [{ property: "key", direction: "ascending" }],
        }),
      }
    );

    if (!res.ok) {
      const t = await res.text().catch(() => "");
      return jsonResponse(500, { ok: false, error: "Notion query failed", details: t });
    }

    const data = await res.json();
    const results = data?.results || [];

    const dict = {};
    for (const row of results) {
      const props = row.properties || {};
      const k = getTextProp(props, "key").trim();
      if (!k) continue;

      const en = getTextProp(props, "EN").trim();
      const ru = getTextProp(props, "RU").trim();

      // fallback: if requested language missing, fallback to EN
      const val = (langCol === "RU" ? ru : en) || en || ru || "";
      dict[k] = val;
    }

    return jsonResponse(200, { ok: true, lang: langCol.toLowerCase(), copy: dict });
  } catch (e) {
    return jsonResponse(500, { ok: false, error: e?.message || "Server error" });
  }
}