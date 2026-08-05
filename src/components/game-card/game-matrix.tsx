"use client";

import { motion, useReducedMotion } from "framer-motion";
import { caseStudies, matrixGames } from "@/data/games";
import { fadeUp, reduced, spring, staggerContainer } from "@/lib/motion";
import { GameCard } from "./game-card";

export function GameMatrix() {
  const reduce = useReducedMotion();
  const projects = [...matrixGames, ...caseStudies];

  return (
    <section id="games" className="border-b-2 border-charcoal px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={reduce ? undefined : staggerContainer}
          initial={reduce ? undefined : "hidden"}
          whileInView={reduce ? undefined : "visible"}
          viewport={{ once: true, margin: "-80px" }}
          className="mb-10 max-w-2xl"
        >
          <motion.p
            variants={reduce ? undefined : fadeUp}
            className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-coral"
          >
            Primary Matrix
          </motion.p>
          <motion.h2
            variants={reduce ? undefined : fadeUp}
            className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Games you play with your body.
          </motion.h2>
          <motion.p
            variants={reduce ? undefined : fadeUp}
            className="mt-3 text-base leading-relaxed text-charcoal/80"
          >
            Asymmetric showcase of live browser AR and CV titles. On desktop,
            scan a QR. On mobile, tap straight into the camera.
          </motion.p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              className={i % 3 === 1 ? "md:mt-10" : i % 3 === 2 ? "md:-mt-4" : ""}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={reduce ? reduced : { ...spring, delay: i * 0.05 }}
            >
              <GameCard project={project} index={i} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
