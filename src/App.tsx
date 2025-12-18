import { useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowRight, Github, Gitlab, Linkedin, Mail, Send, SendHorizontal } from "lucide-react"
import { useTranslation } from "react-i18next"
import { LanguageSwitcher } from "@/components/language-switcher"
import { TypewriterText } from "@/components/typewriter-text"
import { Snowfall } from "@/components/snowfall"

function App() {
  useEffect(() => {
    AOS.init({
      duration: 650,
      easing: "ease-out-cubic",
      once: true,
      offset: 70,
    })
  }, [])

  const { t } = useTranslation()
  const projects = t("projects.items", { returnObjects: true }) as Array<{
    title: string
    desc: string
    tags: string[]
    imageSrc?: string
    demoUrl?: string
    codeUrl?: string
  }>

  return (
    <div className="min-h-dvh bg-[radial-gradient(60rem_60rem_at_10%_-20%,hsl(var(--primary)/0.10),transparent_60%),radial-gradient(45rem_45rem_at_110%_10%,hsl(var(--ring)/0.12),transparent_55%)]">
      <Snowfall intensity={0.6} />
      <header className="sticky top-0 z-10 border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/50">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <a href="#top" className="group inline-flex items-center gap-2 font-semibold tracking-tight">
            <span className="grid h-8 w-8 place-items-center rounded-lg border bg-card text-sm shadow-sm transition group-hover:shadow">
              M
            </span>
            <span>Mukhammaddiyor.dev</span>
          </a>

          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a className="hover:text-foreground" href="#about">
              {t("nav.about")}
            </a>
            <a className="hover:text-foreground" href="#projects">
              {t("nav.projects")}
            </a>
            <a className="hover:text-foreground" href="#contact">
              {t("nav.contact")}
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
              <a href="#contact">{t("nav.hireMe")}</a>
            </Button>
          </div>
        </div>
      </header>

      <main id="top" className="mx-auto max-w-6xl px-4 py-10">
        <section className="relative grid items-center gap-10 md:grid-cols-2 md:gap-12">
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">React</Badge>
              <Badge variant="secondary">NextJs</Badge>
              <Badge variant="secondary">TypeScript</Badge>
              <Badge variant="secondary">Tailwind</Badge>
              <Badge variant="secondary">shadcn/ui</Badge>
              <Badge variant="secondary">Hero/ui</Badge>
              <Badge variant="secondary">Context API</Badge>
              <Badge variant="secondary">Redux</Badge>
              <Badge variant="secondary">Redux Toolkit</Badge>
              <Badge variant="secondary">JavaScript</Badge>
              <Badge variant="secondary">Astro</Badge>
              <Badge variant="secondary">Strapi</Badge>
              <Badge variant="secondary">Git</Badge>
              <Badge variant="secondary">GitHub</Badge>
              <Badge variant="secondary">GitLab</Badge>
            </div>

            <div className="flex items-center gap-3" data-aos="fade-up">
              <div className="relative">
                <div className="pointer-events-none absolute -inset-1 rounded-full bg-gradient-to-tr from-primary/30 via-transparent to-ring/30 blur-sm" />
                <Avatar className="h-12 w-12 border bg-card shadow-sm">
                  <AvatarImage src="/MyImg.jpg" alt="Muhammad Diyor" />
                  <AvatarFallback>MD</AvatarFallback>
                </Avatar>
              </div>
              <div className="text-sm">
                <div className="font-medium leading-none">Mukhammaddiyor</div>
                <div className="text-muted-foreground">Frontend Developer</div>
              </div>
            </div>

            <h1
              className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl"
              data-aos="fade-up"
              data-aos-delay="80"
            >
              <TypewriterText text={t("hero.title")} />
            </h1>
            <p
              className="text-pretty text-muted-foreground"
              data-aos="fade-up"
              data-aos-delay="140"
            >
              {t("hero.subtitle")}
            </p>

            <div
              className="flex flex-wrap items-center gap-3"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <Button asChild className="group">
                <a href="#projects">
                  {t("cta.seeProjects")}
                  <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-0.5" />
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href="#contact">{t("cta.contact")}</a>
              </Button>

              <div className="flex items-center gap-2 sm:ml-2">
                <Button asChild variant="ghost" size="icon" aria-label="GitHub">
                  <a
                    href="https://github.com/MuhammaddiyorDevv"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  aria-label="Telegram"
                >
                  <a
                    href="https://t.me/omukhammaddiyor"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <SendHorizontal className="h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="ghost" size="icon" aria-label="GitLab">
                  <a
                    href="https://gitlab.com/MuhammaddiyorDevv"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Gitlab className="h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="ghost" size="icon" aria-label="LinkedIn">
                  <a
                    href="https://www.linkedin.com/in/mukhammaddiyor-odiljonov-0ab499381/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="ghost" size="icon" aria-label="Email">
                  <a href="mailto:muhammaddiyorodiljonov0207@gmail.com">
                    <Mail className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <Card className="relative overflow-hidden" data-aos="fade-left">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(40rem_18rem_at_50%_0%,hsl(var(--primary)/0.12),transparent_60%)]" />
            <CardHeader>
              <CardTitle>{t("quick.title")}</CardTitle>
              <CardDescription>{t("quick.desc")}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">{t("quick.location")}</span>
                <span>Uzbekistan, Tashkent</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">{t("quick.role")}</span>
                <span>Frontend Developer</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">{t("quick.stack")}</span>
                <span>ReactJs, NextJs, TypeScript, Tailwind</span>
      </div>
            </CardContent>
            <CardFooter className="gap-2">
              <Button asChild size="sm" variant="secondary">
                <a
                  href="https://github.com/MuhammaddiyorDevv"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </a>
              </Button>
              <Button asChild size="sm" variant="secondary">
                <a
                  href="https://t.me/omukhammaddiyor"
                  target="_blank"
                  rel="noreferrer"
                >
                  <SendHorizontal className="mr-2 h-4 w-4" />
                  Telegram
                </a>
              </Button>
              <Button asChild size="sm" variant="secondary">
                <a
                  href="https://gitlab.com/MuhammaddiyorDevv"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Gitlab className="mr-2 h-4 w-4" />
                  GitLab
                </a>
              </Button>
            </CardFooter>
          </Card>
        </section>

        <section id="about" className="mt-14 scroll-mt-20 space-y-4" data-aos="fade-up">
          <h2 className="text-2xl font-semibold tracking-tight">{t("sections.aboutTitle")}</h2>
          <p className="max-w-3xl text-muted-foreground">{t("sections.aboutText")}</p>
        </section>

        <section id="projects" className="mt-14 scroll-mt-20 space-y-6" data-aos="fade-up">
          <div className="flex items-end justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">{t("sections.projectsTitle")}</h2>
              <p className="text-sm text-muted-foreground">
                {t("sections.projectsSubtitle")}
        </p>
      </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, idx) => (
              <Card
                key={p.title}
                className="group flex flex-col transition hover:-translate-y-0.5 hover:shadow-lg"
                data-aos="fade-up"
                data-aos-delay={(idx % 6) * 60}
              >
                <div className="relative aspect-[16/9] overflow-hidden rounded-t-xl border-b bg-muted">
                  {p.imageSrc ? (
                    <img
                      src={p.imageSrc}
                      alt={p.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                      onError={(e) => {
                        ;(e.currentTarget as HTMLImageElement).style.display = "none"
                      }}
                    />
                  ) : null}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-background/0 to-background/0" />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{p.title}</CardTitle>
                  <CardDescription>{p.desc}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Badge key={t} variant="outline">
                      {t}
                    </Badge>
                  ))}
                </CardContent>
                <CardFooter className="gap-2">
                  <Button asChild size="sm" variant="secondary" className="group">
                    <a
                      href={p.demoUrl ?? "#"}
                      target="_blank"
                      rel="noreferrer"
                      aria-disabled={!p.demoUrl}
                      className={!p.demoUrl ? "pointer-events-none opacity-60" : undefined}
                    >
                      {t("projects.demo")}
                      <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-0.5" />
                    </a>
                  </Button>
                  <Button asChild size="sm" variant="outline">
                    <a
                      href={p.codeUrl ?? "#"}
                      target="_blank"
                      rel="noreferrer"
                      aria-disabled={!p.codeUrl}
                      className={!p.codeUrl ? "pointer-events-none opacity-60" : undefined}
                    >
                      {t("projects.code")}
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <section id="contact" className="mt-14 scroll-mt-20" data-aos="fade-up">
          <Card className="max-w-2xl overflow-hidden">
            <div className="pointer-events-none h-1 w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            <CardHeader>
              <CardTitle>{t("sections.contactTitle")}</CardTitle>
              <CardDescription>
                {t("sections.contactSubtitle")}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="name">
                  {t("form.name")}
                </label>
                <Input id="name" placeholder={t("form.namePlaceholder")} />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="email">
                  {t("form.email")}
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t("form.emailPlaceholder")}
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="message">
                  {t("form.message")}
                </label>
                <Textarea id="message" placeholder={t("form.messagePlaceholder")} />
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <Button asChild className="group">
                <a
                  href="https://t.me/omukhammaddiyor"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Send className="mr-2 h-4 w-4" />
                  {t("form.send")}
                </a>
              </Button>
            </CardFooter>
          </Card>

          <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2 rounded-md border bg-card px-3 py-1.5">
              <Mail className="h-4 w-4" />
              <span className="font-medium text-foreground">{t("meta.emailLabel")}</span>
              <a className="hover:text-foreground" href="mailto:muhammaddiyorodiljonov0207@gmail.com">
                mukhammaddiyor.dev@gmail.com
              </a>
            </span>
          </div>
        </section>

        <footer className="mt-16 border-t py-8 text-sm text-muted-foreground">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} Mukhammaddiyor. {t("footer.rights")}
            </p>
            <div className="flex gap-4">
              <a className="hover:text-foreground" href="#top">
                {t("footer.backToTop")}
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}

export default App
