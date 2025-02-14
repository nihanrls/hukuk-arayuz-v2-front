"use client";

import React, { useState, useEffect } from 'react';
import styles from './faq.module.css';
import { faqGroups } from './faqData';

const FAQ: React.FC = () => {
  const [visibleContent, setVisibleContent] = useState<{ [key: string]: boolean }>({});
  const [activeSection, setActiveSection] = useState('genel');

  const toggleContent = (id: string) => {
    setVisibleContent(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const scrollToSection = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      setActiveSection(id);
    }
  };

  // Scroll pozisyonunu takip et
  useEffect(() => {
    const handleScroll = () => {
      const sections = faqGroups.map(group => ({
        id: group.id,
        element: document.getElementById(group.id)
      }));

      const currentSection = sections.find(section => {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className={styles.faq}>
      <ul className={styles.categories}>
        <div className={styles.verticalLine}></div>
        {faqGroups.map((group) => (
          <li key={group.id}>
            <a 
              href={`#${group.id}`}
              className={activeSection === group.id ? styles.selected : ''}
              onClick={(e) => scrollToSection(group.id, e)}
            >
              {group.title}
            </a>
          </li>
        ))}
      </ul>

      <div className={styles.faqItems}>
        {faqGroups.map((group) => (
          <div 
            key={group.id} 
            id={group.id}
            className={styles.faqGroup}
          >
            <div className={styles.faqTitle}>
              <div className={styles.iconh2div}>
                {group.icon && (
                  <div className={styles.icondiv}>
                    <img src={group.icon} alt={`${group.title} icon`} height="70" width="70"/>
                  </div>
                )}
                <div className={styles.h2div}>
                  <h2>{group.title}</h2>
                </div>
              </div>
            </div>

            <ul>
              {group.items.map((item, index) => (
                <li 
                  key={`${group.id}-${index}`}
                  className={visibleContent[`${group.id}-${index}`] ? styles.contentVisible : ''}
                >
                  <a
                    href="#0"
                    className={styles.trigger}
                    onClick={(e) => {
                      e.preventDefault();
                      toggleContent(`${group.id}-${index}`);
                    }}
                  >
                    {item.question}
                  </a>
                  <div 
                    className={styles.faqContent}
                    style={{
                      display: visibleContent[`${group.id}-${index}`] ? 'block' : 'none'
                    }}
                  >
                    <p>{item.answer}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
