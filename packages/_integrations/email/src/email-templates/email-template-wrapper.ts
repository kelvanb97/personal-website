import { escapeHtml } from "./escape-html"

export function emailTemplateWrapper({
	title,
	body,
}: {
	title: string
	body: string
}) {
	return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width" />
<title>${escapeHtml(title)}</title>
<style>
/* Mobile-first, email-safe styles */
body { margin:0; padding:0; background:#0b0d10; }
.table { width:100%; border-collapse:collapse; }
.container { max-width:640px; margin:0 auto; }
.card {
  background:#0f1318;
  border:1px solid rgba(255,255,255,0.08);
  border-radius:12px;
  padding:24px;
  color:#e6edf3;
  font-family: ui-sans-serif, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji";
}
.h1 { font-size:20px; line-height:1.3; margin:0 0 12px; }
.p  { font-size:14px; line-height:1.6; margin:0 0 14px; color:#c9d1d9; }
.kv { margin:10px 0 16px; }
.kv-row { margin:0 0 6px; font-size:14px; color:#c9d1d9; }
.kv-label { color:#8b949e; }
.btns { margin-top:18px; display:flex; gap:10px; column-gap:10px; flex-wrap:wrap; }
.btn {
  display:inline-block; text-decoration:none; font-size:14px; line-height:1;
  padding:12px 16px; border-radius:10px; border:1px solid rgba(255,255,255,0.1);
}
.btn-primary { background:#46a97c; color:white !important; border-color:#46a97c; }
.btn-ghost   { color:white !important; background:transparent; }
.small { font-size:12px; color:#8b949e; margin-top:16px; }
.hr { height:1px; background:rgba(255,255,255,0.06); border:0; margin:16px 0; }
.code { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono","Courier New", monospace; }
blockquote {
  margin:8px 0 0; padding:10px 12px; border-left:3px solid rgba(255,255,255,0.15);
  background:rgba(255,255,255,0.04); border-radius:8px; color:#c9d1d9;
}
</style>
</head>
<body>
  <table role="presentation" class="table" aria-hidden="true"><tr><td>
	<div class="container">
	  <div style="height:20px"></div>
	  <div class="card">
		${body}
		<div class="hr"></div>
		<p class="small">Sent by Kelvan</p>
	  </div>
	  <div style="height:20px"></div>
	</div>
  </td></tr></table>
</body>
</html>`
}
