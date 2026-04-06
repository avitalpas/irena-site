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

function richTextToPlain(arr) {
  return (arr || []).map((r) => r.plain_text || "").join("");
}

function getPropText(props, name) {
  const p = props?.[name];
  if (!p) return "";
  if (p.type === "title") return richTextToPlain(p.title);
  if (p.type === "rich_text") return richTextToPlain(p.rich_text);
  return "";
}

export async function onRequestGet(context) {
  try {
    const { request, env } = context;

    const NOTION_TOKEN = requireEnv(env, "NOTION_TOKEN");
    const NOTION_SITE_COPY_DB_ID = requireEnv(env, "NOTION_SITE_COPY_DB_ID");

    const url = new URL(request.url);
    const lang = (url.searchParams.get("lang") || "en").toLowerCase();

    const wantRU = lang === "ru";
    const wantHE = lang === "he";

    const notionUrl = `https://api.notion.com/v1/databases/${NOTION_SITE_COPY_DB_ID}/query`;

    const res = await fetch(notionUrl, {
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
    });

    if (!res.ok) {
      const details = await res.text().catch(() => "");
      return jsonResponse(500, { ok: false, error: "Notion query failed", details });
    }

    const data = await res.json();
    const results = data?.results || [];

    const dict = {};
    for (const row of results) {
      const props = row.properties || {};
      const k = getPropText(props, "key").trim();
      if (!k) continue;

      const en = getPropText(props, "EN").trim();
      const ru = getPropText(props, "RU").trim();
      const he = getPropText(props, "HE").trim();

      let val = "";
      if (wantHE) val = he || en || ru || "";
      else if (wantRU) val = ru || en || he || "";
      else val = en || ru || he || "";

      dict[k] = val;
    }

    return jsonResponse(200, {
      ok: true,
      lang: wantHE ? "he" : wantRU ? "ru" : "en",
      dir: wantHE ? "rtl" : "ltr",
      copy: dict,
    });
  } catch (e) {
    return jsonResponse(500, { ok: false, error: e?.message || "Server error" });
  }
}