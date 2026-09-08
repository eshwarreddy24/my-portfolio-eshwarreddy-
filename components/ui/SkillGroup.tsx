import type { SkillCategory } from "@/data/skills";
import { Icon } from "./icons";

export default function SkillGroup({ category }: { category: SkillCategory }) {
  return (
    <div className="group h-full rounded-2xl border border-line bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-card-hover sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex size-11 items-center justify-center rounded-xl bg-accent-soft text-accent-deep">
            <Icon name={category.icon} className="size-5" />
          </div>
          <h3 className="mt-4 font-display text-lg font-semibold text-ink">
            {category.title}
          </h3>
          <p className="mt-1 text-sm text-ink-faint">{category.description}</p>
        </div>
      </div>
      <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${category.title} skills`}>
        {category.skills.map((skill) => (
          <li key={skill}>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-1 text-[0.82rem] text-ink-soft">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-accent/60" />
              {skill}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}