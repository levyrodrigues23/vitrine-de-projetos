import { useEffect } from "react";

const SITE_NAME = "Vitrine de Projetos - Campus UFC Itapajé";
const DEFAULT_DESCRIPTION =
  "Vitrine de Projetos do Campus UFC Itapajé: pesquisa, inovação e extensão desenvolvidas por alunos e professores.";
const DEFAULT_IMAGE = "/logo-ufc.png";

export interface SeoOptions {
  /** Título específico da página, sem o sufixo do nome do site. */
  title: string;
  description?: string;
  image?: string;
  /** Marca a página como não indexável (rotas de login/admin/gerenciador). */
  noIndex?: boolean;
}

function upsertMetaTag(attr: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`,
  );
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

export function useSeo({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  noIndex = false,
}: SeoOptions) {
  useEffect(() => {
    const fullTitle = `${title} | ${SITE_NAME}`;
    document.title = fullTitle;

    upsertMetaTag("name", "description", description);
    upsertMetaTag("name", "robots", noIndex ? "noindex, nofollow" : "index, follow");

    upsertMetaTag("property", "og:type", "website");
    upsertMetaTag("property", "og:title", fullTitle);
    upsertMetaTag("property", "og:description", description);
    upsertMetaTag("property", "og:image", image);
    upsertMetaTag("property", "og:url", window.location.href);

    upsertMetaTag("name", "twitter:card", "summary_large_image");
    upsertMetaTag("name", "twitter:title", fullTitle);
    upsertMetaTag("name", "twitter:description", description);
    upsertMetaTag("name", "twitter:image", image);
  }, [title, description, image, noIndex]);
}
