import React, { useState } from "react";
import styles from './Projects.module.css'

import { Link as LinkIcon } from '../../Icons'
import { Github as GithubIcon } from '../../Icons/Logos'


const categories = [
    {
        name: "Frontend",
        projects: [
            {
                title: "Réservation de billets d'entrée au stade Front-End",
                description: "Une application web moderne pour la réservation de billets de stade. Elle présente une interface intuitive et un processus de réservation transparent.",
                techs: ["HTML5", "CSS3", "JAVASCRIPT"],
                liveLink: "#",
                githubLink: "#"
            },
            {
                title: "Platforme d'e-commerce",
                description: "Solution de commerce électronique entièrement responsive avec catalogue de produits, panier d'achat et processus de paiement sécurisé.",
                techs: ["REACT", "NODE", "MONGODB"],
                liveLink: "#",
                githubLink: "#"
            },
            {
                title: "Platforme d'e-commerce",
                description: "Solution de commerce électronique entièrement responsive avec catalogue de produits, panier d'achat et processus de paiement sécurisé.",
                techs: ["REACT", "NODE", "MONGODB"],
                liveLink: "#",
                githubLink: "#"
            },
            
        ]
    },
    {
        name: "Backend",
        projects: [
            {
                title: "Réservation de billets d'entrée au stade Front-End",
                description: "Une application web moderne pour la réservation de billets de stade. Elle présente une interface intuitive et un processus de réservation transparent.",
                techs: ["HTML5", "CSS3", "JAVASCRIPT"],
                liveLink: "#",
                githubLink: "#"
            },
            {
                title: "Platforme d'e-commerce",
                description: "Solution de commerce électronique entièrement responsive avec catalogue de produits, panier d'achat et processus de paiement sécurisé.",
                techs: ["REACT", "NODE", "MONGODB"],
                liveLink: "#",
                githubLink: "#"
            },
        ]
    },
    {
        name: "Autre projets",
        projects: [/* ... */]
    },
    // Ajoutez d'autres catégories selon vos besoins
];


function Projects() {
    return (
        <section className={styles.section}>
            <h2 className={styles.mainTitle}>Mes Derniers Projets</h2>
            {categories.map((category, index) => (
                <CategorySection key={index} category={category} />
            ))}
        </section>
    );
}



function ProjectCard({ title, description, techs, image, liveLink, githubLink }) {
    return (
        <div className={styles.projectCard}>
            <div className={styles.projectImageContainer}>
                {/* <img src={image} alt={title} className={styles.projectImage} /> */}
                <div className={styles.projectOverlay}>
                    <h4 className={styles.projectTitle}>{title}</h4>
                    <p className={styles.projectDescription}>{description}</p>
                    <div className={styles.projectTechs}>
                        {techs.map((tech, index) => (
                            <span key={index} className={styles[tech.toLowerCase()]}>{tech}</span>
                        ))}
                    </div>
                </div>
            </div>
            <div className={styles.projectActions}>
                <a href={liveLink} className={styles.projectButton}>Live Demo</a>
                <a href={githubLink} className={styles.projectButton}>GitHub</a>
            </div>
        </div>
    );
}


function CategorySection({ category }) {
    return (
        <div className={styles.categorySection}>
            <h3 className={styles.categoryTitle}>{category.name}</h3>
            <div className={styles.projectsGrid}>
                {category.projects.map((project, index) => (
                    <ProjectCard key={index} {...project} />
                ))}
            </div>
        </div>
    );
}

export default Projects