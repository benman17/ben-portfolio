'use client';

import React from 'react';
import AnalyticsSandbox from '@/components/AnalyticsSandbox';
import NflClusterWidget from '@/components/NflClusterWidget';
import { PROJECTS } from '@/data/projects';
import ProjectCard from '@/components/ProjectCard';

export default function AnalyticsPage() {
  const analyticsProjects = PROJECTS.filter((p) => p.category === 'analytics');

  return (
    <div className="pt-36 pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 text-left font-mono">
      
      {/* Editorial Header */}
      <div className="space-y-3 border-b border-[#1a1a20] pb-10">
        <div className="text-xs text-[#38bdf8] font-bold tracking-widest uppercase">
          01 / DATA ENGINEERING & BI
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight font-sans">
          Data Engineering & Analytics
        </h1>
        <p className="text-sm sm:text-base text-[#8a8a8a] max-w-3xl leading-relaxed font-sans font-normal pt-1">
          Automated SQL & Python data pipelines, relational Star Schema modeling, and interactive Power BI executive dashboards driving profitability and operational intelligence.
        </p>
      </div>

      {/* Analytics Philosophy Architectural Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 bg-[#08080c] border border-[#1a1a20]">
          <div className="text-xs font-bold text-white uppercase tracking-wider mb-2">01 / SQL ETL & DATA WAREHOUSING</div>
          <p className="text-xs text-[#8a8a8a] leading-relaxed font-sans font-normal">
            Complex PostgreSQL & Snowflake transformations using Window functions (`ROW_NUMBER`), CTE aggregations, and Star Schema dimensional modeling.
          </p>
        </div>

        <div className="p-6 bg-[#08080c] border border-[#1a1a20]">
          <div className="text-xs font-bold text-[#38bdf8] uppercase tracking-wider mb-2">02 / EXECUTIVE BI DASHBOARDING</div>
          <p className="text-xs text-[#8a8a8a] leading-relaxed font-sans font-normal">
            Power BI & Tableau visual dashboards featuring interactive DAX measures, target variance tracking, and margin leak detection.
          </p>
        </div>

        <div className="p-6 bg-[#08080c] border border-[#1a1a20]">
          <div className="text-xs font-bold text-[#34d399] uppercase tracking-wider mb-2">03 / MACHINE LEARNING & PYSPARK</div>
          <p className="text-xs text-[#8a8a8a] leading-relaxed font-sans font-normal">
            Apache Spark (PySpark MLlib) K-Means clustering in Google Colab evaluating multi-season player performance and fantasy tier centroids.
          </p>
        </div>
      </div>

      {/* Machine Learning Case Study Widget */}
      <div className="space-y-4 pt-4 border-t border-[#1a1a20]">
        <div className="text-xs font-bold text-[#38bdf8] tracking-wider uppercase">02 / MACHINE LEARNING CASE STUDY</div>
        <NflClusterWidget />
      </div>

      {/* Interactive Revenue Sandbox */}
      <div className="space-y-4 pt-4 border-t border-[#1a1a20]">
        <div className="text-xs font-bold text-[#34d399] tracking-wider uppercase">03 / EXECUTIVE REVENUE BI SANDBOX</div>
        <AnalyticsSandbox />
      </div>

      {/* Featured Analytics Projects */}
      <div className="space-y-8 pt-6 border-t border-[#1a1a20]">
        <div className="text-xs font-bold text-white tracking-wider uppercase">04 / ANALYTICS CASE STUDIES</div>
        <div className="space-y-12">
          {analyticsProjects.map((project, idx) => (
            <ProjectCard key={project.slug} project={project} index={idx} />
          ))}
        </div>
      </div>

    </div>
  );
}
