"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  matrixGames,
  projectGroups,
} from "@/data/games";
import { fadeUp, reduced, spring, staggerContainer } from "@/lib/motion";
import { GameCard } from "./game-card";

export interface LiveProjectStatus {
  state: "operational" | "degraded";
  checkedAt: string;
}

export function GameMatrix() {
  const reduce = useReducedMotion();
  const [statuses, setStatuses] = useState<Record<string, LiveProjectStatus>>({});
  let cardIndex = 0;
  const flagshipIds = new Set(["jiku-fitness", "ar-baseball"]);
  const supportingProjects = matrixGames.filter(
    (project) => !flagshipIds.has(project.id),
  );

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/project-status", { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data: { projects?: Record<string, LiveProjectStatus> }) => {
        if (data.projects) setStatuses(data.projects);
      })
      .catch(() => {
        // Status is supporting evidence; a failed check must not block launch.
      });
    return () => controller.abort();
  }, []);

  return (
    <section id="games" className="border-b-2 border-charcoal px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={reduce ? undefined : staggerContainer}
          initial={reduce ? undefined : "hidden"}
          whileInView={reduce ? undefined : "visible"}
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <motion.p
              variants={reduce ? undefined : fadeUp}
              className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-coral"
            >
              Platform breadth · {supportingProjects.length} more products
            </motion.p>
            <motion.h2
              variants={reduce ? undefined : fadeUp}
              className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              The platform generalizes.
            </motion.h2>
            <motion.p
              variants={reduce ? undefined : fadeUp}
              className="mt-3 text-base leading-relaxed text-charcoal/80"
            >
              Tennis, slicing, pickleball, ASL, and a one-input arcade show the
              same product instincts across different inputs: quick starts,
              readable feedback, recoverable state, and a respect for the
              device frame budget.
            </motion.p>
          </div>
          <motion.div
            variants={reduce ? undefined : fadeUp}
            className="hidden shrink-0 rotate-2 border-2 border-charcoal bg-ochre px-3 py-2 font-mono text-[0.65rem] uppercase tracking-wide sticker-sm md:block"
          >
            Five products · one interaction thesis
          </motion.div>
        </motion.div>

        <div className="flex flex-col gap-16">
          {projectGroups.map((group) => {
            const projects = supportingProjects.filter(
              (project) => project.group === group.id,
            );
            if (projects.length === 0) return null;

            return (
              <div key={group.id} id={group.id}>
                <div className="mb-6 max-w-2xl">
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-cobalt">
                    {group.label}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/75 sm:text-base">
                    {group.description}
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 md:gap-8">
                  {projects.map((project, i) => {
                    const index = cardIndex++;
                    return (
                      <motion.div
                        key={project.id}
                        className={
                          i % 3 === 1 ? "md:mt-12" : i % 3 === 2 ? "md:mt-4" : ""
                        }
                        initial={reduce ? false : { opacity: 0, y: 28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={
                          reduce ? reduced : { ...spring, delay: i * 0.05 }
                        }
                      >
                        <GameCard
                          project={project}
                          index={index}
                          liveStatus={statuses[project.id]}
                        />
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
