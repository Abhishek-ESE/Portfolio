"use client";

import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import { selectedWork } from "@/data/portfolio";
import { Arrow } from "./Icons";

const filters = [
  "All work",
  "EV & automotive",
  "Connected devices",
  "Product engineering",
] as const;

type WorkFilter = (typeof filters)[number];
type Project = (typeof selectedWork)[number];

function ProjectArtwork({ index }: { index: number }) {
  return (
    <div className={`project-art art-${index}`} aria-hidden="true">
      <div className="art-grid" />

      {index === 0 && (
        <div className="board-graphic">
          <i className="board-corner corner-a" />
          <i className="board-corner corner-b" />
          <i className="board-corner corner-c" />
          <i className="board-corner corner-d" />
          <div className="board-chip"><span>TI</span><small>MCU</small></div>
          <div className="board-modem">
            <span>EC200</span><small>CELLULAR MODULE</small><i /><i /><i />
          </div>
          <div className="board-port port-one" />
          <div className="board-port port-two" />
          <div className="board-trace trace-one" />
          <div className="board-trace trace-two" />
          <div className="board-trace trace-three" />
          <span className="board-print">VEHICLE CONNECTIVITY / REV. A</span>
          <span className="board-led" />
        </div>
      )}

      {index === 1 && (
        <div className="telemetry-graphic">
          <div className="telemetry-node">CAN<small>VEHICLE</small></div>
          <div className="signal-track"><span /><span /><span /></div>
          <div className="telemetry-node central-node">STM32<small>FIRMWARE</small></div>
          <div className="signal-track"><span /><span /><span /></div>
          <div className="telemetry-node">MQTT<small>CLOUD</small></div>
          <svg className="telemetry-wave" viewBox="0 0 440 65" fill="none">
            <path d="M0 45H30V22H54V45H89V22H110V45H143V11H166V45H200V22H222V45H258V11H282V45H315V22H339V45H376V11H397V45H440" />
          </svg>
        </div>
      )}

      {index === 2 && (
        <div className="motor-graphic">
          {["01", "02", "03", "04"].map((number) => (
            <div className="motor" key={number}><i /><span>{number}</span></div>
          ))}
          <div className="motor-center">STM32<small>CONTROL + FEEDBACK</small></div>
        </div>
      )}

      {index === 3 && (
        <div className="motion-graphic">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="orbit orbit-three" />
          <div className="imu-chip">9<span>DOF</span></div>
          <span className="axis axis-x">X</span>
          <span className="axis axis-y">Y</span>
          <span className="axis axis-z">Z</span>
          <span className="motion-label">BNO055 → ESP32-S3 → BLE</span>
        </div>
      )}

      <span className="art-id">{String(index + 1).padStart(2, "0")} / SYSTEM STUDY</span>
      <span className="art-note">CONCEPTUAL VIEW</span>
      <span className="art-open"><Arrow diagonal /></span>
    </div>
  );
}

export function WorkGallery() {
  const [filter, setFilter] = useState<WorkFilter>("All work");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!activeProject) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    const previousOverflow = document.body.style.overflow;
    const trigger = triggerRef.current;
    document.body.style.overflow = "hidden";
    if (!dialog.open) dialog.showModal();
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      if (dialog.open) dialog.close();
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    };
  }, [activeProject]);

  function openCase(project: Project, event: MouseEvent<HTMLButtonElement>) {
    triggerRef.current = event.currentTarget;
    setActiveProject(project);
  }

  function closeCase() {
    dialogRef.current?.close();
    setActiveProject(null);
  }

  function closeFromBackdrop(event: MouseEvent<HTMLDialogElement>) {
    if (event.target !== event.currentTarget) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const outside =
      event.clientX < bounds.left || event.clientX > bounds.right ||
      event.clientY < bounds.top || event.clientY > bounds.bottom;
    if (outside) closeCase();
  }

  const visibleProjects = selectedWork.filter(
    (project) => filter === "All work" || project.category === filter,
  );

  return (
    <>
      <div className="work-filters" role="group" aria-label="Filter selected work">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={filter === item}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="work-grid" aria-live="polite">
        {visibleProjects.map((project) => {
          const index = selectedWork.indexOf(project);
          return (
            <article className="work-card" key={project.id} data-reveal style={{ "--delay": `${index * 80}ms` } as CSSProperties}>
              <button
                className="art-button"
                type="button"
                aria-label={`Read ${project.title} case study`}
                onClick={(event) => openCase(project, event)}
              >
                <ProjectArtwork index={index} />
              </button>
              <div className="work-meta">
                <span>{project.eyebrow}</span>
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <h3>
                <button type="button" onClick={(event) => openCase(project, event)}>
                  {project.title}<Arrow diagonal />
                </button>
              </h3>
              <p>{project.summary}</p>
              <div className="tags">
                {project.stack.slice(0, 4).map((technology) => <span key={technology}>{technology}</span>)}
              </div>
              <button
                type="button"
                className="text-link case-link"
                onClick={(event) => openCase(project, event)}
                aria-label={`Explore ${project.title} case study`}
              >
                Explore the case study<Arrow />
              </button>
            </article>
          );
        })}
      </div>

      <dialog
        ref={dialogRef}
        className="case-dialog"
        aria-labelledby="case-title"
        onClick={closeFromBackdrop}
        onCancel={closeCase}
        onClose={() => setActiveProject(null)}
      >
        {activeProject && (
          <div className="case-content">
            <div className="case-top">
              <span className="eyebrow">ENGINEERING CASE STUDY</span>
              <button
                ref={closeRef}
                type="button"
                className="close-dialog"
                aria-label="Close case study"
                onClick={closeCase}
              >
                ×
              </button>
            </div>
            <p className="case-context">{activeProject.context}</p>
            <h2 id="case-title">{activeProject.title}</h2>
            <p className="case-summary">{activeProject.summary}</p>
            <div className="case-flow" aria-label="Conceptual system architecture">
              {activeProject.architecture.map((step, index) => (
                <div key={step}>
                  <span>{step}</span>
                  {index < activeProject.architecture.length - 1 && <Arrow />}
                </div>
              ))}
            </div>
            <div className="case-section">
              <h3>The engineering problem</h3>
              <p>{activeProject.problem}</p>
            </div>
            <div className="case-section">
              <h3>My contribution</h3>
              <ul>
                {activeProject.contributions.map((contribution) => <li key={contribution}>{contribution}</li>)}
              </ul>
            </div>
            <div className="case-result">
              <span className="eyebrow">OUTCOME</span>
              <p>{activeProject.outcome}</p>
            </div>
            <div className="tags">
              {activeProject.stack.map((technology) => <span key={technology}>{technology}</span>)}
            </div>
            <p className="case-disclosure">
              A high-level overview of professional work. System visuals are illustrative; proprietary code and implementation details are not published.
            </p>
            <a className="text-link" href="#contact" onClick={closeCase}>
              Discuss the engineering<Arrow />
            </a>
          </div>
        )}
      </dialog>
    </>
  );
}

export default WorkGallery;
