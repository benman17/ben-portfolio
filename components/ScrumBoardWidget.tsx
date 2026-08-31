'use client';

import React, { useState } from 'react';
import { Kanban, CheckCircle2, Clock, AlertCircle, Plus, ChevronRight, User, Layers, ArrowUpRight } from 'lucide-react';

interface Story {
  id: string;
  title: string;
  points: number;
  category: string;
  status: 'backlog' | 'todo' | 'in-progress' | 'done';
  acceptanceCriteria: string;
  assignee: string;
}

const INITIAL_STORIES: Story[] = [
  {
    id: 'US-101',
    title: 'Executive Sales Dashboard Filter Controls',
    points: 5,
    category: 'Analytics',
    status: 'done',
    acceptanceCriteria: 'Filters must support multi-select regional breakdown with < 200ms query latency.',
    assignee: 'Ben M. (BA/Dev)'
  },
  {
    id: 'US-102',
    title: 'Woodland Manor Online Booking API Integration',
    points: 8,
    category: 'Full-Stack',
    status: 'done',
    acceptanceCriteria: 'REST endpoint validates availability and sends instant customer email confirmation.',
    assignee: 'Alex R. (Dev)'
  },
  {
    id: 'US-103',
    title: 'Automated Daily SQL ETL Pipeline Alerting',
    points: 3,
    category: 'Data Eng',
    status: 'in-progress',
    acceptanceCriteria: 'Send Slack notification when daily ingestion job fails or records drop > 15%.',
    assignee: 'Ben M. (Scrum Lead)'
  },
  {
    id: 'US-104',
    title: 'Sprint 5 Backlog Grooming & Story Poker',
    points: 2,
    category: 'Scrum',
    status: 'todo',
    acceptanceCriteria: '100% of P0 user stories have clear INVEST acceptance criteria and story estimates.',
    assignee: 'Scrum Team'
  },
  {
    id: 'US-105',
    title: 'Inventory Stockout Predictive Alert Widget',
    points: 8,
    category: 'Analytics',
    status: 'backlog',
    acceptanceCriteria: 'Display threshold alerts when safety stock drops below 14-day lead time.',
    assignee: 'Product Owner'
  }
];

export default function ScrumBoardWidget() {
  const [stories, setStories] = useState<Story[]>(INITIAL_STORIES);
  const [selectedStory, setSelectedStory] = useState<Story | null>(INITIAL_STORIES[0]);

  const moveStory = (id: string, nextStatus: Story['status']) => {
    setStories((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: nextStatus } : s))
    );
  };

  const columns: { id: Story['status']; label: string; color: string }[] = [
    { id: 'backlog', label: 'Product Backlog', color: 'text-slate-400 border-slate-700' },
    { id: 'todo', label: 'Sprint To Do', color: 'text-cyan-400 border-cyan-500/40' },
    { id: 'in-progress', label: 'In Progress', color: 'text-amber-400 border-amber-500/40' },
    { id: 'done', label: 'Done (DoD Met)', color: 'text-emerald-400 border-emerald-500/40' }
  ];

  return (
    <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-2xl">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800/80 pb-6 mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 mb-1">
            <Kanban className="w-4 h-4" />
            <span>INTERACTIVE AGILE SCRUM SIMULATOR</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Sprint 4 Kanban Board & Backlog
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Click any story card to inspect Acceptance Criteria or move stories across Sprint stages.
          </p>
        </div>

        {/* Sprint Stats HUD */}
        <div className="flex items-center gap-4 bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono">
          <div>
            <span className="text-slate-500 block">VELOCITY</span>
            <span className="text-white font-bold text-sm">42 Points</span>
          </div>
          <div className="w-px h-8 bg-slate-800" />
          <div>
            <span className="text-slate-500 block">SPRINT</span>
            <span className="text-emerald-400 font-bold text-sm">Day 7 of 10</span>
          </div>
        </div>
      </div>

      {/* Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {columns.map((col) => {
          const colStories = stories.filter((s) => s.status === col.id);
          return (
            <div key={col.id} className="bg-slate-950/60 rounded-xl p-3.5 border border-slate-800/80 flex flex-col min-h-[300px]">
              <div className="flex items-center justify-between mb-3 border-b border-slate-800/60 pb-2">
                <span className={`text-xs font-bold font-mono ${col.color}`}>
                  {col.label}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-slate-900 text-[10px] font-mono text-slate-400 border border-slate-800">
                  {colStories.length}
                </span>
              </div>

              <div className="space-y-2.5 flex-1">
                {colStories.map((story) => (
                  <div
                    key={story.id}
                    onClick={() => setSelectedStory(story)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      selectedStory?.id === story.id
                        ? 'bg-slate-900 border-cyan-500 shadow-md shadow-cyan-500/10'
                        : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                      <span className="text-cyan-400 font-bold">{story.id}</span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                        {story.points} pts
                      </span>
                    </div>

                    <h4 className="text-xs font-semibold text-slate-100 line-clamp-2 mb-2">
                      {story.title}
                    </h4>

                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span className="text-slate-500">{story.category}</span>
                      
                      {/* Action buttons to move story */}
                      <div className="flex gap-1">
                        {col.id !== 'done' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const nextStatus = col.id === 'backlog' ? 'todo' : col.id === 'todo' ? 'in-progress' : 'done';
                              moveStory(story.id, nextStatus);
                            }}
                            className="px-1.5 py-0.5 rounded bg-slate-800 hover:bg-cyan-500/20 text-cyan-400 border border-slate-700 transition-colors"
                            title="Advance Story"
                          >
                            →
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Story Details Bar */}
      {selectedStory && (
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-cyan-400">{selectedStory.id}</span>
              <span className="text-xs font-semibold text-white">{selectedStory.title}</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono uppercase">
                {selectedStory.status}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              <strong className="text-slate-300">Acceptance Criteria:</strong> {selectedStory.acceptanceCriteria}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 self-end sm:self-auto">
            <User className="w-3.5 h-3.5 text-cyan-400" />
            <span>{selectedStory.assignee}</span>
          </div>
        </div>
      )}
    </div>
  );
}
