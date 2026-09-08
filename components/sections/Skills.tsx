import SectionHeading from "@/components/ui/SectionHeading";
import SkillGroup from "@/components/ui/SkillGroup";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";
import { skillCategories } from "@/data/skills";

export default function Skills() {
  return (
    <section id="skills" aria-label="Operations & Controls toolkit" className="bg-card py-24 sm:py-28">
      <div className="page-container">
        <SectionHeading
          eyebrow="Toolkit"
          title="Operations & Controls toolkit"
          description="Grouped capabilities built through hands-on workflow work — validated by what I do, not by percentage bars."
        />

        <StaggerContainer
          className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          stagger={0.08}
        >
          {skillCategories.map((category) => (
            <StaggerItem
              key={category.title}
              className={category.wide ? "md:col-span-2 lg:col-span-2" : "h-full"}
            >
              <SkillGroup category={category} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}