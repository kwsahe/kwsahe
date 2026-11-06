import { describe, it, expect } from "vitest";
import {
  PROJECTS_DATA,
  PROFILE_DATA,
  EXPERIENCE_DATA,
  EDUCATION_DATA,
  CERTIFICATES_DATA,
  SKILL_GROUPS,
  getProjectBySlug,
  getFeaturedProjects,
} from "@/data/portfolio-data";
import { LAB_SYSTEMS, getLabSystemById } from "@/data/architecture-lab-data";
import { assetPath, BASE_PATH } from "@/lib/utils";
import fs from "fs";
import path from "path";

describe("PORTFOLIO 3D REBORN — Verified Data Integrity", () => {
  it("contains all 14 verified projects from the repository", () => {
    expect(PROJECTS_DATA.length).toBe(14);

    const expectedSlugs = [
      "link21-ai-jarvis-office",
      "link21-ai-hub",
      "link21-bidpilot-ai",
      "link21-premium",
      "tri-agent-control",
      "market-pulse",
      "k-safety-law-rag",
      "link21-ai-chatbot",
      "business-card-auto",
      "construction-accident-vl-agent",
      "O2O-demand-forecasting-solution",
      "ecommerce-data-analysis-practice",
      "english-word-streamlit",
      "Artesia",
    ];

    for (const slug of expectedSlugs) {
      const p = getProjectBySlug(slug);
      expect(p, `Missing project: ${slug}`).toBeDefined();
      expect(p?.title.ko.length).toBeGreaterThan(3);
      expect(p?.title.en.length).toBeGreaterThan(3);
      expect(p?.caseStudy.overview.ko.length).toBeGreaterThan(10);
      expect(p?.caseStudy.problem.ko.length).toBeGreaterThan(10);
      expect(p?.caseStudy.verification.length).toBeGreaterThan(0);
    }
  });

  it("verifies that every screenshot slide and resume PDF exists in public/", () => {
    const publicDir = path.resolve(process.cwd(), "public");
    const resumeFile = path.join(
      publicDir,
      PROFILE_DATA.resumePdf.replace(/^\//, "")
    );
    expect(fs.existsSync(resumeFile), "Missing resume PDF").toBe(true);

    const avatarFile = path.join(
      publicDir,
      PROFILE_DATA.avatar.replace(/^\//, "")
    );
    expect(fs.existsSync(avatarFile), "Missing profile avatar").toBe(true);

    for (const project of PROJECTS_DATA) {
      expect(project.slides.length).toBeGreaterThan(0);
      for (const slide of project.slides) {
        const diskPath = path.join(publicDir, slide.src.replace(/^\//, ""));
        expect(
          fs.existsSync(diskPath),
          `Missing screenshot on disk for ${project.slug}: ${slide.src}`
        ).toBe(true);
      }
    }
  });

  it("does not expose private GitHub repository links for private enterprise projects", () => {
    const privateSlugs = [
      "link21-premium",
      "link21-ai-hub",
      "link21-ai-chatbot",
      "link21-bidpilot-ai",
      "link21-ai-jarvis-office",
      "business-card-auto",
    ];
    for (const slug of privateSlugs) {
      const proj = getProjectBySlug(slug);
      expect(proj?.isPrivateRepo).toBe(true);
      const githubLinks = proj?.links.filter((l) => l.type === "github") ?? [];
      expect(githubLinks.length).toBe(0);
    }
  });

  it("preserves exact verified engineering metrics for JARVIS, BidPilot, TriAgent, AI Hub, Market Pulse, and K-Safety", () => {
    const jarvis = getProjectBySlug("link21-ai-jarvis-office")!;
    expect(JSON.stringify(jarvis)).toContain("873");
    expect(JSON.stringify(jarvis)).toContain("252");
    expect(JSON.stringify(jarvis)).toContain("279초");

    const bidpilot = getProjectBySlug("link21-bidpilot-ai")!;
    expect(JSON.stringify(bidpilot)).toContain("2,659");
    expect(JSON.stringify(bidpilot)).toContain("188/191");

    const tri = getProjectBySlug("tri-agent-control")!;
    expect(JSON.stringify(tri)).toContain("384");
    expect(JSON.stringify(tri)).toContain("106");

    const aihub = getProjectBySlug("link21-ai-hub")!;
    expect(aihub.status).toBe("Live Production");
    expect(JSON.stringify(aihub)).toContain("515");

    const mp = getProjectBySlug("market-pulse")!;
    expect(JSON.stringify(mp)).toContain("57,690");
    expect(JSON.stringify(mp)).toContain("0.78");

    const ks = getProjectBySlug("k-safety-law-rag")!;
    expect(JSON.stringify(ks)).toContain("90.0");
    expect(JSON.stringify(ks)).toContain("41");
  });

  it("provides 6 verified Architecture Lab systems with complete node/edge definitions", () => {
    expect(LAB_SYSTEMS.length).toBe(6);
    for (const sys of LAB_SYSTEMS) {
      expect(sys.nodes.length).toBeGreaterThanOrEqual(3);
      expect(sys.edges.length).toBeGreaterThanOrEqual(2);
      expect(getLabSystemById(sys.id).id).toBe(sys.id);
    }
  });

  it("maps every skill in SKILL_GROUPS to valid project slugs", () => {
    expect(SKILL_GROUPS.length).toBe(4);
    for (const group of SKILL_GROUPS) {
      for (const skill of group.skills) {
        expect(skill.relatedProjects.length).toBeGreaterThan(0);
        for (const slug of skill.relatedProjects) {
          expect(getProjectBySlug(slug), `Invalid project slug ${slug}`).toBeDefined();
        }
      }
    }
  });

  it("correctly prefixes asset paths with /kwsahe basePath", () => {
    expect(assetPath("/png/profile-photo.png")).toBe(
      `${BASE_PATH}/png/profile-photo.png`
    );
    expect(assetPath("./assets/resume-kwon-sangheon.pdf")).toBe(
      `${BASE_PATH}/assets/resume-kwon-sangheon.pdf`
    );
    expect(assetPath("https://www.link21premium.com/")).toBe(
      "https://www.link21premium.com/"
    );
  });

  it("returns 6 featured projects sorted by featuredOrder", () => {
    const featured = getFeaturedProjects();
    expect(featured.length).toBe(6);
    expect(featured[0].slug).toBe("link21-ai-jarvis-office");
    expect(featured[1].slug).toBe("link21-ai-hub");
  });

  it("includes verified experience, education, and 4 certificates", () => {
    expect(EXPERIENCE_DATA.length).toBe(2);
    expect(EDUCATION_DATA.length).toBe(3);
    expect(CERTIFICATES_DATA.length).toBe(4);
  });
});
