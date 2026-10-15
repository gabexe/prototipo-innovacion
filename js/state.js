/**
 * Gestor de Estado y Persistencia para Proyecto Vivo UBP
 * Utiliza LocalStorage y patrón observador (Pub/Sub) para reactividad
 */

import { INITIAL_DATA } from './data.js';

const STORAGE_KEY = 'ubp_proyecto_vivo_state_v1';

class Store {
  constructor() {
    this.listeners = new Set();
    this.state = this.loadState();
  }

  loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.project && Array.isArray(parsed.milestones)) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Error reading from localStorage, using INITIAL_DATA:', e);
    }
    return JSON.parse(JSON.stringify(INITIAL_DATA));
  }

  saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.error('Error saving state to localStorage:', e);
    }
    this.notify();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    for (const listener of this.listeners) {
      try {
        listener(this.state);
      } catch (err) {
        console.error('Error in state listener:', err);
      }
    }
  }

  // --- Getters ---
  getState() {
    return this.state;
  }

  getProject() {
    return this.state.project;
  }

  getMilestones() {
    return this.state.milestones;
  }

  getMentors(categoryId = 'all') {
    if (!categoryId || categoryId === 'all') {
      return this.state.mentors;
    }
    return this.state.mentors.filter(m => m.category === categoryId);
  }

  getCategories() {
    return this.state.categories;
  }

  getBookedSessions() {
    return this.state.bookedSessions || [];
  }

  getCompletedMilestonesCount() {
    return this.state.milestones.filter(m => m.status === 'completed').length;
  }

  getTotalMilestonesCount() {
    return this.state.milestones.length;
  }

  getProgressPercentage() {
    const total = this.getTotalMilestonesCount();
    if (total === 0) return 0;
    const completed = this.getCompletedMilestonesCount();
    return Math.round((completed / total) * 100);
  }

  isReadyForFinal() {
    return this.getCompletedMilestonesCount() === this.getTotalMilestonesCount();
  }

  // --- Mutators ---
  updateProject(partial) {
    this.state.project = {
      ...this.state.project,
      ...partial
    };
    this.saveState();
  }

  toggleMilestone(id) {
    const milestone = this.state.milestones.find(m => m.id === id);
    if (!milestone) return;

    if (milestone.status === 'completed') {
      milestone.status = 'in_progress';
      milestone.completedDate = null;
    } else {
      milestone.status = 'completed';
      milestone.completedDate = new Date().toLocaleDateString('es-AR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    }

    // Check if next milestone should be in_progress
    this.recomputeMilestoneStatuses();
    this.saveState();
  }

  uploadMilestoneDeliverable(id, fileName) {
    const milestone = this.state.milestones.find(m => m.id === id);
    if (!milestone) return;

    milestone.deliverable = fileName;
    milestone.status = 'completed';
    milestone.completedDate = new Date().toLocaleDateString('es-AR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    this.recomputeMilestoneStatuses();
    this.saveState();
  }

  recomputeMilestoneStatuses() {
    let foundCurrent = false;
    this.state.milestones.forEach((m, idx) => {
      if (m.status === 'completed') {
        // stays completed
      } else if (!foundCurrent) {
        m.status = 'in_progress';
        foundCurrent = true;
      } else {
        m.status = 'pending';
      }
    });

    // Update project stage
    const completed = this.getCompletedMilestonesCount();
    const total = this.getTotalMilestonesCount();
    if (completed === total) {
      this.state.project.stage = 'ready';
    } else if (completed > 0) {
      this.state.project.stage = 'in_progress';
    } else {
      this.state.project.stage = 'draft';
    }
  }

  completeAllMilestones() {
    const now = new Date().toLocaleDateString('es-AR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    this.state.milestones.forEach(m => {
      m.status = 'completed';
      if (!m.completedDate) m.completedDate = now;
      if (!m.deliverable) m.deliverable = `Entregable_Hito_${m.id}_Aprobado.pdf`;
    });
    this.state.project.stage = 'ready';
    this.state.project.currentWeek = 16;
    this.saveState();
  }

  bookMentorSession(sessionData) {
    const newSession = {
      id: `ses-${Date.now()}`,
      status: 'Confirmada por mentor',
      createdAt: new Date().toISOString(),
      ...sessionData
    };
    if (!this.state.bookedSessions) {
      this.state.bookedSessions = [];
    }
    this.state.bookedSessions.unshift(newSession);
    this.saveState();
    return newSession;
  }

  schedulePresentation(data) {
    this.state.project.presentationScheduled = true;
    this.state.project.presentationDate = data.date;
    this.state.project.scheduledSession = data;
    this.saveState();
  }

  setFuturePath(path) {
    this.state.project.futurePath = path;
    this.saveState();
  }

  resetDemo() {
    this.state = JSON.parse(JSON.stringify(INITIAL_DATA));
    this.saveState();
  }
}

export const store = new Store();
