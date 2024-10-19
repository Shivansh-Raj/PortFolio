import React from 'react'
import Cyberline from './Cyberline'
import "../styles/project.css"
import projectImg1 from "../assets/img/dQuora.png"
import projectImg2 from "../assets/img/handtracking_mouse.png"
import projectImg3 from "../assets/img/typing_tester.png"
import projectImg4 from "../assets/img/NetVision2.png"
function Projects() {
    const projects = [
        {
            title:'NetVision',
            description:'Netflix UI Clone with Integrated ML Recommendations',
            url:projectImg4,
            link:"https://github.com/Shivansh-Raj/NetVision"
        },
        {
            title:'Interactive Q&A Platform',
            description:'Full Stack web-development',
            url:projectImg1,
            link:"https://github.com/Shivansh-Raj/dQuora"
        },
        {
            title:'Handtracking Mouse',
            description:'OpenCV knowledge Showcase',
            url:projectImg2,
            link:"https://github.com/Shivansh-Raj/Handtracking-Mouse"
        },
        {
            title:'Typing Speed test App',
            description:'Frontend development',
            url:projectImg3,
            link:"https://github.com/Shivansh-Raj/TypingSpeedCalculator"
        }
    ]
  return (
    <section className='project-section'>
        <h3 className='project-heading'>Projects</h3>
        <Cyberline/>
        <div className="project-container ">
            {projects.map((project,index)=>{
                return(
                    <div className='project-item'  key={index}>
                        <div className='project-inner'>
                            <h5> {project.title}</h5>
                            <div className="image-container">
                                <a href={project.link} target='_blank'><img src={project.url} /></a>
                            </div>
                            <h4>00{index+1}</h4>
                        </div>
                        <Cyberline/>
                    </div>
                )
            })}
        </div>
    </section>
  )
}

export default Projects