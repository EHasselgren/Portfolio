export interface Skill {
  text: string;
  isPopping: boolean;
  isVisible: boolean;
  isAnimatingIn?: boolean;
}

export interface SkillCardProps {
  title: string;
  skills: string[];
  delay?: number;
}

