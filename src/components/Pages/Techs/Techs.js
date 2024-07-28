import React, { useState } from 'react'
import styles from './Techs.module.css';

import { Home as HomeIcon } from "../../Icons/";
import { Projects as ProjectsIcon } from "../../Icons/";
import { Techs as TechsIcon } from "../../Icons/";
import { About as AboutIcon } from "../../Icons/";
import { Contact as ContactIcon } from "../../Icons/";
import { Experience as ExperienceIcon } from "../../Icons/";



const skillsData = [
    {
        name: 'Frontend', skills: [
            { name: 'HTML5', icon: HomeIcon, level: 99 },
            { name: 'CSS3', icon: ProjectsIcon, level: 99 },
            { name: 'JavaScript', icon: TechsIcon, level: 99 },
            { name: 'React', icon: AboutIcon, level: 88 },
        ]
    },
    {
        name: 'Backend', skills: [
            { name: 'Node.js', icon: ContactIcon, level: 97 },
            { name: 'Python', icon: ExperienceIcon, level: 97 },
        ]
    },
    {
        name: 'Autres', skills: [
            { name: 'Lua', icon: HomeIcon, level: 79 },
            { name: 'Bash Script', icon: ProjectsIcon, level: 85 },
            { name: 'Linux CLI', icon: TechsIcon, level: 100 },
            { name: 'Docker', icon: ExperienceIcon, level: 89 },
        ]
    },
];


function SkillCard({ skill }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={styles.skillCard}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            // style={{boxShadow: isHovered?  `0 0 5rem rgba(88, 181, 211, 0.1)` : 'none'}}
        >
            <skill.icon className={styles.skillIcon} />
            <h3>{skill.name}</h3>
            <div className={styles.skillBar}>
                <div
                    className={styles.skillLevel}
                    style={{ width: `${isHovered ? skill.level : 0}%` }}
                />
            </div>
        </div>
    );
}


function SkillCategory({ category }) {
    return (
        <div className={styles.skillCategory}>
            <h2>{category.name}</h2>
            <div className={styles.skillGrid}>
                {category.skills.map((skill) => (
                    <SkillCard key={skill.name} skill={skill} />
                ))}
            </div>
        </div>
    );
}

function Techs() {
    return (
        <section className={styles.skillsSection}>
            <h1 className={styles.mainTitle}>Mes Compétences Techniques</h1>
            {skillsData.map((category) => (
                <SkillCategory key={category.name} category={category} />
            ))}
        </section>
    );
}

export default Techs