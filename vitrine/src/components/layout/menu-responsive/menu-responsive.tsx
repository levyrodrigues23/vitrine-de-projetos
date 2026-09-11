import { NavLink, useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import Menu from "../../../assets/icons/menu.svg?react";
import Arrowright from "../../../assets/icons/caret-right.svg?react";
import { Icon, Input } from "../../ui";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { useProjects } from "../../../hooks/project";
import { useProjectSearchSuggestions } from "../../../hooks/search";
import type { Project } from "../../../types/project.types";

type NavIcon =
  | React.ComponentType<React.SVGProps<SVGSVGElement>>
  | React.ForwardRefExoticComponent<
      React.SVGProps<SVGSVGElement> & React.RefAttributes<SVGSVGElement>
    >;

export type NavLinkItem = {
  label: string;
  to: string;
  icon?: NavIcon;
};

export interface MenuResponsiveProps {
  headerNavLinks: NavLinkItem[];
  menuNavLinks?: NavLinkItem[];
  logoSrc?: string;
  logoAlt?: string;
}

function SearchSuggestionsList({
  projects,
  onSelect,
  variant,
}: {
  projects: Project[];
  onSelect: (id: string) => void;
  variant: "light" | "dark";
}) {
  if (projects.length === 0) return null;

  return (
    <ul
      className={`mt-2 max-h-72 space-y-1 overflow-y-auto rounded-md ${
        variant === "light" ? "bg-white" : "bg-white/5"
      }`}
    >
      {projects.map((project) => (
        <li key={project.id}>
          <button
            type="button"
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => onSelect(project.id)}
            className={`block w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
              variant === "light"
                ? "text-black hover:bg-gray-100"
                : "text-white/90 hover:bg-white/10"
            }`}
          >
            <span className="block font-semibold">{project.title}</span>
            {project.description && (
              <span
                className={`block truncate text-xs ${
                  variant === "light" ? "text-gray-base" : "text-white/60"
                }`}
              >
                {project.description}
              </span>
            )}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default function MenuResponsive({
  headerNavLinks,
  menuNavLinks = headerNavLinks,
  logoSrc = "/logo-ufc.png",
  logoAlt = "UFC",
}: MenuResponsiveProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDesktopSearchOpen, setIsDesktopSearchOpen] = useState(false);
  const [desktopQuery, setDesktopQuery] = useState("");
  const [mobileQuery, setMobileQuery] = useState("");

  const navigate = useNavigate();
  const { projects } = useProjects();
  const { suggestions: desktopSuggestions, search: searchDesktop } =
    useProjectSearchSuggestions(projects, desktopQuery);
  const { suggestions: mobileSuggestions, search: searchMobile } =
    useProjectSearchSuggestions(projects, mobileQuery);

  const desktopSearchRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 10);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isDesktopSearchOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        desktopSearchRef.current &&
        !desktopSearchRef.current.contains(event.target as Node)
      ) {
        setIsDesktopSearchOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDesktopSearchOpen]);

  function goToProject(id: string) {
    navigate(`/projetos/${id}`);
  }

  function searchOrNavigate(
    query: string,
    findBestMatch: (value: string, limit?: number) => Project[],
  ) {
    const trimmed = query.trim();
    if (!trimmed) return;

    const [bestMatch] = findBestMatch(trimmed, 1);
    if (bestMatch) {
      goToProject(bestMatch.id);
      return;
    }

    navigate(`/projetos?busca=${encodeURIComponent(trimmed)}`);
  }

  function handleDesktopSubmit(event: FormEvent) {
    event.preventDefault();
    searchOrNavigate(desktopQuery, searchDesktop);
    setDesktopQuery("");
    setIsDesktopSearchOpen(false);
  }

  function handleMobileSubmit(event: FormEvent) {
    event.preventDefault();
    searchOrNavigate(mobileQuery, searchMobile);
    setMobileQuery("");
    setIsMenuOpen(false);
  }

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "border-b border-white/10 bg-blue-dark/85 shadow-md backdrop-blur-md"
            : "bg-blue-dark"
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-6">
          <img
            src={logoSrc}
            alt={logoAlt}
            className="hidden h-12 w-auto shrink-0 md:block"
          />

          <nav className="hidden min-w-0 flex-1 flex-wrap items-center justify-end gap-x-3 gap-y-1 font-sans md:flex lg:gap-x-4">
            {headerNavLinks.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `relative shrink-0 pb-0.5 text-sm font-medium transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-white after:transition-all after:duration-300 ${
                    isActive
                      ? "text-white after:w-full"
                      : "text-white/75 after:w-0 hover:text-white hover:after:w-full"
                  }`
                }
              >
                <span className="flex items-center gap-2">{label}</span>
              </NavLink>
            ))}
          </nav>

          <div ref={desktopSearchRef} className="relative hidden shrink-0 md:block">
            <button
              type="button"
              onClick={() => setIsDesktopSearchOpen((open) => !open)}
              aria-expanded={isDesktopSearchOpen}
              aria-label={isDesktopSearchOpen ? "Fechar busca" : "Buscar projetos"}
              className="flex h-9 w-9 items-center justify-center rounded-full text-white/75 transition-colors duration-200 hover:bg-white/10 hover:text-white"
            >
              <MagnifyingGlass className="h-5 w-5" />
            </button>

            {isDesktopSearchOpen && (
              <div className="absolute right-0 top-full z-50 mt-2 w-80 rounded-lg bg-white p-3 shadow-xl ring-1 ring-black/5">
                <form onSubmit={handleDesktopSubmit}>
                  <Input
                    autoFocus
                    type="search"
                    value={desktopQuery}
                    onChange={(event) => setDesktopQuery(event.target.value)}
                    placeholder="Buscar projetos..."
                    aria-label="Buscar projetos"
                    aria-autocomplete="list"
                    aria-controls="desktop-search-suggestions"
                    autoComplete="off"
                  />
                </form>

                <div id="desktop-search-suggestions">
                  <SearchSuggestionsList
                    projects={desktopSuggestions}
                    variant="light"
                    onSelect={(id) => {
                      goToProject(id);
                      setDesktopQuery("");
                      setIsDesktopSearchOpen(false);
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            className="flex shrink-0 cursor-pointer flex-col gap-1.5 text-white md:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            <Icon svg={Menu} />
          </button>

          <img
            src={logoSrc}
            alt={logoAlt}
            className="h-10 w-auto shrink-0 md:hidden"
          />
        </div>
      </header>

      <div
        onClick={() => setIsMenuOpen(false)}
        className={`fixed top-16 left-0 right-0 bottom-0 z-30 md:hidden bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      <nav
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 z-40 flex flex-col border-r border-white/10 bg-blue-dark/95 font-sans backdrop-blur-md transition-transform duration-300 md:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Menu principal"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <span className="text-base font-semibold text-white">Menu</span>
          <button
            type="button"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Fechar menu"
            className="text-white/70 hover:text-white transition-colors duration-200"
          >
            <Icon svg={Arrowright} />
          </button>
        </div>

        <div className="border-b border-white/10 px-6 py-4">
          <form onSubmit={handleMobileSubmit}>
            <Input
              type="search"
              value={mobileQuery}
              onChange={(event) => setMobileQuery(event.target.value)}
              placeholder="Buscar projetos..."
              aria-label="Buscar projetos"
              aria-autocomplete="list"
              aria-controls="mobile-search-suggestions"
              autoComplete="off"
              className="w-full bg-white/10 text-white placeholder:text-white/60 border-white/20 focus-visible:ring-white/50"
            />
          </form>

          <div id="mobile-search-suggestions">
            <SearchSuggestionsList
              projects={mobileSuggestions}
              variant="dark"
              onSelect={(id) => {
                goToProject(id);
                setMobileQuery("");
                setIsMenuOpen(false);
              }}
            />
          </div>
        </div>

        {menuNavLinks.map(({ label, to, icon: IconSvg }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-4 border-b border-white/10 px-6 py-4 text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? "bg-white/10 text-white"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            {IconSvg && <Icon svg={IconSvg} className="fill-current" />}
            {label}
          </NavLink>
        ))}
      </nav>
    </>
  );
}
