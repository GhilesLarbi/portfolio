import React, { useState } from "react";
import styles from './Projects.module.css'

import {Link as LinkIcon } from '../../Icons'
import {Github as GithubIcon} from '../../Icons/Logos'

function ProjectCard({ title, description, techs, liveLink, githubLink }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className={`${styles.project} ${isHovered ? styles.project_hovered : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={styles.project__img_container}>
                <div className={styles.project__img_header}>
                    <div className={styles.project__img_header_circle}></div>
                    <div className={styles.project__img_header_circle}></div>
                    <div className={styles.project__img_header_circle}></div>
                </div>
                <div className={styles.project__img_content}></div>
            </div>

            <div className={styles.project__info}>
                <a className={styles.project__title} href={liveLink}>
                    <span>{title}</span>
                    <LinkIcon className={styles.link_icon} />
                </a>
                <p className={styles.project__description}>{description}</p>
                <div className={styles.project__techs}>
                    {techs.map((tech, index) => (
                        <span key={index} className={styles[tech.toLowerCase()]}>{tech}</span>
                    ))}
                </div>

                <div className={styles.project__actions}>
                    <button className={styles.project__main_btn}>
                        <span>LIVE</span>
                        <LinkIcon />
                    </button>

                    <button className={styles.project__second_btn}>
                        <span>GITHUB</span>
                        <GithubIcon />
                    </button>
                </div>
            </div>
        </div>
    )
}



function Projects() {
    const projects = [
        {
            title: "Stadium ticket reservation Front-end",
            description: "A modern web application for stadium ticket reservations. Features an intuitive UI and seamless booking process.",
            techs: ["HTML5", "CSS3", "JAVASCRIPT"],
            liveLink: "#",
            githubLink: "#"
        },
        {
            title: "E-commerce Platform",
            description: "Fully responsive e-commerce solution with product catalog, shopping cart, and secure checkout process.",
            techs: ["REACT", "NODE", "MONGODB"],
            liveLink: "#",
            githubLink: "#"
        },
        {
            title: "E-commerce Platform",
            description: "Fully responsive e-commerce solution with product catalog, shopping cart, and secure checkout process.",
            techs: ["REACT", "NODE", "MONGODB"],
            liveLink: "#",
            githubLink: "#"
        },
        {
            title: "E-commerce Platform",
            description: "Fully responsive e-commerce solution with product catalog, shopping cart, and secure checkout process.",
            techs: ["REACT", "NODE", "MONGODB"],
            liveLink: "#",
            githubLink: "#"
        }
    ];

    return (
        <section className={styles.section}>
            <p className={styles.title}>
                <span>My Latest Projects</span>
            </p>

            <div className={styles.projects}>
                {projects.map((project, index) => (
                    <ProjectCard key={index} {...project} />
                ))}
            </div>
        </section>
    )
}

export default Projects