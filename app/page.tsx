import ProfileSection from './components/ProfileSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';

export default function HomePage() {
  return (
    <>
      <div id="profile" className="scroll-mt-24">
        <ProfileSection />
      </div>
      <div id="skills" className="scroll-mt-24">
        <SkillsSection />
      </div>
      <div id="projects" className="scroll-mt-24">
        <ProjectsSection />
      </div>
    </>
  );
}
