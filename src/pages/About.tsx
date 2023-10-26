import { Project } from "../components/Project"
import SectionHeader from "../components/SectionHeader";
import ToolBox from "../components/ToolBox";
import projects from "../ProjectsJson.json";

export function About() {

  return (
    <div className="page">

      {/* about */}
      <section className="section-content">
        <SectionHeader title="About me" />
        <div className="section-text">
          <div className="text-neutral-200">
            Hello! My name is Kyle and I'm a software developer. Before attending college I was in a tech camp TechX (X Academy)
            where I realized how much meaningful impact technologies can make. As a complete beginner, I was, of course, given a quick intro to how I can make things fail in a million ways,
            but I fell in love with the feeling when I solved the problems and the process of doing so.
          </div>
          <br />
          <div className="text-neutral-200">
            Years passed by I've crunched up knowledge in computer science fundamentals (dsa, pl, os, dbs), web systems, ML, data mining, etc., connected the dots together,
            able to solve problems across the stack.
            And I learned a lot in IT resource and product management.
          </div>
          <br />
          <div className="text-neutral-200">
            I've always had a good attitude in learning new things and I'm constantly developing.
            In my free time I enjoy contributing to open source, cooking, outdoors, music. I also have a pretty decent tennis game.
          </div>
          <br />
          <div className="text-neutral-200">
            Feel free to reach out if any of my projects interests you, looking for an engineer for your team,
            or discuss new opportunities.
          </div>
          <br />
        </div>
      </section>
      {/* timeline */}
      <section className="section-content">
        <SectionHeader title="I've been..." />
        
        <div className="timeline">
          <div className="timeline-item timeline-right project">
            <Project project={projects.tie.projectDetail} />
          </div>
          <div className="timeline-item timeline-left project">
            <Project project={projects.flexswarm.projectDetail} />
          </div>
          <div className="timeline-item timeline-left experience">
            <div className="exp-card " >
              <header className="title">
                <div>
                  Summer Blockchain Researcher
                </div>
                <span className="range">
                  Summer 2022
                </span>
                <a href="https://rcos.io/"> @ RPI IDEA</a>
              </header>
              <img src="/rpi-idea.webp" />
              <div className="exp-description">
                Researched on decentralized knowledge graph and its application in ml system workflows, specifically
                vision and recommender systems.
              </div>
            </div>
          </div>
          <div className="timeline-item timeline-right project">
            <Project project={projects.pokemonbattles.projectDetail} />
          </div>
          <div className="timeline-item timeline-left experience">
            <div className="exp-card" >
              <header className="title">
                <div>
                  Software Developer
                </div>
                <span className="range">
                  2020 - 2022
                </span>
                <a href="https://rcos.io/"> @ Rensselaer Center of Open Source</a>
              </header>
              <div className="links"></div>
              <img src="/rcos.png" />
            </div>
          </div>
          <div className="timeline-item timeline-right project">
            <Project project={projects.yacs.projectDetail} />
          </div>
          <div className="timeline-item timeline-right project">
            <Project project={projects.cssaw.projectDetail} />
          </div>
        </div>
      </section>

      {/* toolbox */}
      <section className="section-content">
        <SectionHeader title="I've used : " />
        <ToolBox/>
      </section>
    </div>

  )
}
