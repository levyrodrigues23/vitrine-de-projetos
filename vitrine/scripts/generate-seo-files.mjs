import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(here, "..", "public");

// Domínio de produção ainda não foi definido para este projeto. Defina
// VITE_SITE_URL no ambiente de build assim que o domínio existir, para que
// robots.txt e sitemap.xml apontem para as URLs reais. "example" é um TLD
// reservado pela IANA para documentação (RFC 2606) — não resolve de verdade,
// então não há risco de confundir com um domínio real.
const FALLBACK_SITE_URL = "https://dominio-nao-configurado.example";
const rawSiteUrl = process.env.VITE_SITE_URL?.trim();
const siteUrl = (rawSiteUrl || FALLBACK_SITE_URL).replace(/\/+$/, "");

if (!rawSiteUrl) {
  console.warn(
    `[generate-seo-files] VITE_SITE_URL não definida. Usando "${FALLBACK_SITE_URL}" como placeholder em robots.txt e sitemap.xml.`,
  );
}

// Rotas públicas indexáveis do site. Ao adicionar ou remover uma rota pública
// em src/routes/index.tsx, atualize esta lista também.
//
// Páginas de detalhe de projeto (/projetos/:id) não entram aqui: são
// dinâmicas e vêm da API, não existem em tempo de build.
const PUBLIC_ROUTES = [
  { path: "/", priority: "1.0" },
  { path: "/sobre", priority: "0.6" },
  { path: "/agenda", priority: "0.6" },
  { path: "/empreendedorismo", priority: "0.6" },
  { path: "/empreendedorismo/startups", priority: "0.5" },
  { path: "/empreendedorismo/editais", priority: "0.5" },
  { path: "/empreendedorismo/empresa-jr", priority: "0.5" },
  { path: "/minicursos", priority: "0.6" },
  { path: "/portal-egressos", priority: "0.5" },
  { path: "/portal-egressos/egressos", priority: "0.4" },
  { path: "/portal-egressos/noticias", priority: "0.4" },
  { path: "/producao-cientifica", priority: "0.6" },
  { path: "/producao-cientifica/artigos-publicacoes", priority: "0.5" },
  { path: "/producao-cientifica/congressos-simposios", priority: "0.5" },
  { path: "/producao-tecnica", priority: "0.6" },
  { path: "/professores", priority: "0.6" },
  { path: "/projetos", priority: "0.8" },
  { path: "/projetos/pesquisa", priority: "0.6" },
  { path: "/projetos/extensao", priority: "0.6" },
  { path: "/projetos/inovacao", priority: "0.6" },
];

const urlEntries = PUBLIC_ROUTES.map(
  ({ path: routePath, priority }) =>
    `  <url>\n    <loc>${siteUrl}${routePath}</loc>\n    <priority>${priority}</priority>\n  </url>`,
).join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`;

const robots = [
  "User-agent: *",
  "Allow: /",
  "Disallow: /admin",
  "Disallow: /gerenciador",
  "Disallow: /login",
  "",
  `Sitemap: ${siteUrl}/sitemap.xml`,
  "",
].join("\n");

mkdirSync(publicDir, { recursive: true });
writeFileSync(path.join(publicDir, "sitemap.xml"), sitemap, "utf8");
writeFileSync(path.join(publicDir, "robots.txt"), robots, "utf8");

console.log(`[generate-seo-files] robots.txt e sitemap.xml gerados com base em ${siteUrl}`);
